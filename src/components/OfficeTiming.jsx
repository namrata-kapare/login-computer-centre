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

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  // Marathi Day Name
  const daysMarathi = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const currentDay = daysMarathi[currentTime.getDay()];

  // Marathi Month Name and Date
  const monthsMarathi = [
    'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
    'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
  ];
  const formattedDate = `${currentTime.getDate()} ${monthsMarathi[currentTime.getMonth()]} ${currentTime.getFullYear()}`;

  // Formatted Current Time (12-hour format with AM/PM)
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

  return (
    <section className="timing-section">
      <div className="container">
        {/* Section Title: "आजची कार्यालयीन वेळ" */}
        <div className="section-header" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h2 className="section-title">आजची कार्यालयीन वेळ</h2>
        </div>

        {/* Decorated Working Hours & Office Status Card */}
        <div className="timing-card">
          {/* 1. Prominent Open / Closed Status Display */}
          <div className={`office-status-banner ${info.isOpen ? 'status-open' : 'status-closed'}`}>
            {info.isOpen ? (
              <>
                <span className="status-dot dot-open"></span>
                <CheckCircle size={22} className="status-icon" />
                <span className="status-text">आज कार्यालय सुरू आहे</span>
              </>
            ) : (
              <>
                <span className="status-dot dot-closed"></span>
                <XCircle size={22} className="status-icon" />
                <span className="status-text">आज कार्यालय बंद आहे</span>
              </>
            )}
          </div>

          {/* 2. Automatic Live Info Grid: Date, Day, Current Time */}
          <div className="timing-live-grid">
            <div className="live-info-box">
              <div className="live-info-label">
                <Calendar size={17} />
                <span>आजची तारीख</span>
              </div>
              <div className="live-info-value">{formattedDate}</div>
            </div>

            <div className="live-info-box">
              <div className="live-info-label">
                <Clock size={17} />
                <span>आजचा वार</span>
              </div>
              <div className="live-info-value">{currentDay}</div>
            </div>

            <div className="live-info-box">
              <div className="live-info-label">
                <Clock size={17} />
                <span>सध्याची वेळ</span>
              </div>
              <div className="live-info-value time-ticker">{formattedTime}</div>
            </div>
          </div>

          {/* 3. Office Working Hours Display */}
          <div className="office-hours-box">
            <div className="hours-title">
              <Clock size={20} />
              <span>कार्यालयीन वेळ:</span>
            </div>
            <div className="hours-time-text">
              {info.todayTimingText || `${info.openingTime} ते ${info.closingTime}`}
            </div>
          </div>

          {/* 4. Special Notice (if set by Admin) */}
          {info.specialNotice && (
            <div className="timing-note">
              <AlertCircle size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#d97706' }} />
              <span><strong>विशेष सूचना:</strong> {info.specialNotice}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
