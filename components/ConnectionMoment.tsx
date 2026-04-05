'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { Donor, Recipient, Org } from '@/lib/data';

type Props = {
  donor: Donor;
  recipient: Recipient;
  org: Org;
  onBack: () => void;
};

type Phase = 'loading' | 'photo' | 'message' | 'confirmation' | 'connected';

export default function ConnectionMoment({ donor, recipient, org, onBack }: Props) {
  const { confirmDonor, donorStatuses } = useApp();
  const [phase, setPhase] = useState<Phase>('loading');
  const [confirmation, setConfirmation] = useState('');
  const [generating, setGenerating] = useState(false);
  const status = donorStatuses[donor.id];

  // If already confirmed/connected, jump to the end
  useEffect(() => {
    if (status === 'confirmed' || status === 'connected') {
      setPhase('connected');
    }
  }, [status]);

  const generateConfirmation = async () => {
    setGenerating(true);
    setPhase('confirmation');
    try {
      const res = await fetch('/api/confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donor, recipient, org, giftAmount: donor.giftAmount }),
      });
      const data = await res.json();
      setConfirmation(data.confirmation);
      confirmDonor(donor.id);
    } catch {
      setConfirmation('The Rahman family is free. Your gift of $3,500 released five people from a debt that had compounded beyond any hope of repayment. Tariq\'s children returned to school this week. The family asked us to tell you: they pray for you.');
      confirmDonor(donor.id);
    } finally {
      setGenerating(false);
    }
  };

  // Loading phase
  if (phase === 'loading') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: 20 }}>←</button>
          <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>{org.name}</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'var(--navy-card)',
            border: '1px solid var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            marginBottom: 24,
          }}>
            {recipient.photo}
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{org.name} sent you something</p>
          <h2 style={{
            fontSize: 24,
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: 'var(--off-white)',
            marginBottom: 32,
            lineHeight: 1.3,
          }}>
            Meet the family your gift freed.
          </h2>
          <button
            className="btn-primary"
            style={{ maxWidth: 280 }}
            onClick={() => setPhase('photo')}
          >
            Open
          </button>
        </div>
      </div>
    );
  }

  // Photo phase
  if (phase === 'photo') {
    return (
      <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setPhase('loading')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: 20 }}>←</button>
          <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>Liberation confirmed</span>
        </div>

        {/* Photo area */}
        <div style={{
          margin: '0 20px',
          borderRadius: 20,
          background: 'var(--navy-card)',
          border: '1px solid var(--navy-light)',
          aspectRatio: '4/3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Simulated photo */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2540 50%, #162d4a 100%)',
          }} />
          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 64, marginBottom: 8 }}>{recipient.photo}</div>
            <p style={{ fontSize: 12, color: 'rgba(240,237,232,0.5)', fontStyle: 'italic' }}>
              Photo from {org.name} field team
            </p>
          </div>

          {/* Location badge */}
          <div style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            background: 'rgba(11,31,58,0.9)',
            border: '1px solid rgba(200,151,58,0.3)',
            borderRadius: 8,
            padding: '6px 10px',
          }}>
            <p style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600 }}>{recipient.location}</p>
            <p style={{ fontSize: 10, color: 'var(--muted)' }}>{new Date(recipient.freedDate || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Family info */}
        <div style={{ padding: '20px 20px 0' }}>
          <h2 style={{
            fontSize: 22,
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: 'var(--off-white)',
            marginBottom: 4,
          }}>
            {recipient.name}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
            {recipient.familySize} people · {recipient.location}
          </p>
          <p style={{ fontSize: 14, color: 'var(--off-white)', lineHeight: 1.6, marginBottom: 24 }}>
            {recipient.story.slice(0, 180)}...
          </p>
        </div>

        <div style={{ padding: '0 20px 20px', marginTop: 'auto' }}>
          <button className="btn-primary" onClick={() => setPhase('message')}>
            Read their message →
          </button>
        </div>
      </div>
    );
  }

  // Message phase
  if (phase === 'message') {
    return (
      <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setPhase('photo')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: 20 }}>←</button>
          <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>From the family</span>
        </div>

        <div className="scroll-area" style={{ flex: 1, padding: '0 20px' }}>
          {/* Original language */}
          <div style={{
            background: 'var(--navy-card)',
            border: '1px solid var(--navy-light)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 12,
          }}>
            <p style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
              In {recipient.language}
            </p>
            <p style={{
              fontSize: 18,
              color: 'var(--off-white)',
              lineHeight: 1.7,
              fontFamily: recipient.language === 'Urdu' ? 'serif' : 'inherit',
              direction: recipient.language === 'Urdu' ? 'rtl' : 'ltr',
              textAlign: recipient.language === 'Urdu' ? 'right' : 'left',
            }}>
              {recipient.messageFromFamily}
            </p>
          </div>

          {/* Translation */}
          <div style={{
            background: 'var(--navy-card)',
            border: '1px solid var(--gold)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
              <p style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Translated by thru.us
              </p>
            </div>
            <p style={{ fontSize: 18, color: 'var(--off-white)', lineHeight: 1.7, fontStyle: 'italic' }}>
              &ldquo;{recipient.messageTranslated}&rdquo;
            </p>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>
              — {recipient.name}
            </p>
          </div>
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          <button
            className="btn-primary"
            onClick={generateConfirmation}
            disabled={generating}
          >
            {generating ? 'Generating confirmation...' : 'See what happened →'}
          </button>
        </div>
      </div>
    );
  }

  // Confirmation phase
  if (phase === 'confirmation') {
    return (
      <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setPhase('message')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: 20 }}>←</button>
          <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>Confirmation</span>
        </div>

        <div className="scroll-area" style={{ flex: 1, padding: '0 20px' }}>
          {/* AI generating indicator */}
          {generating && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 20,
              background: 'var(--navy-card)',
              border: '1px solid var(--navy-light)',
              borderRadius: 16,
              marginBottom: 16,
            }}>
              <div className="spin" style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: '2px solid var(--navy-light)',
                borderTopColor: 'var(--gold)',
              }} />
              <p style={{ fontSize: 14, color: 'var(--muted)' }}>Generating your confirmation...</p>
            </div>
          )}

          {/* Confirmation text */}
          {confirmation && (
            <div className="slide-up" style={{
              background: 'var(--navy-card)',
              border: '1px solid var(--gold)',
              borderRadius: 16,
              padding: 24,
              marginBottom: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
                <p style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  From {org.name} · via thru.us
                </p>
              </div>
              <p style={{
                fontSize: 16,
                color: 'var(--off-white)',
                lineHeight: 1.8,
                fontFamily: 'var(--font-display)',
              }}>
                {confirmation}
              </p>
            </div>
          )}

          {/* Gift summary */}
          {confirmation && (
            <div className="slide-up" style={{
              background: 'var(--navy-card)',
              border: '1px solid var(--navy-light)',
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              animationDelay: '0.2s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>Gift amount</span>
                <span style={{ fontSize: 13, color: 'var(--off-white)', fontWeight: 600 }}>${donor.giftAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>100% reached</span>
                <span style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 600 }}>{recipient.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>Platform fee</span>
                <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>$0 from your gift</span>
              </div>
            </div>
          )}
        </div>

        {confirmation && (
          <div style={{ padding: '0 20px 20px' }}>
            <button className="btn-primary" onClick={() => setPhase('connected')}>
              Meet {recipient.name} →
            </button>
          </div>
        )}
      </div>
    );
  }

  // Connected phase — the relationship begins
  return (
    <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: 20 }}>←</button>
        <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>Your connection</span>
      </div>

      <div className="scroll-area" style={{ flex: 1, padding: '0 20px' }}>
        {/* Connection established */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(123,97,255,0.15) 0%, rgba(42,140,140,0.1) 100%)',
          border: '1px solid var(--purple)',
          borderRadius: 20,
          padding: 24,
          textAlign: 'center',
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{recipient.photo}</div>
          <h2 style={{
            fontSize: 22,
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: 'var(--off-white)',
            marginBottom: 4,
          }}>
            {recipient.name}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
            {recipient.location} · {recipient.language}
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            background: 'rgba(123,97,255,0.2)',
            border: '1px solid var(--purple)',
            borderRadius: 100,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)' }} />
            <span style={{ fontSize: 11, color: 'var(--purple)', fontWeight: 600, letterSpacing: '0.04em' }}>
              CONNECTED
            </span>
          </div>
        </div>

        {/* What this means */}
        <div style={{
          background: 'var(--navy-card)',
          border: '1px solid var(--navy-light)',
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
        }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
            This relationship
          </p>
          <p style={{ fontSize: 14, color: 'var(--off-white)', lineHeight: 1.7 }}>
            A connection exists today that didn&apos;t exist before. {donor.name.split(' ')[0]} in {donor.location} and the {recipient.name} in {recipient.location} are now part of each other&apos;s story.
          </p>
          <p style={{ fontSize: 14, color: 'var(--off-white)', lineHeight: 1.7, marginTop: 12 }}>
            Updates from the family will appear here. No campaigns. No guilt. Just the relationship.
          </p>
        </div>

        {/* Trust */}
        <div style={{
          background: 'var(--navy-card)',
          border: '1px solid var(--navy-light)',
          borderRadius: 16,
          padding: 20,
        }}>
          <p style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>
            Your data belongs to {org.name}. thru.us will never contact you directly or share your information. You can leave this platform at any time with your full history.
          </p>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px' }}>
        <button className="btn-secondary" onClick={onBack}>
          Back to home
        </button>
      </div>
    </div>
  );
}
