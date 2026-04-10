'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { fortuneServices } from '@/lib/fortunes';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex gap-4">
          {fortuneServices.slice(0, 5).map((s) => (
            <Link
              key={s.id}
              href={s.path}
              className="text-sm no-underline hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-main)', textDecoration: 'none' }}
            >
              {s.icon} {s.name}
            </Link>
          ))}
          <Link
            href="/"
            className="text-sm no-underline"
            style={{ color: 'var(--text-light)', textDecoration: 'none' }}
          >
            もっと見る →
          </Link>
        </nav>
      </div>

      {isOpen && (
        <nav
          className="md:hidden px-4 pb-4"
          style={{ borderTop: '1px solid rgba(212,165,182,0.2)' }}
        >
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
                }}
              >
                <span className="text-xl block mb-1">{s.icon}</span>
                {s.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
