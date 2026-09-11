import React from 'react';
import { ShieldCheck, Zap, Users, CheckCircle } from 'lucide-react';
import { businessConfig } from '../config/business';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Text Column */}
          <div className="about-text-content">
            <div className="section-badge">आमच्याबद्दल (About Us)</div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              विश्वासार्ह व जलद संगणक सेवा
            </h2>
            <p>
              <strong>{businessConfig.businessName}</strong> हे जेजुरी व परिसरातील नागरिकांसाठी सर्व प्रकारच्या शासकीय, निमशासकीय व डिजिटल सेवा एकाच छताखाली पुरवणारे प्रमुख केंद्र आहे.
            </p>
            <p>
              आमचा मुख्य उद्देश स्थानिक नागरिकांना व शेतकरी बांधवांना विविध दाखले, प्रमाणपत्रे, ७/१२ उतारे, पॅन कार्ड आणि ऑनलाइन अर्ज प्रक्रिया अतिशय सोप्या व पारदर्शक पद्धतीने उपलब्ध करून देणे हा आहे.
            </p>
            <p>
              कोणत्याही कामासाठी लागणारी अचूक कागदपत्रे आणि योग्य माहिती देऊन आम्ही आपले काम वेळेत पूर्ण करण्यासाठी कटीबद्ध आहोत.
            </p>
          </div>

          {/* Right Features Column */}
          <div className="about-image-wrapper">
            <div className="about-feature-box">
              <div className="about-feature-icon">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>पारदर्शक व विश्वासार्ह</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  योग्य मार्गदर्शन व अचूक माहितीसह कामे पूर्ण.
                </p>
              </div>
            </div>

            <div className="about-feature-box">
              <div className="about-feature-icon">
                <Zap size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>तत्पर व वेगवान सेवा</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  नागरिकांच्या वेळेची बचत व गतिमान अर्ज प्रक्रिया.
                </p>
              </div>
            </div>

            <div className="about-feature-box">
              <div className="about-feature-icon">
                <Users size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>सर्व वयोगटांसाठी सोपे</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  ज्येष्ठ नागरिक व शेतकऱ्यांसाठी सुलभ व सविस्तर मदत.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
