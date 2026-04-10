'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Sparkles, BookOpen, Crown, User, LogIn } from 'lucide-react';
import { fortuneServices } from '@/lib/fortunes';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(253, 251, 247, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.8)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 no-underline"
          style={{ color: 'var(--text-main)', textDecoration: 'none' }}
        >
          <Sparkles size={22} color="#d4a5b6" />
          <span
            className="text-lg font-bold gradient-text"
            style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
          >
            Oracle Portal
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/history"
            className="p-2 no-underline"
            aria-label="占いの記録"
            style={{ color: 'var(--text-main)', textDecoration: 'none' }}
          >
            <BookOpen size={20} />
          </Link>
          <Link
            href="/premium"
            className="p-2 no-underline"
            aria-label="プレミアム"
            style={{ color: '#d4a5b6', textDecoration: 'none' }}
          >
            <Crown size={20} />
          </Link>
          {user ? (
            <Link
              href="/account"
              className="p-2 no-underline"
              aria-label="マイページ"
              style={{ color: 'var(--text-main)', textDecoration: 'none' }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #b5a4d6, #d4a5b6)', color: 'white' }}
              >
                <User size={14} />
              </div>
            </Link>
          ) : (
            <Link
              href="/auth/signup"
              className="px-3 py-1.5 rounded-full text-xs font-bold no-underline hidden sm:inline-flex items-center gap-1"
              style={{
                background: 'linear-gradient(120deg, #b5a4d6, #d4a5b6)',
                color: 'white',
                textDecoration: 'none',
                fontFamily: "'Zen Maru Gothic', sans-serif",
              }}
            >
              <LogIn size={12} /> 無料登録
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
            aria-label="メニューを開く"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          className="px-4 pb-4"
          style={{ borderTop: '1px solid rgba(212,165,182,0.2)' }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-2 pt-3">
              {fortuneServices.map((s) => (
                <Link
                  key={s.id}
                  href={s.path}
                  onClick={() => setIsOpen(false)}
                  className="text-center py-3 rounded-xl text-sm no-underline transition-all hover:scale-105"
                  style={{
                    background: `${s.color}15`,
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    border: `1px solid ${s.color}30`,
                  }}
                >
                  <span className="text-xl block mb-1">{s.icon}</span>
                  {s.name}
                </Link>
              ))}
            </div>

            {!user && (
              <Link
                href="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="w-full mt-3 py-3 text-center text-sm font-bold no-underline rounded-2xl block sm:hidden"
                style={{
                  background: 'linear-gradient(120deg, #b5a4d6, #d4a5b6)',
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                ✨ 無料会員登録（30秒）
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
