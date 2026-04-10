import Link from 'next/link';
import { fortuneServices } from '@/lib/fortunes';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="text-center">
        <h1
          className="text-4xl font-bold gradient-text mb-3"
          style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
        >
          Oracle Portal
        </h1>
        <p className="text-base" style={{ color: 'var(--text-light)', letterSpacing: '0.1em' }}>
          AI占いの館 — あなたの運命を、9つの占いで読み解く
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {fortuneServices.map((service) => (
          <Link
            key={service.id}
            href={service.path}
            className="glass-panel text-center no-underline flex flex-col items-center gap-3 p-6"
            style={{ textDecoration: 'none', color: 'var(--text-main)' }}
          >
            <span className="text-4xl">{service.icon}</span>
            <div>
              <h2 className="text-base font-bold m-0">{service.name}</h2>
              <p
                className="text-xs mt-1 m-0"
                style={{ color: 'var(--text-light)', letterSpacing: '0.08em' }}
              >
                {service.subtitle}
              </p>
            </div>
            <p className="text-xs leading-relaxed m-0" style={{ color: 'var(--text-light)' }}>
              {service.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="ad-slot w-full max-w-2xl">
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>AD</span>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
          全ての占いは無料でお楽しみいただけます。AIによる鑑定のため、エンターテインメントとしてお楽しみください。
        </p>
      </div>
    </div>
  );
}
