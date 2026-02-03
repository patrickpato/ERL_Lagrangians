import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const BRAND = {
  name: 'Wakili A Quick One?',
  domain: 'wakili.cleardroptech.co.ke',
  organization: 'Clear Drop Consultants',
  phone: '0720242018',
  vatRate: 0.16,
  monthlyPrice: 200,
  freeLimit: 3,
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(
    value || 0,
  )

const formatDate = (value) => {
  if (!value) return '-'
  const normalized = value.includes(' ') ? value.replace(' ', 'T') : value
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function App() {
  const [token, setToken] = useState(
    () => localStorage.getItem('wakili_token') || '',
  )
  const [user, setUser] = useState(null)
  const [receiptStats, setReceiptStats] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [receipts, setReceipts] = useState([])
  const [users, setUsers] = useState([])
  const [view, setView] = useState(token ? 'loading' : 'login')
  const [notice, setNotice] = useState(null)
  const [busy, setBusy] = useState(false)

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    firmName: '',
  })
  const [firmForm, setFirmForm] = useState({ firmName: '' })
  const [receiptForm, setReceiptForm] = useState({
    service: '',
    amount: '',
    customerName: '',
  })
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
    firmName: '',
    isAdmin: false,
  })

  const noticeTimer = useRef(null)

  const showNotice = (type, message) => {
    setNotice({ type, message })
    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current)
    }
    noticeTimer.current = setTimeout(() => setNotice(null), 4000)
  }

  const persistToken = (nextToken) => {
    setToken(nextToken)
    if (nextToken) {
      localStorage.setItem('wakili_token', nextToken)
    } else {
      localStorage.removeItem('wakili_token')
    }
  }

  const request = async (path, options = {}) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data.error || 'Request failed.')
    }
    return data
  }

  const fetchMe = async () => {
    if (!token) return
    try {
      const data = await request('/api/auth/me', { token })
      setUser(data.user)
      setReceiptStats(data.receipt_stats)
      setSubscription(data.subscription)
      setView(data.user.is_admin ? 'admin' : 'dashboard')
    } catch (error) {
      persistToken('')
      setUser(null)
      setReceiptStats(null)
      setSubscription(null)
      setView('login')
    }
  }

  useEffect(() => {
    if (token) {
      fetchMe()
    } else {
      setUser(null)
      setReceiptStats(null)
      setSubscription(null)
      setView('login')
    }
  }, [token])

  useEffect(() => {
    if (!user) return
    if (user.is_admin) {
      loadUsers()
      setView('admin')
    } else {
      loadReceipts()
      setView('dashboard')
    }
  }, [user])

  const loadReceipts = async () => {
    try {
      const data = await request('/api/receipts', { token })
      setReceipts(data.receipts || [])
      setReceiptStats(data.receipt_stats)
      setSubscription(data.subscription)
    } catch (error) {
      showNotice('error', error.message)
    }
  }

  const loadUsers = async () => {
    try {
      const data = await request('/api/admin/users', { token })
      setUsers(data.users || [])
    } catch (error) {
      showNotice('error', error.message)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      const data = await request('/api/auth/login', {
        method: 'POST',
        body: {
          email: loginForm.email,
          password: loginForm.password,
        },
      })
      persistToken(data.token)
      setUser(data.user)
      setReceiptStats(data.receipt_stats)
      setSubscription(data.subscription)
      setLoginForm({ email: '', password: '' })
      showNotice('success', 'Welcome back.')
    } catch (error) {
      showNotice('error', error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      await request('/api/auth/signup', {
        method: 'POST',
        body: {
          name: signupForm.name,
          email: signupForm.email,
          password: signupForm.password,
          firm_name: signupForm.firmName,
        },
      })
      setSignupForm({ name: '', email: '', password: '', firmName: '' })
      setView('login')
      showNotice('success', 'Account created. Please log in.')
    } catch (error) {
      showNotice('error', error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleLogout = async () => {
    try {
      if (token) {
        await request('/api/auth/logout', { method: 'POST', token })
      }
    } catch (error) {
      // Ignore logout errors
    } finally {
      persistToken('')
      setUser(null)
      setReceipts([])
      setUsers([])
      setView('login')
    }
  }

  const handleFirmUpdate = async (event) => {
    event.preventDefault()
    if (!firmForm.firmName) return
    setBusy(true)
    try {
      await request('/api/user/firm', {
        method: 'PATCH',
        token,
        body: { firm_name: firmForm.firmName },
      })
      setUser((prev) => ({ ...prev, firm_name: firmForm.firmName }))
      setFirmForm({ firmName: '' })
      showNotice('success', 'Firm name updated.')
    } catch (error) {
      showNotice('error', error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleReceiptCreate = async (event) => {
    event.preventDefault()
    const amountValue = Number(receiptForm.amount)
    const customerName = receiptForm.customerName.trim()
    if (!receiptForm.service || !amountValue || !customerName) {
      showNotice('error', 'Service, customer name, and amount are required.')
      return
    }
    setBusy(true)
    try {
      const data = await request('/api/receipts', {
        method: 'POST',
        token,
        body: {
          service: receiptForm.service,
          amount: amountValue,
          customer_name: customerName,
        },
      })
      setReceipts((prev) => [data.receipt, ...prev])
      setReceiptStats(data.receipt_stats)
      setReceiptForm({ service: '', amount: '', customerName: '' })
      showNotice('success', 'Receipt created.')
    } catch (error) {
      showNotice('error', error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleSubscription = async () => {
    setBusy(true)
    try {
      const data = await request('/api/subscription/activate', {
        method: 'POST',
        token,
        body: { amount: BRAND.monthlyPrice },
      })
      setSubscription({ ...data.subscription, active: true })
      showNotice('success', 'Subscription activated.')
    } catch (error) {
      showNotice('error', error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleCreateUser = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      await request('/api/admin/users', {
        method: 'POST',
        token,
        body: {
          name: adminForm.name,
          email: adminForm.email,
          password: adminForm.password,
          firm_name: adminForm.firmName,
          is_admin: adminForm.isAdmin ? 1 : 0,
        },
      })
      setAdminForm({
        name: '',
        email: '',
        password: '',
        firmName: '',
        isAdmin: false,
      })
      showNotice('success', 'User created.')
      loadUsers()
    } catch (error) {
      showNotice('error', error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleUserStatus = async (userId, status) => {
    setBusy(true)
    try {
      await request(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        token,
        body: { status },
      })
      showNotice('success', 'User updated.')
      loadUsers()
    } catch (error) {
      showNotice('error', error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleResetPassword = async (userId) => {
    const newPassword = window.prompt('Enter a new password for this user:')
    if (!newPassword) return
    setBusy(true)
    try {
      await request(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        token,
        body: { password: newPassword },
      })
      showNotice('success', 'Password updated.')
    } catch (error) {
      showNotice('error', error.message)
    } finally {
      setBusy(false)
    }
  }

  const printReceipt = (receipt) => {
    const firmName = user?.firm_name || 'Law Firm'
    const vatRate = Math.round((receipt.vat_rate || BRAND.vatRate) * 100)
    const createdAt = formatDate(receipt.created_at)
    const receiptHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Receipt #${receipt.id}</title>
    <style>
      @page { size: 80mm auto; margin: 4mm; }
      body { font-family: "Courier New", Courier, monospace; font-size: 12px; color: #111; }
      .receipt { width: 80mm; }
      h1 { font-size: 16px; margin: 0 0 6px; text-align: center; }
      .meta { text-align: center; margin-bottom: 8px; }
      .row { display: flex; justify-content: space-between; margin: 4px 0; }
      .total { font-weight: bold; border-top: 1px dashed #333; padding-top: 6px; margin-top: 6px; }
      .footer { margin-top: 10px; text-align: center; font-size: 11px; }
    </style>
  </head>
  <body>
    <div class="receipt">
      <h1>${firmName}</h1>
      <div class="meta">${BRAND.name} - ${BRAND.domain}</div>
      <div class="row"><span>Receipt</span><span>#${receipt.id}</span></div>
      <div class="row"><span>Date</span><span>${createdAt}</span></div>
      <div class="row"><span>Customer</span><span>${receipt.customer_name || '-'}</span></div>
      <div class="row"><span>Service</span><span>${receipt.service}</span></div>
      <div class="row"><span>Amount</span><span>${formatCurrency(receipt.amount)}</span></div>
      <div class="row"><span>VAT (${vatRate}%)</span><span>${formatCurrency(receipt.vat_amount)}</span></div>
      <div class="row total"><span>Total</span><span>${formatCurrency(receipt.total_amount)}</span></div>
      <div class="footer">
        Created by ${BRAND.organization}<br />
        Tel: ${BRAND.phone}
      </div>
    </div>
    <script>
      window.onload = () => { window.print(); }
    </script>
  </body>
</html>`

    const printWindow = window.open('', 'wakili-receipt', 'width=420,height=600')
    if (!printWindow) {
      showNotice('error', 'Pop-up blocked. Please allow pop-ups to print.')
      return
    }
    printWindow.document.open()
    printWindow.document.write(receiptHtml)
    printWindow.document.close()
  }

  const receiptAmount = useMemo(() => Number(receiptForm.amount) || 0, [
    receiptForm.amount,
  ])
  const vatAmount = useMemo(
    () => Math.max(receiptAmount * BRAND.vatRate, 0),
    [receiptAmount],
  )
  const totalAmount = useMemo(
    () => Math.max(receiptAmount + vatAmount, 0),
    [receiptAmount, vatAmount],
  )

  const subscriptionActive = subscription?.active
  const freeRemaining =
    receiptStats && !subscriptionActive
      ? Math.max(receiptStats.free_limit - receiptStats.month_count, 0)
      : 0

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Advocate Receipt Workspace</p>
          <h1>{BRAND.name}</h1>
          <p className="subtitle">
            Legal billing, VAT computation, and printable receipts for Kenyan
            advocates.
          </p>
        </div>
        <div className="header-actions">
          <span className="chip">{BRAND.domain}</span>
          {user ? (
            <button className="ghost" type="button" onClick={handleLogout}>
              Log out
            </button>
          ) : null}
        </div>
      </header>

      <main className="app-main">
        {notice ? (
          <div className={`notice ${notice.type}`}>{notice.message}</div>
        ) : null}

        {!user ? (
          <section className="auth-grid">
            <div className="panel">
              <div className="tab-row">
                <button
                  className={view === 'login' ? 'tab active' : 'tab'}
                  type="button"
                  onClick={() => setView('login')}
                >
                  Log in
                </button>
                <button
                  className={view === 'signup' ? 'tab active' : 'tab'}
                  type="button"
                  onClick={() => setView('signup')}
                >
                  Sign up
                </button>
              </div>

              {view === 'signup' ? (
                <form className="form" onSubmit={handleSignup}>
                  <div className="form-row">
                    <label>
                      Full name
                      <input
                        value={signupForm.name}
                        onChange={(event) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            name: event.target.value,
                          }))
                        }
                        placeholder="Advocate name"
                        required
                      />
                    </label>
                    <label>
                      Email
                      <input
                        type="email"
                        value={signupForm.email}
                        onChange={(event) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            email: event.target.value,
                          }))
                        }
                        placeholder="you@example.com"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Password
                      <input
                        type="password"
                        value={signupForm.password}
                        onChange={(event) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            password: event.target.value,
                          }))
                        }
                        placeholder="Minimum 6 characters"
                        required
                      />
                    </label>
                    <label>
                      Law firm name
                      <input
                        value={signupForm.firmName}
                        onChange={(event) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            firmName: event.target.value,
                          }))
                        }
                        placeholder="Firm or chambers"
                      />
                    </label>
                  </div>
                  <button type="submit" disabled={busy}>
                    Create account
                  </button>
                </form>
              ) : (
                <form className="form" onSubmit={handleLogin}>
                  <label>
                    Email
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(event) =>
                        setLoginForm((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                  <label>
                    Password
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(event) =>
                        setLoginForm((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Your password"
                      required
                    />
                  </label>
                  <button type="submit" disabled={busy}>
                    Log in
                  </button>
                </form>
              )}
            </div>

            <div className="panel panel-highlight">
              <h2>Purpose-built for Kenyan advocates</h2>
              <ul>
                <li>Capture legal services and compute 16% VAT instantly.</li>
                <li>Print receipts in thermal roll size with PDF output.</li>
                <li>Free plan covers 3 receipts per month per advocate.</li>
                <li>Upgrade to KES 200/month for unlimited receipts.</li>
              </ul>
            </div>
          </section>
        ) : user.is_admin ? (
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>Admin command center</h2>
                <p className="muted">
                  Manage advocates, reset passwords, and monitor monthly usage.
                </p>
              </div>
              <button type="button" onClick={loadUsers} disabled={busy}>
                Refresh users
              </button>
            </div>

            <div className="split">
              <form className="form" onSubmit={handleCreateUser}>
                <h3>Add new user</h3>
                <div className="form-row">
                  <label>
                    Full name
                    <input
                      value={adminForm.name}
                      onChange={(event) =>
                        setAdminForm((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      value={adminForm.email}
                      onChange={(event) =>
                        setAdminForm((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Password
                    <input
                      type="password"
                      value={adminForm.password}
                      onChange={(event) =>
                        setAdminForm((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label>
                    Firm name
                    <input
                      value={adminForm.firmName}
                      onChange={(event) =>
                        setAdminForm((prev) => ({
                          ...prev,
                          firmName: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={adminForm.isAdmin}
                    onChange={(event) =>
                      setAdminForm((prev) => ({
                        ...prev,
                        isAdmin: event.target.checked,
                      }))
                    }
                  />
                  Make admin
                </label>
                <button type="submit" disabled={busy}>
                  Create user
                </button>
              </form>

              <div className="stats-card">
                <h3>Platform rules</h3>
                <div className="stat-row">
                  <span>VAT rate</span>
                  <strong>{Math.round(BRAND.vatRate * 100)}%</strong>
                </div>
                <div className="stat-row">
                  <span>Free receipts</span>
                  <strong>{BRAND.freeLimit} / month</strong>
                </div>
                <div className="stat-row">
                  <span>Monthly subscription</span>
                  <strong>{formatCurrency(BRAND.monthlyPrice)}</strong>
                </div>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Advocate</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Monthly receipts</th>
                    <th>Subscription</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="6">No users available.</td>
                    </tr>
                  ) : (
                    users.map((entry) => (
                      <tr key={entry.id}>
                        <td>
                          <strong>{entry.name}</strong>
                          <span className="subtext">
                            {entry.firm_name || 'Firm not set'}
                          </span>
                        </td>
                        <td>{entry.email}</td>
                        <td>
                          <span className={`badge ${entry.status}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td>{entry.month_receipts}</td>
                        <td>
                          {entry.subscription_ends_at
                            ? formatDate(entry.subscription_ends_at)
                            : 'No plan'}
                        </td>
                        <td className="actions">
                          <button
                            type="button"
                            onClick={() => handleUserStatus(entry.id, 'active')}
                            disabled={busy}
                          >
                            Activate
                          </button>
                          <button
                            type="button"
                            className="warning"
                            onClick={() =>
                              handleUserStatus(entry.id, 'suspended')
                            }
                            disabled={busy}
                          >
                            Suspend
                          </button>
                          <button
                            type="button"
                            className="danger"
                            onClick={() => handleUserStatus(entry.id, 'blocked')}
                            disabled={busy}
                          >
                            Block
                          </button>
                          <button
                            type="button"
                            className="ghost"
                            onClick={() => handleResetPassword(entry.id)}
                            disabled={busy}
                          >
                            Reset password
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>Advocate dashboard</h2>
                <p className="muted">
                  Welcome {user.name}. Manage your firm profile and create
                  receipts.
                </p>
              </div>
              <button type="button" onClick={loadReceipts} disabled={busy}>
                Refresh receipts
              </button>
            </div>

            <div className="grid">
              <div className="card">
                <h3>Firm profile</h3>
                <p className="muted">
                  Firm name:{' '}
                  <strong>{user.firm_name || 'Not set yet'}</strong>
                </p>
                <form className="form" onSubmit={handleFirmUpdate}>
                  <label>
                    Update firm name
                    <input
                      value={firmForm.firmName}
                      onChange={(event) =>
                        setFirmForm({ firmName: event.target.value })
                      }
                      placeholder="Law firm or chambers"
                      required
                    />
                  </label>
                  <button type="submit" disabled={busy}>
                    Save firm name
                  </button>
                </form>
              </div>

              <div className="card">
                <h3>Usage overview</h3>
                <div className="stat-row">
                  <span>VAT rate</span>
                  <strong>{Math.round(BRAND.vatRate * 100)}%</strong>
                </div>
                <div className="stat-row">
                  <span>Receipts this month</span>
                  <strong>{receiptStats?.month_count ?? 0}</strong>
                </div>
                <div className="stat-row">
                  <span>Free receipts left</span>
                  <strong>{freeRemaining}</strong>
                </div>
                <div className="stat-row">
                  <span>Subscription</span>
                  <strong>
                    {subscriptionActive
                      ? `Active until ${formatDate(subscription?.ends_at)}`
                      : 'Inactive'}
                  </strong>
                </div>
                {!subscriptionActive ? (
                  <button
                    type="button"
                    className="primary"
                    onClick={handleSubscription}
                    disabled={busy}
                  >
                    Subscribe for {formatCurrency(BRAND.monthlyPrice)} / month
                  </button>
                ) : null}
              </div>
            </div>

            <div className="split">
              <div className="card">
                <h3>Create receipt</h3>
                <form className="form" onSubmit={handleReceiptCreate}>
                  <label>
                    Customer name
                    <input
                      value={receiptForm.customerName}
                      onChange={(event) =>
                        setReceiptForm((prev) => ({
                          ...prev,
                          customerName: event.target.value,
                        }))
                      }
                      placeholder="e.g. Mary Wanjiku"
                      required
                    />
                  </label>
                  <label>
                    Service offered
                    <input
                      value={receiptForm.service}
                      onChange={(event) =>
                        setReceiptForm((prev) => ({
                          ...prev,
                          service: event.target.value,
                        }))
                      }
                      placeholder="e.g. Conveyancing consultation"
                      required
                    />
                  </label>
                  <label>
                    Service price (KES)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={receiptForm.amount}
                      onChange={(event) =>
                        setReceiptForm((prev) => ({
                          ...prev,
                          amount: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>

                  <div className="price-box">
                    <div>
                      <span>VAT (16%)</span>
                      <strong>{formatCurrency(vatAmount)}</strong>
                    </div>
                    <div>
                      <span>Total</span>
                      <strong>{formatCurrency(totalAmount)}</strong>
                    </div>
                  </div>
                  <button type="submit" disabled={busy}>
                    Create receipt
                  </button>
                </form>
              </div>

              <div className="card">
                <h3>Receipts</h3>
                {receipts.length === 0 ? (
                  <p className="muted">No receipts yet.</p>
                ) : (
                  <div className="receipt-list">
                    {receipts.map((receipt) => (
                      <div className="receipt-item" key={receipt.id}>
                        <div>
                          <strong>{receipt.service}</strong>
                          <span className="subtext">
                            {receipt.customer_name
                              ? `${receipt.customer_name} • `
                              : ''}
                            {formatDate(receipt.created_at)}
                          </span>
                        </div>
                        <div className="receipt-meta">
                          <span>{formatCurrency(receipt.total_amount)}</span>
                          <button
                            type="button"
                            className="ghost"
                            onClick={() => printReceipt(receipt)}
                          >
                            Print
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <div>
          Created by {BRAND.organization} - {BRAND.phone}
        </div>
        <div>Powered for advocates practicing in Kenya.</div>
      </footer>
    </div>
  )
}

export default App
