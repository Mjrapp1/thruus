'use client';

import { useApp } from '@/lib/context';
import { admins, donors, recipients, getOrgById } from '@/lib/data';

export default function AdminView() {
  const { activeUserId, donorStatuses } = useApp();
  const admin = admins.find(a => a.id === activeUserId) || admins[0];
  const org = getOrgById(admin.orgId);
  const orgDonors = donors.filter(d => d.orgId === admin.orgId);
  const orgRecipients = recipients.filter(r => r.orgId === admin.orgId);

  const pending = orgDonors.filter(d => donorStatuses[d.id] === 'pending_confirmation').length;
  const confirmed = orgDonors.filter(d => donorStatuses[d.id] === 'confirmed' || donorStatuses[d.id] === 'connected').length;
  const totalRaised = orgDonors.reduce((sum, d) => sum + d.giftAmount, 0);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--navy-light)' }}>
        <p style={{ fontSize: 12, color: 'var(--purple)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>
          Admin
        </p>
        <h1 style={{
          fontSize: 20,
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          color: 'var(--off-white)',
          marginBottom: 2,
        }}>
          {org?.name}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>{admin.name} · {admin.role}</p>
      </div>

      <div className="scroll-area" style={{ flex: 1, padding: '16px 20px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Total raised', value: `$${totalRaised.toLocaleString()}`, color: 'var(--gold)' },
            { label: 'Confirmed', value: confirmed, color: 'var(--teal)' },
            { label: 'Pending', value: pending, color: pending > 0 ? 'var(--gold)' : 'var(--muted)' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--navy-card)',
              border: '1px solid var(--navy-light)',
              borderRadius: 12,
              padding: '14px 12px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: stat.color, fontFamily: 'var(--font-display)', marginBottom: 2 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Confirmation queue */}
        <p style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>
          Confirmation queue
        </p>

        {orgDonors.map(donor => {
          const recipient = recipients.find(r => r.id === donor.recipientId);
          const status = donorStatuses[donor.id];
          return (
            <div key={donor.id} style={{
              background: 'var(--navy-card)',
              border: '1px solid',
              borderColor: status === 'pending_confirmation' ? 'rgba(200,151,58,0.3)' : 'var(--navy-light)',
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--off-white)', marginBottom: 2 }}>
                    {donor.name}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>{donor.location}</p>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '3px 8px',
                  borderRadius: 100,
                  background: status === 'pending_confirmation'
                    ? 'rgba(200,151,58,0.12)'
                    : status === 'connected'
                    ? 'rgba(123,97,255,0.12)'
                    : 'rgba(42,140,90,0.12)',
                  border: '1px solid',
                  borderColor: status === 'pending_confirmation'
                    ? 'rgba(200,151,58,0.3)'
                    : status === 'connected'
                    ? 'rgba(123,97,255,0.3)'
                    : 'rgba(42,140,90,0.3)',
                }}>
                  <div style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: status === 'pending_confirmation' ? 'var(--gold)' : status === 'connected' ? 'var(--purple)' : 'var(--teal)',
                  }} />
                  <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: status === 'pending_confirmation' ? 'var(--gold)' : status === 'connected' ? 'var(--purple)' : 'var(--teal)',
                  }}>
                    {status === 'pending_confirmation' ? 'PENDING' : status === 'connected' ? 'CONNECTED' : 'CONFIRMED'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: 13, color: 'var(--off-white)' }}>
                  {recipient?.name} · <span style={{ color: 'var(--muted)' }}>{recipient?.location}</span>
                </p>
                <p style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 600 }}>
                  ${donor.giftAmount.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}

        {/* Recipients */}
        <p style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10, marginTop: 20 }}>
          Recipient registry
        </p>

        {orgRecipients.map(r => (
          <div key={r.id} style={{
            background: 'var(--navy-card)',
            border: '1px solid var(--navy-light)',
            borderRadius: 14,
            padding: 16,
            marginBottom: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--off-white)', marginBottom: 2 }}>
                  {r.name}
                </p>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{r.familySize} people · {r.location}</p>
              </div>
              <p style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>
                ${r.needAmount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}

        {/* Platform trust note */}
        <div style={{
          background: 'rgba(11,31,58,0.5)',
          border: '1px solid var(--navy-light)',
          borderRadius: 12,
          padding: 14,
          marginTop: 8,
        }}>
          <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>
            thru.us holds no donor data. All records belong to {org?.name}. Platform handles transaction confirmation, translation, and audit trail only.
          </p>
        </div>

      </div>
    </div>
  );
}
