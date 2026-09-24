-- ==============================================================================
-- SATSTACKER OS — PRODUCTION SEED DATA
-- ==============================================================================

-- Seed Sample Users
INSERT INTO public.users (id, email, tier)
VALUES 
    ('8fae120a-30b2-4d22-9df5-6351d8b9e4a1', 'founder@satstacker.io', 'whale'),
    ('fa117cc2-1021-4f33-87ab-01934ad8b291', 'trader@sovereigncapital.xyz', 'pro'),
    ('12bb9bdf-d8a4-4e12-bce4-8902df35c412', 'stacker@orangeholdings.com', 'free')
ON CONFLICT (id) DO NOTHING;

-- Seed Portfolios
INSERT INTO public.portfolios (user_id, total_btc, total_sats)
VALUES
    ('8fae120a-30b2-4d22-9df5-6351d8b9e4a1', 0.08492100, 8492100),
    ('fa117cc2-1021-4f33-87ab-01934ad8b291', 0.02500000, 2500000),
    ('12bb9bdf-d8a4-4e12-bce4-8902df35c412', 0.00010000, 10000)
ON CONFLICT DO NOTHING;

-- Seed User Streaks
INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, freeze_tokens_available, last_stack_at)
VALUES
    ('8fae120a-30b2-4d22-9df5-6351d8b9e4a1', 48, 62, 5, NOW()),
    ('fa117cc2-1021-4f33-87ab-01934ad8b291', 19, 24, 2, NOW() - INTERVAL '36 hours'),
    ('12bb9bdf-d8a4-4e12-bce4-8902df35c412', 4, 12, 0, NOW() - INTERVAL '4 hours')
ON CONFLICT DO NOTHING;

-- Seed Ledger Entries
INSERT INTO public.ledger_entries (tx_code, user_id, action, sats, btc, verified, signature)
VALUES
    ('TX-9904', '8fae120a-30b2-4d22-9df5-6351d8b9e4a1', 'Initial Stack Bootstrap', 10000, 0.00010000, true, '0x8fae120a30b2'),
    ('TX-9903', 'fa117cc2-1021-4f33-87ab-01934ad8b291', 'Coinbase Socket Stream Initialized', 0, 0.00000000, true, '0xfa117cc210210'),
    ('TX-9902', '8fae120a-30b2-4d22-9df5-6351d8b9e4a1', 'Symmetry System Balanced [OK]', 10000, 0.00010000, true, '0x12bb9bdfd8a4')
ON CONFLICT (tx_code) DO NOTHING;
