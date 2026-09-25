import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Key, Database, RefreshCw, X, Check, Lock, AlertCircle, Sparkles } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'telemetry' | 'users' | 'ledger'>('overview');

  const validPasskey = 'satstacker2026';

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passkey.trim() === validPasskey) {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Master Passkey. Access Denied.');
    }
  };

  const handleAutoFill = () => {
    setPasskey(validPasskey);
    setIsAuthenticated(true);
    setErrorMsg('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-4xl bg-[#09090b] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black font-mono tracking-wider text-white uppercase">
                  SatStacker Core // Institutional Control Center
                </h3>
                <p className="text-xs font-semibold tracking-wider text-zinc-400 font-mono">
                  Master Security Gateway & Real-Time Portfolio Telemetry
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* Auth Login Screen */
            <div className="p-8 flex flex-col items-center justify-center space-y-6 my-auto">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <Lock className="w-8 h-8 text-indigo-400" />
              </div>

              <div className="text-center max-w-md">
                <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                  Restricted Operator Gateway
                </h4>
                <p className="text-base text-zinc-200 leading-relaxed mt-1 font-mono">
                  Enter institutional bypass credential to unlock live ledger nodes, active user streaks, and WebSocket pipeline telemetry.
                </p>
              </div>

              {/* 1-Click Auto Fill Demo Passkey */}
              <button
                type="button"
                onClick={handleAutoFill}
                className="w-full max-w-sm flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-base font-semibold min-h-[44px] font-mono font-bold tracking-wider transition-all duration-200 shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>1-CLICK AUTO-FILL PASSKEY (satstacker2026)</span>
              </button>

              <div className="flex items-center gap-3 w-full max-w-sm">
                <div className="h-[1px] bg-zinc-800 flex-1" />
                <span className="text-xs font-semibold tracking-wider font-mono text-zinc-600 uppercase">Or Manual Entry</span>
                <div className="h-[1px] bg-zinc-800 flex-1" />
              </div>

              <form onSubmit={handleLogin} className="w-full max-w-sm space-y-3">
                <div className="relative">
                  <Key className="w-4 h-4 text-zinc-300 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Enter passkey..."
                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-base font-semibold min-h-[44px] font-mono font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Verify Access Key
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Top Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 font-mono text-xs">
                {(['overview', 'telemetry', 'users', 'ledger'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                      activeTab === tab
                        ? 'bg-indigo-600 text-white'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <span className="ml-auto text-xs font-semibold tracking-wider text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  ● OPERATOR AUTHENTICATED
                </span>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                    <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                      <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase tracking-widest block">Aggregated Sats</span>
                      <span className="text-xl font-bold text-white mt-1 block">8,492,100</span>
                      <span className="text-xs font-semibold tracking-wider text-emerald-400 mt-1 block">+12.4% this cycle</span>
                    </div>
                    <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                      <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase tracking-widest block">Active Streaks</span>
                      <span className="text-xl font-bold text-indigo-400 mt-1 block">1,482</span>
                      <span className="text-xs font-semibold tracking-wider text-zinc-400 mt-1 block">98.2% retention rate</span>
                    </div>
                    <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                      <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase tracking-widest block">Shield Tokens</span>
                      <span className="text-xl font-bold text-amber-400 mt-1 block">2,964</span>
                      <span className="text-xs font-semibold tracking-wider text-zinc-400 mt-1 block">Active protections</span>
                    </div>
                    <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                      <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase tracking-widest block">WebSocket Node</span>
                      <span className="text-xl font-bold text-emerald-400 mt-1 block">14ms</span>
                      <span className="text-xs font-semibold tracking-wider text-zinc-400 mt-1 block">Zero tick dropped</span>
                    </div>
                  </div>

                  {/* Node Health Matrix */}
                  <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg font-mono space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                      <span className="text-xs font-bold text-zinc-300 uppercase">System Cluster Health</span>
                      <span className="text-xs font-semibold tracking-wider text-emerald-400">99.98% SLA OK</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-black/40 border border-zinc-800/60 rounded">
                        <span className="text-zinc-300 block text-xs font-semibold tracking-wider">COINBASE WS FEED</span>
                        <span className="text-white font-bold block mt-1">wss://ws-feed.exchange.coinbase.com</span>
                        <span className="text-emerald-400 text-xs font-semibold tracking-wider">CONNECTED // ACTIVE</span>
                      </div>
                      <div className="p-3 bg-black/40 border border-zinc-800/60 rounded">
                        <span className="text-zinc-300 block text-xs font-semibold tracking-wider">PG_CRON AUTOMATION</span>
                        <span className="text-white font-bold block mt-1">0 3 * * * (Nightly UTC)</span>
                        <span className="text-emerald-400 text-xs font-semibold tracking-wider">ENABLED // HEALTHY</span>
                      </div>
                      <div className="p-3 bg-black/40 border border-zinc-800/60 rounded">
                        <span className="text-zinc-300 block text-xs font-semibold tracking-wider">RLS ENFORCEMENT</span>
                        <span className="text-white font-bold block mt-1">Row Level Security</span>
                        <span className="text-emerald-400 text-xs font-semibold tracking-wider">STRICT // ZERO LEAK</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'telemetry' && (
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-2">
                    <span className="text-zinc-400 font-bold uppercase block">// LIVE SOCKET TELEMETRY STREAM</span>
                    <div className="p-3 bg-black/60 border border-zinc-800/80 rounded font-mono text-xs font-semibold text-emerald-400/90 space-y-1">
                      <p>[11:24:02.102] WSS_TICK: BTC-USD @ $67,842.10 | Vol: 1,489.22 BTC</p>
                      <p>[11:24:03.490] CALC_WORKER: 10,000 sats = 0.00010000 BTC (Precision: exact)</p>
                      <p>[11:24:04.112] STREAK_VERIFY: User UUID 8fae120a30b2 preserved (2 Freeze Tokens)</p>
                      <p>[11:24:05.901] LEDGER_BROADCAST: TX-9904 signature 0x8fae120a30b2 confirmed</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-4 font-mono text-xs">
                  <table className="w-full text-left border border-zinc-800 rounded-lg overflow-hidden">
                    <thead className="bg-zinc-900 text-zinc-400 text-xs font-semibold tracking-wider uppercase">
                      <tr>
                        <th className="p-3">User ID</th>
                        <th className="p-3">Tier</th>
                        <th className="p-3">Streak</th>
                        <th className="p-3">Tokens</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      <tr>
                        <td className="p-3 text-indigo-400">8fae120a-30b2</td>
                        <td className="p-3">WHALE</td>
                        <td className="p-3 text-emerald-400">48 Days</td>
                        <td className="p-3">5 / 5</td>
                        <td className="p-3 text-emerald-400">ACTIVE</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-indigo-400">fa117cc2-1021</td>
                        <td className="p-3">PRO</td>
                        <td className="p-3 text-emerald-400">19 Days</td>
                        <td className="p-3">2 / 2</td>
                        <td className="p-3 text-emerald-400">FROZEN (SHIELDED)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-indigo-400">12bb9bdf-d8a4</td>
                        <td className="p-3">FREE</td>
                        <td className="p-3 text-zinc-400">4 Days</td>
                        <td className="p-3">0 / 0</td>
                        <td className="p-3 text-zinc-400">ACTIVE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'ledger' && (
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white uppercase">Ledger Integrity Seal</span>
                      <span className="text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        100% PARITY
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs">
                      All Satoshi-to-Bitcoin transactions mathematically reconcile against 10^8 scaling ratio triggers.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
