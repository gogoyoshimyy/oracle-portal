import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// 占いごとのテーマカラー
const SERVICE_THEMES: Record<string, { gradient: string; emoji: string; name: string }> = {
  dream: { gradient: 'linear-gradient(135deg, #2c1654 0%, #4a1942 50%, #1a1a3e 100%)', emoji: '🌙', name: '夢占い' },
  tarot: { gradient: 'linear-gradient(135deg, #1a1437 0%, #4a1942 50%, #2c1654 100%)', emoji: '🃏', name: 'タロット占い' },
  numerology: { gradient: 'linear-gradient(135deg, #2c1654 0%, #b08d20 50%, #4a1942 100%)', emoji: '🔢', name: '数秘術' },
  horoscope: { gradient: 'linear-gradient(135deg, #1a1a3e 0%, #2c1654 50%, #4a1942 100%)', emoji: '⭐', name: '星座占い' },
  compatibility: { gradient: 'linear-gradient(135deg, #4a1942 0%, #d4527e 50%, #1a1437 100%)', emoji: '💕', name: '相性占い' },
  'name-fortune': { gradient: 'linear-gradient(135deg, #1a1a3e 0%, #4a1942 50%, #2c1654 100%)', emoji: '✍️', name: '姓名判断' },
  'past-life': { gradient: 'linear-gradient(135deg, #2c1654 0%, #1a1437 50%, #4a1942 100%)', emoji: '🔮', name: '前世占い' },
  birthday: { gradient: 'linear-gradient(135deg, #4a1942 0%, #2c1654 50%, #1a1a3e 100%)', emoji: '🎂', name: '誕生日占い' },
  color: { gradient: 'linear-gradient(135deg, #2c1654 0%, #d4527e 50%, #4a1942 100%)', emoji: '🎨', name: 'カラー占い' },
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const service = searchParams.get('service') || 'dream';
    const headline = (searchParams.get('headline') || 'あなたの運命を読み解きます').slice(0, 60);
    const title = (searchParams.get('title') || '').slice(0, 30);
    const format = searchParams.get('format') || 'card'; // card | square | story

    const theme = SERVICE_THEMES[service] || SERVICE_THEMES.dream;

    // フォーマットごとのサイズ
    const sizes = {
      card: { width: 1200, height: 630 }, // X/Facebook/LINE OGP
      square: { width: 1080, height: 1080 }, // Instagram フィード
      story: { width: 1080, height: 1920 }, // Instagram Story / TikTok
    };

    const size = sizes[format as keyof typeof sizes] || sizes.card;
    const isStory = format === 'story';
    const isSquare = format === 'square';

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.gradient,
            fontFamily: 'sans-serif',
            position: 'relative',
            padding: isStory ? '120px 80px' : isSquare ? '80px' : '60px 80px',
          }}
        >
          {/* 装飾 - 上部の星 */}
          <div
            style={{
              position: 'absolute',
              top: isStory ? 80 : 40,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              fontSize: isStory ? 40 : 24,
              opacity: 0.6,
            }}
          >
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
          </div>

          {/* メインの絵文字 */}
          <div
            style={{
              fontSize: isStory ? 200 : isSquare ? 160 : 100,
              marginBottom: isStory ? 40 : 20,
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
            }}
          >
            {theme.emoji}
          </div>

          {/* サービス名ラベル */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: isStory ? '12px 32px' : '8px 24px',
              borderRadius: 999,
              background: 'rgba(232,213,181,0.15)',
              border: '1px solid rgba(232,213,181,0.4)',
              color: '#e8d5b5',
              fontSize: isStory ? 32 : isSquare ? 26 : 22,
              marginBottom: isStory ? 60 : 30,
              letterSpacing: '0.1em',
            }}
          >
            ✨ {theme.name}の結果
          </div>

          {/* タイトル（オプション） */}
          {title && (
            <div
              style={{
                fontSize: isStory ? 56 : isSquare ? 48 : 36,
                fontWeight: 'bold',
                color: '#e8d5b5',
                marginBottom: isStory ? 30 : 20,
                textAlign: 'center',
              }}
            >
              {title}
            </div>
          )}

          {/* ヘッドライン（メインメッセージ） */}
          <div
            style={{
              display: 'flex',
              fontSize: isStory ? 64 : isSquare ? 52 : 44,
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: isStory ? 920 : isSquare ? 900 : 1000,
              marginBottom: isStory ? 80 : 40,
              textShadow: '0 4px 16px rgba(0,0,0,0.3)',
              padding: '0 20px',
            }}
          >
            {headline}
          </div>

          {/* 装飾 - 下部のライン */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: isStory ? 60 : 30,
            }}
          >
            <div
              style={{
                width: isStory ? 100 : 60,
                height: 1,
                background: 'rgba(232,213,181,0.5)',
              }}
            />
            <div style={{ fontSize: isStory ? 32 : 20, color: '#e8d5b5' }}>✦</div>
            <div
              style={{
                width: isStory ? 100 : 60,
                height: 1,
                background: 'rgba(232,213,181,0.5)',
              }}
            />
          </div>

          {/* ブランド */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                fontSize: isStory ? 44 : isSquare ? 36 : 28,
                fontWeight: 'bold',
                color: '#e8d5b5',
                letterSpacing: '0.15em',
              }}
            >
              Oracle Portal
            </div>
            <div
              style={{
                fontSize: isStory ? 24 : isSquare ? 20 : 16,
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.1em',
              }}
            >
              無料 AI占いの館
            </div>
            <div
              style={{
                fontSize: isStory ? 22 : isSquare ? 18 : 14,
                color: 'rgba(255,255,255,0.5)',
                marginTop: 8,
              }}
            >
              oracle-portal.vercel.app
            </div>
          </div>

          {/* 装飾 - 下部の星 */}
          <div
            style={{
              position: 'absolute',
              bottom: isStory ? 80 : 40,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              fontSize: isStory ? 40 : 24,
              opacity: 0.6,
            }}
          >
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
          </div>
        </div>
      ),
      {
        width: size.width,
        height: size.height,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
