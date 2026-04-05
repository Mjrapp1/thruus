'use client';

import { useApp } from '@/lib/context';
import AccountSwitcher from '@/components/AccountSwitcher';
import DonorView from '@/components/DonorView';
import GroundTeamView from '@/components/GroundTeamView';
import AdminView from '@/components/AdminView';

export default function Home() {
  const { accountType } = useApp();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <AccountSwitcher />

      <div style={{
        marginTop: 80,
        marginBottom: 40,
        width: 390,
        height: 'calc(100vh - 120px)',
        maxHeight: 844,
        background: 'var(--navy)',
        borderRadius: 48,
        border: '2px solid var(--navy-light)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--off-white)' }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--off-white)' }}>●●● WiFi 100%</span>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          {accountType === 'donor' && <DonorView />}
          {accountType === 'ground-team' && <GroundTeamView />}
          {accountType === 'admin' && <AdminView />}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: -20 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'Georgia, serif' }}>thru.us</span>
        <span style={{ fontSize: 11, color: 'var(--subtle)' }}>prototype · not for distribution</span>
      </div>
    </div>
  );
}
