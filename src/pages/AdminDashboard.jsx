import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getBusinessInfo, 
  getServices, 
  logoutAdmin, 
  updateTiming, 
  updateStatus, 
  updateNotice, 
  updateBusinessInfo,
  createService,
  updateService,
  deleteService 
} from '../services/api';

import { 
  LogOut, 
  Clock, 
  AlertCircle, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Save, 
  Search, 
  Settings, 
  Layers, 
  PhoneCall, 
  MapPin, 
  Mail, 
  Monitor,
  Check,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Active Tab state: 'status_timing' | 'notice' | 'services' | 'contact'
  const [activeTab, setActiveTab] = useState('status_timing');

  // Business info state
  const [businessInfo, setBusinessInfo] = useState({
    businessNameMarathi: '',
    phone: '',
    email: '',
    address: '',
    openingTime: 'सकाळी ९:००',
    closingTime: 'रात्री ८:००',
    isOpen: true,
    specialNotice: ''
  });

  // Services list state
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('सर्व सेवा');

  // UI state
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Timing form
  const [openingTimeInput, setOpeningTimeInput] = useState('सकाळी ९:००');
  const [closingTimeInput, setClosingTimeInput] = useState('रात्री ८:००');

  // Notice form
  const [specialNoticeInput, setSpecialNoticeInput] = useState('');

  // Contact form
  const [contactForm, setContactForm] = useState({
    businessNameMarathi: '',
    phone: '',
    email: '',
    address: ''
  });

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingServiceId, setDeletingServiceId] = useState(null);

  // Form data state for Add/Edit Modal
  const [serviceFormData, setServiceFormData] = useState({
    marathiName: '',
    englishName: '',
    category: 'प्रमाणपत्र व शासकीय सेवा',
    shortDescription: '',
    purpose: '',
    documentsText: '',
    keywordsText: '',
    isActive: true,
    icon: 'FileText'
  });

  // Categories list
  const categoryOptions = [
    "प्रमाणपत्र व शासकीय सेवा",
    "शेतकरी व जमीन संबंधित सेवा",
    "ऑनलाइन शैक्षणिक सेवा",
    "पॅन / आधार व ओळखपत्र सेवा",
    "प्रिंटिंग, झेरॉक्स व डिजिटल सेवा",
    "इतर ऑनलाइन सेवा"
  ];

  // Fetch initial data
  const loadData = async () => {
    setLoading(true);
    try {
      const bData = await getBusinessInfo();
      if (bData) {
        setBusinessInfo(bData);
        setOpeningTimeInput(bData.openingTime || 'सकाळी ९:००');
        setClosingTimeInput(bData.closingTime || 'रात्री ८:००');
        setSpecialNoticeInput(bData.specialNotice || '');
        setContactForm({
          businessNameMarathi: bData.businessNameMarathi || '',
          phone: bData.phone || '',
          email: bData.email || '',
          address: bData.address || ''
        });
      }

      const sData = await getServices(true);
      setServices(sData || []);
    } catch (err) {
      showFeedback('error', 'माहिती लोड करण्यात त्रुटी आली.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: '', message: '' });
    }, 4000);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  // 1. Status Update Toggle
  const handleToggleStatus = async (newStatus) => {
    try {
      const res = await updateStatus(newStatus);
      setBusinessInfo(prev => ({ ...prev, isOpen: res.isOpen }));
      showFeedback('success', res.isOpen ? 'कार्यालय खुले केले आहे.' : 'कार्यालय बंद केले आहे.');
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // 2. Timing Update
  const handleTimingSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateTiming(openingTimeInput, closingTimeInput);
      setBusinessInfo(prev => ({
        ...prev,
        openingTime: res.openingTime,
        closingTime: res.closingTime,
        todayTimingText: res.todayTimingText
      }));
      showFeedback('success', 'कार्यालयीन वेळ यशस्वीरीत्या अपडेट केली.');
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // 3. Notice Update & Clear
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateNotice(specialNoticeInput);
      setBusinessInfo(prev => ({ ...prev, specialNotice: res.specialNotice }));
      showFeedback('success', 'विशेष सूचना यशस्वीरीत्या अपडेट केली.');
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  const handleClearNotice = async () => {
    try {
      const res = await updateNotice('');
      setSpecialNoticeInput('');
      setBusinessInfo(prev => ({ ...prev, specialNotice: '' }));
      showFeedback('success', 'विशेष सूचना काढून टाकली.');
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // 4. Contact Update
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateBusinessInfo(contactForm);
      setBusinessInfo(prev => ({ ...prev, ...res }));
      showFeedback('success', 'संपर्क माहिती यशस्वीरीत्या अपडेट केली.');
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // 5. Toggle Service Active (ON/OFF)
  const handleToggleServiceActive = async (service) => {
    try {
      const newActive = !service.isActive;
      const updated = await updateService(service.id, { isActive: newActive });
      setServices(prev => prev.map(s => s.id === service.id ? { ...s, isActive: updated.isActive } : s));
      showFeedback('success', `${service.marathiName} सेवा ${updated.isActive ? 'सुरू (ON)' : 'बंद (OFF)'} केली.`);
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setServiceFormData({
      marathiName: '',
      englishName: '',
      category: 'प्रमाणपत्र व शासकीय सेवा',
      shortDescription: '',
      purpose: '',
      documentsText: '',
      keywordsText: '',
      isActive: true,
      icon: 'FileText'
    });
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (service) => {
    setEditingService(service);
    setServiceFormData({
      marathiName: service.marathiName || '',
      englishName: service.englishName || '',
      category: service.category || 'प्रमाणपत्र व शासकीय सेवा',
      shortDescription: service.shortDescription || '',
      purpose: service.purpose || '',
      documentsText: Array.isArray(service.documents) ? service.documents.join('\n') : '',
      keywordsText: Array.isArray(service.keywords) ? service.keywords.join(', ') : '',
      isActive: service.isActive !== false,
      icon: service.icon || 'FileText'
    });
  };

  // Save Add Service
  const handleSaveAddService = async (e) => {
    e.preventDefault();
    try {
      const docsArray = serviceFormData.documentsText
        .split('\n')
        .map(d => d.trim())
        .filter(Boolean);

      const keywordsArray = serviceFormData.keywordsText
        .split(',')
        .map(k => k.trim())
        .filter(Boolean);

      const payload = {
        marathiName: serviceFormData.marathiName,
        englishName: serviceFormData.englishName,
        category: serviceFormData.category,
        shortDescription: serviceFormData.shortDescription,
        purpose: serviceFormData.purpose,
        documents: docsArray,
        keywords: keywordsArray,
        isActive: serviceFormData.isActive,
        icon: serviceFormData.icon
      };

      const newService = await createService(payload);
      setServices(prev => [...prev, newService]);
      setIsAddModalOpen(false);
      showFeedback('success', 'नवीन सेवा यशस्वीरीत्या जोडली.');
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // Save Edit Service
  const handleSaveEditService = async (e) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const docsArray = serviceFormData.documentsText
        .split('\n')
        .map(d => d.trim())
        .filter(Boolean);

      const keywordsArray = serviceFormData.keywordsText
        .split(',')
        .map(k => k.trim())
        .filter(Boolean);

      const payload = {
        marathiName: serviceFormData.marathiName,
        englishName: serviceFormData.englishName,
        category: serviceFormData.category,
        shortDescription: serviceFormData.shortDescription,
        purpose: serviceFormData.purpose,
        documents: docsArray,
        keywords: keywordsArray,
        isActive: serviceFormData.isActive,
        icon: serviceFormData.icon
      };

      const updated = await updateService(editingService.id, payload);
      setServices(prev => prev.map(s => s.id === editingService.id ? updated : s));
      setEditingService(null);
      showFeedback('success', 'सेवा माहिती अपडेट केली.');
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // Confirm Delete Service
  const handleConfirmDelete = async () => {
    if (!deletingServiceId) return;

    try {
      await deleteService(deletingServiceId);
      setServices(prev => prev.filter(s => s.id !== deletingServiceId));
      setDeletingServiceId(null);
      showFeedback('success', 'सेवा यशस्वीरीत्या हटवली.');
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // Filtered Services List
  const filteredServices = services.filter(service => {
    const catMatch = selectedCategory === 'सर्व सेवा' || service.category === selectedCategory;
    if (!catMatch) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (service.marathiName && service.marathiName.toLowerCase().includes(q)) ||
      (service.englishName && service.englishName.toLowerCase().includes(q)) ||
      (service.shortDescription && service.shortDescription.toLowerCase().includes(q))
    );
  });

  return (
    <div className="admin-dashboard-page">
      {/* Top Bar Header */}
      <header className="admin-topbar">
        <div className="container admin-topbar-inner">
          <div className="admin-brand">
            <div className="admin-brand-icon">
              <Monitor size={22} />
            </div>
            <div>
              <h1 className="admin-brand-title">प्रशासक डॅशबोर्ड</h1>
              <p className="admin-brand-subtitle">
                Login Computer Centre आणि ई-सुविधा केंद्र वेबसाइट व्यवस्थापन
              </p>
            </div>
          </div>

          <div className="admin-user-action">
            <button onClick={handleLogout} className="btn-logout">
              <LogOut size={18} />
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Feedback Banner */}
      {feedback.message && (
        <div className={`admin-feedback-banner ${feedback.type === 'error' ? 'error' : 'success'}`}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {feedback.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            <span>{feedback.message}</span>
          </div>
        </div>
      )}

      {/* Main Dashboard Body */}
      <main className="admin-main container">
        {/* Navigation Tabs Bar */}
        <div className="admin-tabs-nav">
          <button 
            className={`admin-tab-btn ${activeTab === 'status_timing' ? 'active' : ''}`}
            onClick={() => setActiveTab('status_timing')}
          >
            <Clock size={18} />
            <span>कार्यालयीन वेळ व स्थिती</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'notice' ? 'active' : ''}`}
            onClick={() => setActiveTab('notice')}
          >
            <AlertCircle size={18} />
            <span>विशेष सूचना</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Layers size={18} />
            <span>सेवा व्यवस्थापन ({services.length})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <Settings size={18} />
            <span>संपर्क माहिती</span>
          </button>
        </div>

        {/* -------------------------------------------------------------
            TAB 1: OFFICE STATUS & TIMING
            ------------------------------------------------------------- */}
        {activeTab === 'status_timing' && (
          <div className="admin-card-section">
            <h2 className="admin-section-title">
              <Clock size={22} style={{ color: 'var(--primary-blue)' }} />
              <span>आजची कार्यालयीन स्थिती व वेळ व्यवस्थापन</span>
            </h2>

            <div className="admin-grid-2">
              {/* Box 1: Open / Closed Status Toggle */}
              <div className="admin-panel-card">
                <h3 className="panel-card-heading">१. कार्यालयाची सध्याची स्थिती</h3>
                <p className="panel-card-desc">
                  वेबसाइटवर आज कार्यालय खुले आहे की बंद आहे ते सेट करा.
                </p>

                <div className="status-current-badge">
                  वर्तमान स्थिती:{' '}
                  {businessInfo.isOpen ? (
                    <span className="badge-open">🟢 खुले आहे (Open)</span>
                  ) : (
                    <span className="badge-closed">🔴 बंद आहे (Closed)</span>
                  )}
                </div>

                <div className="status-toggle-actions">
                  <button 
                    onClick={() => handleToggleStatus(true)} 
                    className={`btn-status-toggle ${businessInfo.isOpen ? 'active-open' : ''}`}
                  >
                    <CheckCircle size={20} />
                    <span>कार्यालय खुले</span>
                  </button>

                  <button 
                    onClick={() => handleToggleStatus(false)} 
                    className={`btn-status-toggle ${!businessInfo.isOpen ? 'active-closed' : ''}`}
                  >
                    <XCircle size={20} />
                    <span>कार्यालय बंद</span>
                  </button>
                </div>
              </div>

              {/* Box 2: Opening & Closing Time Update */}
              <div className="admin-panel-card">
                <h3 className="panel-card-heading">२. कार्यालयीन वेळ बदला</h3>
                <p className="panel-card-desc">
                  मोबाईल किंवा लॅपटॉपवरून दररोजची वेळ अपडेट करा.
                </p>

                <form onSubmit={handleTimingSubmit} className="admin-form">
                  <div className="form-group">
                    <label className="form-label">उघडण्याची वेळ (Opening Time)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={openingTimeInput}
                      onChange={(e) => setOpeningTimeInput(e.target.value)}
                      placeholder="उदा. सकाळी ९:००"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">बंद होण्याची वेळ (Closing Time)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={closingTimeInput}
                      onChange={(e) => setClosingTimeInput(e.target.value)}
                      placeholder="उदा. रात्री ८:००"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary-action">
                    <Save size={18} />
                    <span>वेळ अपडेट करा</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: SPECIAL NOTICE
            ------------------------------------------------------------- */}
        {activeTab === 'notice' && (
          <div className="admin-card-section">
            <h2 className="admin-section-title">
              <AlertCircle size={22} style={{ color: 'var(--primary-blue)' }} />
              <span>आजची विशेष सूचना व्यवस्थापन</span>
            </h2>

            <div className="admin-panel-card" style={{ maxWidth: '720px' }}>
              <p className="panel-card-desc">
                नागरिक व ग्राहकांसाठी कोणतीही महत्त्वाची सूचना (उदा. "उद्या कार्यालय १० वाजता सुरू होईल", "HSC १७ नंबर फॉर्म सुरू आहेत") इथे लिहू शकता.
              </p>

              <form onSubmit={handleNoticeSubmit} className="admin-form">
                <div className="form-group">
                  <label className="form-label">विशेष सूचना मजकूर:</label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    value={specialNoticeInput}
                    onChange={(e) => setSpecialNoticeInput(e.target.value)}
                    placeholder="उदा. उद्या कार्यालय सकाळी १० वाजता सुरू होईल..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn-primary-action">
                    <Save size={18} />
                    <span>सूचना अपडेट करा</span>
                  </button>

                  {businessInfo.specialNotice && (
                    <button 
                      type="button" 
                      onClick={handleClearNotice}
                      className="btn-danger-outline"
                    >
                      <Trash2 size={18} />
                      <span>सूचना काढून टाका</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: SERVICES MANAGEMENT
            ------------------------------------------------------------- */}
        {activeTab === 'services' && (
          <div className="admin-card-section">
            <div className="services-admin-header">
              <div>
                <h2 className="admin-section-title" style={{ marginBottom: '0.2rem' }}>
                  <Layers size={22} style={{ color: 'var(--primary-blue)' }} />
                  <span>सेवा व्यवस्थापन (Service Management)</span>
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  एकूण सेवा: <strong>{services.length}</strong> | 
                  सुरू सेवा (ON): <strong style={{ color: '#16a34a' }}>{services.filter(s => s.isActive !== false).length}</strong> | 
                  बंद सेवा (OFF): <strong style={{ color: '#dc2626' }}>{services.filter(s => s.isActive === false).length}</strong>
                </p>
              </div>

              <button onClick={openAddModal} className="btn-add-service">
                <Plus size={20} />
                <span>+ नवीन सेवा जोडा</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="admin-filter-bar">
              <div className="search-input-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="सेवा शोधा..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select 
                className="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="सर्व सेवा">सर्व वर्ग (All Categories)</option>
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Services List Table / Cards */}
            <div className="admin-services-grid">
              {filteredServices.map(service => (
                <div 
                  key={service.id} 
                  className={`admin-service-card ${service.isActive === false ? 'inactive-card' : ''}`}
                >
                  <div className="admin-card-top">
                    <div>
                      <h3 className="admin-service-title">{service.marathiName}</h3>
                      <span className="admin-service-eng">{service.englishName}</span>
                    </div>

                    <span className="admin-category-badge">{service.category}</span>
                  </div>

                  <p className="admin-service-desc">
                    {service.shortDescription || 'माहिती उपलब्ध आहे.'}
                  </p>

                  <div className="admin-card-bottom">
                    {/* Active Toggle Switch */}
                    <div className="toggle-switch-wrapper">
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: service.isActive !== false ? '#15803d' : '#b91c1c' }}>
                        {service.isActive !== false ? '🟢 Active' : '🔴 Inactive'}
                      </span>
                      <button 
                        onClick={() => handleToggleServiceActive(service)}
                        className={`toggle-switch-btn ${service.isActive !== false ? 'on' : 'off'}`}
                      >
                        <span className="switch-handle" />
                        <span className="switch-text">{service.isActive !== false ? 'ON' : 'OFF'}</span>
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div className="admin-item-actions">
                      <button 
                        onClick={() => openEditModal(service)}
                        className="btn-action-icon edit"
                        title="संपादित करा"
                      >
                        <Edit size={16} />
                        <span>संपादित करा</span>
                      </button>

                      <button 
                        onClick={() => setDeletingServiceId(service.id)}
                        className="btn-action-icon delete"
                        title="हटवा"
                      >
                        <Trash2 size={16} />
                        <span>हटवा</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredServices.length === 0 && (
                <div className="admin-empty-state" style={{ gridColumn: '1 / -1' }}>
                  <p>कोणतीही सेवा सापडली नाही.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 4: CONTACT INFORMATION MANAGEMENT
            ------------------------------------------------------------- */}
        {activeTab === 'contact' && (
          <div className="admin-card-section">
            <h2 className="admin-section-title">
              <Settings size={22} style={{ color: 'var(--primary-blue)' }} />
              <span>संपर्क माहिती व्यवस्थापन</span>
            </h2>

            <div className="admin-panel-card" style={{ maxWidth: '720px' }}>
              <p className="panel-card-desc">
                इथे अपडेट केलेली माहिती सार्वजनिक वेबसाइटवर (Public Website) आपोआप अपडेट होईल.
              </p>

              <form onSubmit={handleContactSubmit} className="admin-form">
                <div className="form-group">
                  <label className="form-label">
                    <Monitor size={16} />
                    <span>व्यवसायाचे नाव (मराठी)</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={contactForm.businessNameMarathi}
                    onChange={(e) => setContactForm({ ...contactForm, businessNameMarathi: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <PhoneCall size={16} />
                    <span>मोबाईल नंबर</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Mail size={16} />
                    <span>ई-मेल आयडी</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MapPin size={16} />
                    <span>पत्ता (Address)</span>
                  </label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    value={contactForm.address}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary-action">
                  <Save size={18} />
                  <span>संपर्क माहिती अपडेट करा</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------
          MODAL 1: ADD NEW SERVICE
          ------------------------------------------------------------- */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div className="modal-title-box">
                <h3 className="modal-marathi-title">+ नवीन सेवा जोडा</h3>
                <span className="modal-english-title">Add New Service</span>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAddService} className="modal-body admin-form">
              <div className="form-group">
                <label className="form-label">सेवेचे मराठी नाव *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="उदा. पॅन कार्ड, HSC १७ नंबर फॉर्म"
                  value={serviceFormData.marathiName}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, marathiName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">English Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex. PAN Card, HSC 17 No. Form"
                  value={serviceFormData.englishName}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, englishName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category (वर्ग) *</label>
                <select
                  className="form-input"
                  value={serviceFormData.category}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                  required
                >
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">थोडक्यात माहिती (Short Description)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="उदा. नवीन पॅन कार्ड किंवा दुरुस्तीसाठी..."
                  value={serviceFormData.shortDescription}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, shortDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">ही सेवा कशासाठी आहे? (Purpose)</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="सेवेचा सविस्तर उद्देश लिहा..."
                  value={serviceFormData.purpose}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, purpose: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">लागणारी कागदपत्रे (प्रत्येक ओळीवर १ कागदपत्र लिहा)</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  placeholder="आधार कार्ड&#10;रेशन कार्ड&#10;फोटो"
                  value={serviceFormData.documentsText}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, documentsText: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Keywords (कॉमा देवून लिहा)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="pan, card, आधार"
                  value={serviceFormData.keywordsText}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, keywordsText: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <label className="form-label" style={{ margin: 0 }}>सेवा सुरू ठेवू इच्छिता (Active)?</label>
                <input
                  type="checkbox"
                  style={{ width: '20px', height: '20px' }}
                  checked={serviceFormData.isActive}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, isActive: e.target.checked })}
                />
              </div>

              <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-secondary">
                  रद्द करा
                </button>
                <button type="submit" className="btn-primary">
                  सेवा जतन करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL 2: EDIT SERVICE
          ------------------------------------------------------------- */}
      {editingService && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div className="modal-title-box">
                <h3 className="modal-marathi-title">सेवा संपादित करा</h3>
                <span className="modal-english-title">Edit Service</span>
              </div>
              <button onClick={() => setEditingService(null)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditService} className="modal-body admin-form">
              <div className="form-group">
                <label className="form-label">सेवेचे मराठी नाव *</label>
                <input
                  type="text"
                  className="form-input"
                  value={serviceFormData.marathiName}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, marathiName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">English Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={serviceFormData.englishName}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, englishName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category (वर्ग) *</label>
                <select
                  className="form-input"
                  value={serviceFormData.category}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                  required
                >
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">थोडक्यात माहिती (Short Description)</label>
                <input
                  type="text"
                  className="form-input"
                  value={serviceFormData.shortDescription}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, shortDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">ही सेवा कशासाठी आहे? (Purpose)</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={serviceFormData.purpose}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, purpose: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">लागणारी कागदपत्रे (प्रत्येक ओळीवर १ कागदपत्र)</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  value={serviceFormData.documentsText}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, documentsText: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Keywords (कॉमा देवून लिहा)</label>
                <input
                  type="text"
                  className="form-input"
                  value={serviceFormData.keywordsText}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, keywordsText: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <label className="form-label" style={{ margin: 0 }}>सेवा सुरू ठेवू इच्छिता (Active)?</label>
                <input
                  type="checkbox"
                  style={{ width: '20px', height: '20px' }}
                  checked={serviceFormData.isActive}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, isActive: e.target.checked })}
                />
              </div>

              <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <button type="button" onClick={() => setEditingService(null)} className="btn-secondary">
                  रद्द करा
                </button>
                <button type="submit" className="btn-primary">
                  बदल जतन करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL 3: DELETE CONFIRMATION
          ------------------------------------------------------------- */}
      {deletingServiceId && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '440px', padding: '1.75rem', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Trash2 size={28} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              ही सेवा कायमची हटवायची आहे का?
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              हंगामी/तात्पुरत्या सेवांसाठी हटवण्याऐवजी Active/Inactive (OFF) पर्याय वापरणे सोयीचे पडेल.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setDeletingServiceId(null)}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                रद्द करा
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="btn-primary"
                style={{ backgroundColor: '#dc2626', borderColor: '#dc2626', flex: 1 }}
              >
                होय, हटवा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
