# SatStacker OS — 3-Minute Supabase Quickstart

Turnkey guide to configure high-precision portfolio accounting, streak freeze tokens, and cryptographic ledger registry in Supabase.

---

### Step 1: Create Supabase Project
1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project**, specify project name (e.g. `satstacker-os`), and generate a secure password.
3. Select your closest AWS hosting region.

---

### Step 2: Execute Schema & Seed
1. Navigate to **SQL Editor** in the left navigation.
2. Click **New query**, paste the entire contents of `supabase/schema.sql`, and click **Run**.
3. Create a second query, paste `supabase/seed.sql`, and click **Run** to load initial mock users, streaks, and ledger records.

---

### Step 3: Wire Environment Keys
1. Go to **Project Settings** -> **API**.
2. Copy your **Project URL** and **anon / public** key.
3. In your environment file:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. Run `npm run build` or launch development server (`npm run dev`).

---

### Institutional Admin Gateway Passkey
- Access `/admin` or `/admin.html` to trigger the 1-click master passkey auto-fill:
  - **Passkey**: `satstacker2026`
