/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PLAUSIBLE_DOMAIN?: string;
  readonly NEXT_PUBLIC_GA_ID?: string;
  readonly CONTACT_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
