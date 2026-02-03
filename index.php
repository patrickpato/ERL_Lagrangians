<?php
declare(strict_types=1);

date_default_timezone_set('Africa/Nairobi');

$config = require __DIR__ . '/../src/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

$db = init_db($config);

// --------------------------------------------------
// ROUTES
// --------------------------------------------------

if ($path === '/' || $path === '') {
    json_response([
        'name' => $config['app']['name'],
        'status' => 'ok',
        'domain' => $config['app']['domain'],
    ]);
}

if ($path === '/api/health' && $method === 'GET') {
    json_response(['status' => 'ok']);
}

// ------------------------- AUTH -------------------------

if ($path === '/api/auth/signup' && $method === 'POST') {
    $payload = get_json_input();
    $name = trim((string)($payload['name'] ?? ''));
    $email = strtolower(trim((string)($payload['email'] ?? '')));
    $password = (string)($payload['password'] ?? '');
    $firmName = trim((string)($payload['firm_name'] ?? ''));

    if ($name === '' || $email === '' || $password === '') {
        json_response(['error' => 'Name, email, and password are required.'], 422);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response(['error' => 'Invalid email address.'], 422);
    }
    if (strlen($password) < 6) {
        json_response(['error' => 'Password must be at least 6 characters.'], 422);
    }

    $stmt = $db->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
    $stmt->execute([':email' => $email]);
    if ($stmt->fetch(PDO::FETCH_ASSOC)) {
        json_response(['error' => 'Email already exists.'], 409);
    }

    $stmt = $db->prepare(
        'INSERT INTO users (name, email, password_hash, firm_name, is_admin, status, created_at)
        VALUES (:name, :email, :password_hash, :firm_name, 0, :status, :created_at)'
    );
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ':firm_name' => $firmName !== '' ? $firmName : null,
        ':status' => 'active',
        ':created_at' => now(),
    ]);

    json_response(['message' => 'Account created. Please log in.'], 201);
}

// ------------------------- LOGIN -------------------------

if ($path === '/api/auth/login' && $method === 'POST') {
    $payload = get_json_input();
    $email = strtolower(trim((string)($payload['email'] ?? '')));
    $password = (string)($payload['password'] ?? '');

    if ($email === '' || $password === '') {
        json_response(['error' => 'Email and password are required.'], 422);
    }

    $stmt = $db->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password_hash'])) {
        json_response(['error' => 'Invalid credentials.'], 401);
    }
    if ($user['status'] !== 'active') {
        json_response(['error' => 'Your account is not active.'], 403);
    }

    $token = bin2hex(random_bytes(20));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+' . (int)$config['security']['session_days'] . ' days'));

    $stmt = $db->prepare(
        'INSERT INTO sessions (user_id, token, created_at, expires_at)
        VALUES (:user_id, :token, :created_at, :expires_at)'
    );
    $stmt->execute([
        ':user_id' => $user['id'],
        ':token' => $token,
        ':created_at' => now(),
        ':expires_at' => $expiresAt,
    ]);

    $stats = get_receipt_stats($db, (int)$user['id'], $config);
    $subscription = get_subscription_info($db, (int)$user['id']);

    json_response([
        'token' => $token,
        'user' => user_to_array($user),
        'receipt_stats' => $stats,
        'subscription' => $subscription,
    ]);
}

// ------------------------- CURRENT USER -------------------------

if ($path === '/api/auth/me' && $method === 'GET') {
    $user = require_auth($db);
    $stats = get_receipt_stats($db, (int)$user['id'], $config);
    $subscription = get_subscription_info($db, (int)$user['id']);
    json_response([
        'user' => user_to_array($user),
        'receipt_stats' => $stats,
        'subscription' => $subscription,
    ]);
}

// ------------------------- LOGOUT -------------------------

if ($path === '/api/auth/logout' && $method === 'POST') {
    $session = require_auth_session($db);
    $stmt = $db->prepare('DELETE FROM sessions WHERE token = :token');
    $stmt->execute([':token' => $session['token']]);
    json_response(['message' => 'Logged out.']);
}

// ------------------------- UPDATE FIRM NAME -------------------------

if ($path === '/api/user/firm' && $method === 'PATCH') {
    $user = require_auth($db);
    $payload = get_json_input();
    $firmName = trim((string)($payload['firm_name'] ?? ''));
    if ($firmName === '') {
        json_response(['error' => 'Firm name is required.'], 422);
    }

    $stmt = $db->prepare('UPDATE users SET firm_name = :firm_name WHERE id = :id');
    $stmt->execute([':firm_name' => $firmName, ':id' => $user['id']]);

    json_response(['message' => 'Firm name updated.']);
}

// ------------------------- GET RECEIPTS -------------------------

if ($path === '/api/receipts' && $method === 'GET') {
    $user = require_auth($db);
    $stmt = $db->prepare(
        'SELECT id, receipt_number, customer_name, service, amount, vat_rate, vat_amount, total_amount, created_at
        FROM receipts WHERE user_id = :user_id ORDER BY created_at DESC'
    );
    $stmt->execute([':user_id' => $user['id']]);
    $receipts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    json_response([
        'receipts' => $receipts,
        'receipt_stats' => get_receipt_stats($db, (int)$user['id'], $config),
        'subscription' => get_subscription_info($db, (int)$user['id']),
    ]);
}

// ------------------------- CREATE RECEIPT -------------------------

if ($path === '/api/receipts' && $method === 'POST') {
    $user = require_auth($db);
    $payload = get_json_input();
    $service = trim((string)($payload['service'] ?? ''));
    $amount = (float)($payload['amount'] ?? 0);
    $customerName = trim((string)($payload['customer_name'] ?? ''));

    if ($service === '' || $amount <= 0 || $customerName === '') {
        json_response(['error' => 'Service, customer name, and valid amount are required.'], 422);
    }

    if (!can_create_receipt($db, (int)$user['id'], $config)) {
        json_response(['error' => 'Receipt limit reached. Please subscribe to continue.'], 402);
    }

    $subscription = get_subscription_info($db, $user['id']);
    $vatRate = (float)$config['billing']['vat_rate'];
    $totalAmount = round($amount, 2);
    $vatAmount = 0.00;
    if (!$subscription['active'] && $vatRate > 0) {
        $vatAmount = round($totalAmount - ($totalAmount / (1 + $vatRate)), 2);
    }

    // Generate receipt number: RCPT-YYYYMMDD-000001
    $datePrefix = date('Ymd');
    $stmt = $db->prepare('SELECT COUNT(*) FROM receipts WHERE created_at >= :today_start');
    $stmt->execute([':today_start' => date('Y-m-d 00:00:00')]);
    $countToday = (int)$stmt->fetchColumn();
    $receiptNumber = sprintf('RCPT-%s-%06d', $datePrefix, $countToday + 1);

    $stmt = $db->prepare(
        'INSERT INTO receipts (user_id, receipt_number, customer_name, service, amount, vat_rate, vat_amount, total_amount, created_at)
        VALUES (:user_id, :receipt_number, :customer_name, :service, :amount, :vat_rate, :vat_amount, :total_amount, :created_at)'
    );
    $stmt->execute([
        ':user_id' => $user['id'],
        ':receipt_number' => $receiptNumber,
        ':customer_name' => $customerName,
        ':service' => $service,
        ':amount' => $amount,
        ':vat_rate' => $vatRate,
        ':vat_amount' => $vatAmount,
        ':total_amount' => $totalAmount,
        ':created_at' => now(),
    ]);

    json_response([
        'message' => 'Receipt created.',
        'receipt' => [
            'id' => $db->lastInsertId(),
            'receipt_number' => $receiptNumber,
            'customer_name' => $customerName,
            'service' => $service,
            'amount' => $amount,
            'vat_rate' => $vatRate,
            'vat_amount' => $vatAmount,
            'total_amount' => $totalAmount,
            'created_at' => now(),
        ],
        'receipt_stats' => get_receipt_stats($db, (int)$user['id'], $config),
    ], 201);
}

// ------------------------- SUBSCRIPTION -------------------------

if ($path === '/api/subscription/activate' && $method === 'POST') {
    $user = require_auth($db);
    $payload = get_json_input();
    $amount = (float)($payload['amount'] ?? $config['billing']['monthly_price']);

    if ($amount < (float)$config['billing']['monthly_price']) {
        json_response(['error' => 'Monthly subscription is KES 200.'], 422);
    }

    $startsAt = now();
    $endsAt = date('Y-m-d H:i:s', strtotime('+1 month'));

    $stmt = $db->prepare(
        'INSERT INTO subscriptions (user_id, amount, starts_at, ends_at, created_at)
        VALUES (:user_id, :amount, :starts_at, :ends_at, :created_at)'
    );
    $stmt->execute([
        ':user_id' => $user['id'],
        ':amount' => $amount,
        ':starts_at' => $startsAt,
        ':ends_at' => $endsAt,
        ':created_at' => now(),
    ]);

    json_response([
        'message' => 'Subscription activated.',
        'subscription' => [
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
            'amount' => $amount,
        ],
    ], 201);
}

// ------------------------- ADMIN ROUTES -------------------------

// GET users
if ($path === '/api/admin/users' && $method === 'GET') {
    $user = require_admin($db);
    $monthStart = date('Y-m-01 00:00:00');

    $stmt = $db->prepare(
        'SELECT
            users.id,
            users.name,
            users.email,
            users.firm_name,
            users.is_admin,
            users.status,
            users.created_at,
            (SELECT COUNT(*) FROM receipts WHERE receipts.user_id = users.id AND receipts.created_at >= :month_start) AS month_receipts,
            (SELECT MAX(ends_at) FROM subscriptions WHERE subscriptions.user_id = users.id) AS subscription_ends_at
        FROM users
        ORDER BY users.created_at DESC'
    );
    $stmt->execute([':month_start' => $monthStart]);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    json_response(['users' => $users]);
}

// POST create admin user
if ($path === '/api/admin/users' && $method === 'POST') {
    require_admin($db);
    $payload = get_json_input();
    $name = trim((string)($payload['name'] ?? ''));
    $email = strtolower(trim((string)($payload['email'] ?? '')));
    $password = (string)($payload['password'] ?? '');
    $firmName = trim((string)($payload['firm_name'] ?? ''));
    $isAdmin = (int)($payload['is_admin'] ?? 0) === 1 ? 1 : 0;

    if ($name === '' || $email === '' || $password === '') {
        json_response(['error' => 'Name, email, and password are required.'], 422);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response(['error' => 'Invalid email address.'], 422);
    }

    $stmt = $db->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
    $stmt->execute([':email' => $email]);
    if ($stmt->fetch(PDO::FETCH_ASSOC)) {
        json_response(['error' => 'Email already exists.'], 409);
    }

    $stmt = $db->prepare(
        'INSERT INTO users (name, email, password_hash, firm_name, is_admin, status, created_at)
        VALUES (:name, :email, :password_hash, :firm_name, :is_admin, :status, :created_at)'
    );
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ':firm_name' => $firmName !== '' ? $firmName : null,
        ':is_admin' => $isAdmin,
        ':status' => 'active',
        ':created_at' => now(),
    ]);

    json_response(['message' => 'User created.'], 201);
}

// PATCH update admin user
if (preg_match('#^/api/admin/users/(\d+)$#', $path, $matches) && $method === 'PATCH') {
    require_admin($db);
    $userId = (int)$matches[1];
    $payload = get_json_input();
    $allowedStatus = ['active', 'blocked', 'suspended'];

    $updates = [];
    $params = [':id' => $userId];

    if (isset($payload['status'])) {
        $status = (string)$payload['status'];
        if (!in_array($status, $allowedStatus, true)) {
            json_response(['error' => 'Invalid status.'], 422);
        }
        $updates[] = 'status = :status';
        $params[':status'] = $status;
    }

    if (isset($payload['firm_name'])) {
        $updates[] = 'firm_name = :firm_name';
        $params[':firm_name'] = trim((string)$payload['firm_name']);
    }

    if (isset($payload['name'])) {
        $updates[] = 'name = :name';
        $params[':name'] = trim((string)$payload['name']);
    }

    if (isset($payload['email'])) {
        $email = strtolower(trim((string)$payload['email']));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            json_response(['error' => 'Invalid email address.'], 422);
        }
        $updates[] = 'email = :email';
        $params[':email'] = $email;
    }

    if (isset($payload['is_admin'])) {
        $updates[] = 'is_admin = :is_admin';
        $params[':is_admin'] = (int)($payload['is_admin'] ?? 0) === 1 ? 1 : 0;
    }

    if (isset($payload['password']) && (string)$payload['password'] !== '') {
        $updates[] = 'password_hash = :password_hash';
        $params[':password_hash'] = password_hash((string)$payload['password'], PASSWORD_DEFAULT);
    }

    if (!$updates) {
        json_response(['error' => 'No valid fields to update.'], 422);
    }

    $stmt = $db->prepare('UPDATE users SET ' . implode(', ', $updates) . ' WHERE id = :id');
    $stmt->execute($params);

    json_response(['message' => 'User updated.']);
}

json_response(['error' => 'Not found.'], 404);

// ------------------------- FUNCTIONS -------------------------

function init_db(array $config): PDO
{
    $storagePath = $config['database']['path'];
    $storageDir = dirname($storagePath);
    if (!is_dir($storageDir)) {
        mkdir($storageDir, 0775, true);
    }

    $db = new PDO('sqlite:' . $storagePath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $schema = file_get_contents($config['database']['schema']);
    if ($schema !== false) {
        $db->exec($schema);
    }

    seed_admin($db, $config);

    return $db;
}

function seed_admin(PDO $db, array $config): void
{
    $stmt = $db->query('SELECT COUNT(*) FROM users WHERE is_admin = 1');
    $count = (int)$stmt->fetchColumn();
    if ($count > 0) return;

    $stmt = $db->prepare(
        'INSERT INTO users (name, email, password_hash, firm_name, is_admin, status, created_at)
        VALUES (:name, :email, :password_hash, NULL, 1, :status, :created_at)'
    );
    $stmt->execute([
        ':name' => $config['admin_seed']['name'],
        ':email' => $config['admin_seed']['email'],
        ':password_hash' => password_hash($config['admin_seed']['password'], PASSWORD_DEFAULT),
        ':status' => 'active',
        ':created_at' => now(),
    ]);
}

function now(): string { return date('Y-m-d H:i:s'); }

function get_json_input(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function json_response(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function get_bearer_token(): ?string
{
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    if (!$headers) {
        foreach ($_SERVER as $name => $value) {
            if (str_starts_with($name, 'HTTP_')) {
                $headers[str_replace('_', '-', substr($name, 5))] = $value;
            }
        }
    }
    $authHeader = $headers['Authorization'] ?? $headers['AUTHORIZATION'] ?? null;
    if (!$authHeader) return null;
    return stripos($authHeader, 'Bearer ') === 0 ? trim(substr($authHeader, 7)) : null;
}

function require_auth(PDO $db): array
{
    $session = require_auth_session($db);
    $stmt = $db->prepare('SELECT * FROM users WHERE id = :id LIMIT 1');
    $stmt->execute([':id' => $session['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) json_response(['error' => 'User not found.'], 404);
    if ($user['status'] !== 'active') json_response(['error' => 'Your account is not active.'], 403);
    return $user;
}

function require_auth_session(PDO $db): array
{
    $token = get_bearer_token();
    if (!$token) json_response(['error' => 'Unauthorized.'], 401);

    $stmt = $db->prepare('SELECT * FROM sessions WHERE token = :token LIMIT 1');
    $stmt->execute([':token' => $token]);
    $session = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$session) json_response(['error' => 'Unauthorized.'], 401);
    if (strtotime($session['expires_at']) < time()) json_response(['error' => 'Session expired.'], 401);

    return $session;
}

function require_admin(PDO $db): array
{
    $user = require_auth($db);
    if ((int)$user['is_admin'] !== 1) json_response(['error' => 'Admin access required.'], 403);
    return $user;
}

function user_to_array(array $user): array
{
    return [
        'id' => (int)$user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'firm_name' => $user['firm_name'],
        'is_admin' => (int)$user['is_admin'] === 1,
        'status' => $user['status'],
        'created_at' => $user['created_at'],
    ];
}

function get_receipt_stats(PDO $db, int $userId, array $config): array
{
    $monthStart = date('Y-m-01 00:00:00');
    $stmt = $db->prepare('SELECT COUNT(*) FROM receipts WHERE user_id = :user_id AND created_at >= :month_start');
    $stmt->execute([':user_id' => $userId, ':month_start' => $monthStart]);
    $count = (int)$stmt->fetchColumn();

    return [
        'month_count' => $count,
        'free_limit' => (int)$config['billing']['free_receipt_limit'],
    ];
}

function get_subscription_info(PDO $db, int $userId): array
{
    $stmt = $db->prepare(
        'SELECT amount, starts_at, ends_at
        FROM subscriptions
        WHERE user_id = :user_id
        ORDER BY ends_at DESC
        LIMIT 1'
    );
    $stmt->execute([':user_id' => $userId]);
    $subscription = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$subscription) return ['active' => false, 'ends_at' => null, 'amount' => null];

    return [
        'active' => strtotime($subscription['ends_at']) >= time(),
        'ends_at' => $subscription['ends_at'],
        'amount' => (float)$subscription['amount'],
    ];
}

function can_create_receipt(PDO $db, int $userId, array $config): bool
{
    $subscription = get_subscription_info($db, $userId);
    if ($subscription['active']) return true;

    $stats = get_receipt_stats($db, $userId, $config);
    return $stats['month_count'] < (int)$config['billing']['free_receipt_limit'];
}
