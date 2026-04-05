'use client';

import { useApp, AccountType } from '@/lib/context';
import { donors, groundTeam, admins } from '@/lib/data';

export default function AccountSwitcher() {
  const { accountType, setAccountType, activeUserId, setActiveUserId, setActiveView } = useApp();

  const switchTo = (type: AccountType, userId: string) => {
    setAccountType(type);
    setActiveUserId(userId);
    setActiveView('home');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(11, 31, 58, 0.98)',
      borderBottom: '1px solid #1E3D5C',
      backdropFilter: 'blur(20px)',
      padding: '12px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto' }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#8B9DB0',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          marginRight: 4,
        }}>
          View as
        </span>

        {/* Donor accounts */}
        {donors.slice(0, 2).map(donor => (
          <button
            key={donor.id}
            onClick={() => switchTo('donor', donor.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 100,
              border: '1px solid',
              borderColor: accountType === 'donor' && activeUserId === donor.id ? '#C8973A' : '#1E3D5C',
              background: accountType === 'donor' && activeUserId === donor.id ? 'rgba(200,151,58,0.12)' : 'transparent',
              color: accountType === 'donor' && activeUserId === donor.id ? '#C8973A' : '#8B9DB0',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-body)',
            }}
          >
            {donor.name.split(' ')[0]} <span style={{ opacity: 0.6, fontSize: 10 }}>donor</span>
          </button>
        ))}

        {/* Ground team */}
        <button
          onClick={() => switchTo('ground-team', groundTeam[0].id)}
          style={{
            padding: '6px 14px',
            borderRadius: 100,
            border: '1px solid',
            borderColor: accountType === 'ground-team' ? '#2A8C8C' : '#1E3D5C',
            background: accountType === 'ground-team' ? 'rgba(42,140,140,0.12)' : 'transparent',
            color: accountType === 'ground-team' ? '#2A8C8C' : '#8B9DB0',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-body)',
          }}
        >
          {groundTeam[0].name.split(' ')[0]} <span style={{ opacity: 0.6, fontSize: 10 }}>ground team</span>
        </button>

        {/* Admin */}
        <button
          onClick={() => switchTo('admin', admins[0].id)}
          style={{
            padding: '6px 14px',
            borderRadius: 100,
            border: '1px solid',
            borderColor: accountType === 'admin' ? '#7B61FF' : '#1E3D5C',
            background: accountType === 'admin' ? 'rgba(123,97,255,0.12)' : 'transparent',
            color: accountType === 'admin' ? '#7B61FF' : '#8B9DB0',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-body)',
          }}
        >
          {admins[0].name.split(' ')[0]} <span style={{ opacity: 0.6, fontSize: 10 }}>admin</span>
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8973A' }} />
          <span style={{ fontSize: 11, color: '#8B9DB0', fontWeight: 500 }}>thru.us prototype</span>
        </div>
      </div>
    </div>
  );
}
