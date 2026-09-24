-- ==============================================================================
-- SATSTACKER OS — SUPABASE SCHEMA & RLS POLICIES
-- Target #41 | Private Wealth & Real Estate Vault (6/35)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Tier Enumeration
DO $$ BEGIN
    CREATE TYPE user_tier AS ENUM ('free', 'pro', 'whale');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    tier user_tier NOT NULL DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Streaks Stability & Freeze Tracker Table
CREATE TABLE IF NOT EXISTS public.user_streaks (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    freeze_tokens_available INTEGER NOT NULL DEFAULT 0,
    last_stack_at TIMESTAMPTZ,
    streak_frozen_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. High Precision Portfolios Table (NUMERIC to avoid floating-point limits)
CREATE TABLE IF NOT EXISTS public.portfolios (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    total_btc NUMERIC(16,8) NOT NULL DEFAULT 0.00000000,
    total_sats NUMERIC(20,0) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Ledger Audit Registry
CREATE TABLE IF NOT EXISTS public.ledger_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tx_code TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    sats NUMERIC(20,0) NOT NULL DEFAULT 0,
    btc NUMERIC(16,8) NOT NULL DEFAULT 0.00000000,
    verified BOOLEAN NOT NULL DEFAULT true,
    signature TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ledger_entries ENABLE ROW LEVEL SECURITY;

-- Anonymous public read policies
CREATE POLICY "Public read user streaks" ON public.user_streaks FOR SELECT USING (true);
CREATE POLICY "Public read portfolios" ON public.portfolios FOR SELECT USING (true);
CREATE POLICY "Public read ledger entries" ON public.ledger_entries FOR SELECT USING (true);

-- Authenticated / Admin bypass policies
CREATE POLICY "Admin full access users" ON public.users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access streaks" ON public.user_streaks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access portfolios" ON public.portfolios FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access ledger" ON public.ledger_entries FOR ALL USING (auth.role() = 'authenticated');
