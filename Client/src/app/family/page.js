'use client';
import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/lib/translations';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function FamilyPage() {
  const { language } = useApp();
  const t = useTranslation(language);

  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const familyId = localStorage.getItem('familyId'); // ✅ FIX

        if (!familyId) {
          console.log("❌ No familyId found");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:5000/api/family/${familyId}` // ✅ FIX
        );

        const data = await res.json();

        console.log("🔥 FAMILY DATA:", data); // DEBUG

        if (res.ok) {
          setFamilyMembers(data);
        } else {
          console.error(data.message);
        }

      } catch (err) {
        console.error("Error fetching family:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFamily();
  }, []);

  const activeCount = familyMembers.filter(c => c.status === 'safe').length;

  const getStatusClass = (status) => {
    if (status === 'safe') return 'status-safe';
    if (status === 'away') return 'status-away';
    return 'status-offline';
  };

  const getStatusLabel = (status) => {
    if (status === 'safe') return t.safe.toUpperCase();
    if (status === 'away') return t.away.toUpperCase();
    return t.offline.toUpperCase();
  };

  return (
    <div className="app-shell">
      <div className="page-container">
        <Header title={t.family_circle} />

        <div className="family-header">
          <h2 className="family-title">{t.trusted_contacts}</h2>
          <span className="active-count">
            {activeCount}/{familyMembers.length} {t.active}
          </span>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            Loading...
          </p>
        ) : familyMembers.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            No family members yet 👀
          </p>
        ) : (
          familyMembers.map((member) => (
            <div
              key={member.id}
              className="glass-card contact-card"
              style={{ flexDirection: 'column', alignItems: 'stretch' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                
                <div className="contact-avatar">
                  {(member.name?.[0] || '?').toUpperCase()}
                </div>

                <div className="contact-info">
                  <div className="contact-name">{member.name}</div>
                  <div className="contact-phone">{member.phone_number}</div>
                  <div className="contact-meta">
                    🕐 {t.last_seen} {member.lastSeen || 'N/A'}
                  </div>
                </div>

                <span className={`status-badge ${getStatusClass(member.status || 'offline')}`}>
                  {getStatusLabel(member.status || 'offline')}
                </span>
              </div>

              <div className="contact-actions">
                <button className="btn btn-ghost">
                  📍 {t.locate}
                </button>
                <button className="btn btn-primary" style={{ boxShadow: 'none' }}>
                  📞 {t.call}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}