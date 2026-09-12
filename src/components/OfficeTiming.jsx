import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { getBusinessInfo } from '../services/api';
import { businessConfig } from '../config/business';

export default function OfficeTiming() {
  const [info, setInfo] = useState({
    openingTime: businessConfig.timing?.openingTime || 'सकाळी ९:००',
    closingTime: businessConfig.timing?.closingTime || 'रात्री ८:००',
    todayTimingText: businessConfig.timing?.todayTimingText || 'सकाळी ९:०० ते रात्री ८:००',
    weekdaysTitle: businessConfig.timing?.weekdaysTitle || 'सोमवार ते शनिवार',
    sundayTitle: businessConfig.timing?.sundayTitle || 'रविवार',
    sundayTime: businessConfig.timing?.sundayTime || 'आवश्यकतेनुसार',
    isOpen: true,
    specialNotice: ''
  });

  useEffect(() => {
    async function loadInfo() {
      const data = await getBusinessInfo();
      if (data) {
        setInfo(prev => ({
          ...prev,
          openingTime: data.openingTime || prev.openingTime,
          closingTime: data.closingTime || prev.closingTime,
          todayTimingText: data.todayTimingText || `${data.openingTime || prev.openingTime} ते ${data.closingTime || prev.closingTime}`,
          isOpen: data.isOpen !== undefined ? data.isOpen : true,
          specialNotice: data.specialNotice || ''
        }));
      }
    }
    loadInfo();
  }, []);

  return (
    <section className="timing-section">
      <div className="container">
        <div className="section-header desktop-only" style={{ marginBottom: '1.5rem' }}>
          <div className="section-badge">
            <Clock size={16} />
            <span>आजची कार्यालयीन स्थिती व वेळ (Working Hours)</span>
          </div>
          <h2 className="section-title">आजची कार्यालयीन वेळ</h2>
        </div>

        <div className="mobile-only-flex" style={{ display: 'none', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ padding: '0.6rem 1.25rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0, textAlign: 'center' }}>आजची कार्यालयीन वेळ</h2>
          </div>
        </div>

        <div className="timing-card">
          {/* Prominent Open / Closed Status Display */}
          <div className="timing-block" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              {info.isOpen ? (
                <span className="status-badge-public open">
                  <CheckCircle size={18} />
                  <span>🟢 आज कार्यालय खुले आहे</span>
                </span>
              ) : (
                <span className="status-badge-public closed">
                  <XCircle size={18} />
                  <span>🔴 आज कार्यालय बंद आहे</span>
                </span>
              )}
            </div>

            <div className="timing-day" style={{ justifyContent: 'center' }}>
              <Calendar size={20} />
              <span>कार्यालयीन वेळ</span>
            </div>
            <div className="timing-val" style={{ fontSize: '1.35rem', padding: '0.6rem 1.5rem', marginTop: '0.4rem' }}>
              {info.todayTimingText || `${info.openingTime} ते ${info.closingTime}`}
            </div>
          </div>

          {/* Regular Weekdays & Sunday Summary */}
          <div className="timing-block">
            <div className="timing-day">
              <Clock size={18} />
              <span>{info.weekdaysTitle}</span>
            </div>
            <p style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
              {info.openingTime} ते {info.closingTime}
            </p>
          </div>

          <div className="timing-block">
            <div className="timing-day">
              <Clock size={18} />
              <span>{info.sundayTitle}</span>
            </div>
            <p style={{ fontWeight: 600, color: '#d97706' }}>
              {info.sundayTime}
            </p>
          </div>

          {/* Daily Special Notice Support */}
          {info.specialNotice && (
            <div className="timing-note" style={{ gridColumn: '1 / -1' }}>
              <AlertCircle size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#d97706' }} />
              <span><strong>विशेष सूचना:</strong> {info.specialNotice}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
