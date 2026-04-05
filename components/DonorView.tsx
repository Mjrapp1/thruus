'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import { getDonorById, getRecipientById, getOrgById } from '@/lib/data';
import ConnectionMoment from './ConnectionMoment';

export default function DonorView() {
  const { activeUserId, donorStatuses, setActiveView } = useApp();
  const donor = getDonorById(activeUserId);
  const [showMoment, setShowMoment] = useState(false);

  if (!donor) return null;

  const recipient = getRecipientById(donor.recipientId);
  const org = getOrgById(donor.orgId);
  const status = donorStatuses[donor.id];

  if (!recipient || !org) return null;

  if (showMoment) {
    return <ConnectionMoment donor={donor} recipient={recipient} org={org} onBack={() => setShowMoment(false)} />;
  }

  const daysSince = Math.floor((Date.now() - new Date(donor.giftDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>Good evening,</p>
            <h1 style={{
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--off-white)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.2,
            }}>
              {donor.name.split(' ')[0]}
            </h1>
          </div>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--navy-light)',
            border: '1px solid var(--navy-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}>
            👤
          </div>
        </div>

        {/* Trust mark */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '3px 8px',
          background: 'rgba(200,151,58,0.08)',
          border: '1px solid rgba(200,151,58,0.2)',
          borderRadius: 6,
          marginTop: 8,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
          <span style={{ fontSize: 10, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.06em' }}>
            POWERED BY THRU.US
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="scroll-area" style={{ flex: 1, padding: '20px' }}>

        {/* Pending notification */}
        {status === 'pending_confirmation' && (
          <div
            className="fade-in"
            style={{
              background: 'var(--navy-card)',
              border: '1px solid var(--gold)',
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              cursor: 'pointer',
            }}
            onClick={() => setShowMoment(true)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div className="pulse-gold" style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--gold)',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Something happened
              </span>
            </div>

            <h2 style={{
              fontSize: 20,
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              color: 'var(--off-white)',
              marginBottom: 8,
              lineHeight: 1.3,
            }}>
              {org.name} sent a message
            </h2>

            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 16 }}>
              {daysSince === 0 ? 'Today' : `${daysSince} day${daysSince !== 1 ? 's' : ''} ago`} you gave ${donor.giftAmount.toLocaleString()} to {org.name}. There&apos;s an update about the family your gift reached.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--gold)',
              fontSize: 14,
              fontWeight: 600,
            }}>
              See what happened
              <span style={{ fontSize: 18 }}>→</span>
            </div>
          </div>
        )}

        {/* Connected state */}
        {status === 'connected' && (
          <div
            className="fade-in"
            style={{
              background: 'var(--navy-card)',
              border: '1px solid var(--purple)',
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              cursor: 'pointer',
            }}
            onClick={() => setShowMoment(true)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--purple)',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 12, color: 'var(--purple)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Connected
              </span>
            </div>

            <h2 style={{
              fontSize: 20,
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              color: 'var(--off-white)',
              marginBottom: 8,
            }}>
              {recipient.name}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
              {recipient.location} · {recipient.familySize} people · {recipient.language}
            </p>
          </div>
        )}

        {/* Gift summary */}
        <div style={{
          background: 'var(--navy-card)',
          border: '1px solid var(--navy-light)',
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
        }}>
          <p style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Your gift
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{
              fontSize: 32,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--off-white)',
            }}>
              ${donor.giftAmount.toLocaleString()}
            </span>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>
              {new Date(donor.giftDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--gold)', marginTop: 4, fontWeight: 500 }}>
            {org.name}
          </p>
        </div>

        {/* About the org */}
        <div style={{
          background: 'var(--navy-card)',
          border: '1px solid var(--navy-light)',
          borderRadius: 16,
          padding: 20,
        }}>
          <p style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            About {org.name}
          </p>
          <p style={{ fontSize: 14, color: 'var(--off-white)', lineHeight: 1.6 }}>
            {org.mission}
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
            {org.location}
          </p>
        </div>

      </div>

      {/* Tab bar */}
      <div style={{
        height: 80,
        background: 'rgba(11,31,58,0.98)',
        borderTop: '1px solid var(--navy-light)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        padding: '12px 0 0',
        flexShrink: 0,
      }}>
        {[
          { icon: '🏠', label: 'Home', view: 'home' },
          { icon: '🤝', label: 'Connection', view: 'moment' },
          { icon: '📋', label: 'History', view: 'history' },
          { icon: '⚙️', label: 'Settings', view: 'settings' },
        ].map(tab => (
          <button
            key={tab.view}
            onClick={() => tab.view === 'moment' ? setShowMoment(true) : setActiveView(tab.view)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              flex: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: tab.view === 'home' ? 1 : 0.4,
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10,
              fontWeight: 500,
              color: tab.view === 'home' ? 'var(--gold)' : 'var(--muted)',
              fontFamily: 'var(--font-body)',
            }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
