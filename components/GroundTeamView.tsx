'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import { groundTeam, recipients, donors } from '@/lib/data';

export default function GroundTeamView() {
  const { activeUserId, confirmDonor, donorStatuses } = useApp();
  const member = groundTeam.find(g => g.id === activeUserId) || groundTeam[0];
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeRecipientId, setActiveRecipientId] = useState('rahman-family');

  const orgRecipients = recipients.filter(r => r.orgId === member.orgId);
  const activeRecipient = orgRecipients.find(r => r.id === activeRecipientId) || orgRecipients[0];

  // Find donor for this recipient
  const matchedDonor = donors.find(d => d.recipientId === activeRecipient?.id);

  const handleSend = async () => {
    if (!matchedDonor) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 2000));
    confirmDonor(matchedDonor.id);
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>✓</div>
        <h2 style={{
          fontSize: 26,
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          color: 'var(--off-white)',
          marginBottom: 12,
          lineHeight: 1.3,
        }}>
          Sent.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 32 }}>
          thru.us will handle the confirmation, translation, and routing. The donor will be notified.
        </p>
        <div style={{
          background: 'var(--navy-card)',
          border: '1px solid var(--teal)',
          borderRadius: 16,
          padding: 20,
          width: '100%',
          textAlign: 'left',
          marginBottom: 24,
        }}>
          <p style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>
            Platform is handling
          </p>
          {['Generating donor confirmation', 'Translating family message', 'Routing to donor', 'Creating audit record'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: 'var(--off-white)' }}>{item}</p>
            </div>
          ))}
        </div>
        <button className="btn-secondary" onClick={() => setSent(false)}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--navy-light)' }}>
        <p style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>
          Ground team
        </p>
        <h1 style={{
          fontSize: 22,
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          color: 'var(--off-white)',
        }}>
          {member.name}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
          {member.role} · Conduit Mission
        </p>
      </div>

      {/* Recipient selector */}
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Select family
        </p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {orgRecipients.map(r => (
            <button
              key={r.id}
              onClick={() => { setActiveRecipientId(r.id); setSent(false); }}
              style={{
                padding: '8px 14px',
                borderRadius: 100,
                border: '1px solid',
                borderColor: activeRecipientId === r.id ? 'var(--gold)' : 'var(--navy-light)',
                background: activeRecipientId === r.id ? 'rgba(200,151,58,0.12)' : 'transparent',
                color: activeRecipientId === r.id ? 'var(--gold)' : 'var(--muted)',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s',
              }}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-area" style={{ flex: 1, padding: '16px 20px' }}>
        {/* Photo capture area */}
        <div style={{
          background: 'var(--navy-card)',
          border: '2px dashed var(--navy-light)',
          borderRadius: 20,
          aspectRatio: '4/3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          cursor: 'pointer',
          transition: 'border-color 0.2s',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2540 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>{activeRecipient?.photo}</div>
            <p style={{ fontSize: 12, color: 'rgba(240,237,232,0.4)', fontStyle: 'italic' }}>
              Tap to capture photo
            </p>
          </div>

          {/* Camera icon overlay */}
          <div style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(200,151,58,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}>
            📷
          </div>
        </div>

        {/* Family info */}
        <div style={{
          background: 'var(--navy-card)',
          border: '1px solid var(--navy-light)',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--off-white)', marginBottom: 2 }}>
                {activeRecipient?.name}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--muted)' }}>
                {activeRecipient?.familySize} people · {activeRecipient?.location}
              </p>
            </div>
            <div style={{
              padding: '4px 10px',
              borderRadius: 100,
              background: 'rgba(200,151,58,0.12)',
              border: '1px solid rgba(200,151,58,0.3)',
            }}>
              <span style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600 }}>
                ${activeRecipient?.needAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Donor matched */}
        {matchedDonor && (
          <div style={{
            background: 'var(--navy-card)',
            border: '1px solid var(--navy-light)',
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
          }}>
            <p style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>
              Donor matched
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, color: 'var(--off-white)', fontWeight: 500 }}>{matchedDonor.name}</p>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{matchedDonor.location}</p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 100,
                background: donorStatuses[matchedDonor.id] === 'pending_confirmation'
                  ? 'rgba(200,151,58,0.12)'
                  : 'rgba(42,140,90,0.12)',
                border: '1px solid',
                borderColor: donorStatuses[matchedDonor.id] === 'pending_confirmation'
                  ? 'rgba(200,151,58,0.3)'
                  : 'rgba(42,140,90,0.3)',
              }}>
                <div style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: donorStatuses[matchedDonor.id] === 'pending_confirmation' ? 'var(--gold)' : 'var(--teal)',
                }} />
                <span style={{
                  fontSize: 10,
                  color: donorStatuses[matchedDonor.id] === 'pending_confirmation' ? 'var(--gold)' : 'var(--teal)',
                  fontWeight: 600,
                }}>
                  {donorStatuses[matchedDonor.id] === 'pending_confirmation' ? 'AWAITING' : 'NOTIFIED'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* What happens when you send */}
        <div style={{
          background: 'rgba(42,140,140,0.06)',
          border: '1px solid rgba(42,140,140,0.2)',
          borderRadius: 12,
          padding: 14,
          marginBottom: 4,
        }}>
          <p style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, marginBottom: 6 }}>
            When you tap Send, thru.us will:
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
            Generate the donor confirmation · Translate the family message · Route to donor · Create the audit record · Archive the photo
          </p>
        </div>
      </div>

      {/* Send button */}
      <div style={{ padding: '0 20px 20px' }}>
        <button
          className="btn-primary"
          onClick={handleSend}
          disabled={sending}
          style={{
            background: sending ? 'var(--subtle)' : 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {sending ? (
            <>
              <div className="spin" style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
              }} />
              Sending...
            </>
          ) : (
            'Send liberation photo →'
          )}
        </button>
      </div>
    </div>
  );
}
