// API Service Helper for Login Computer Centre Public & Admin API
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { businessConfig } from '../config/business';
import { servicesData } from '../data/services';

const API_BASE = '/api';

// Safe helper to parse JSON responses and avoid 'Unexpected end of JSON input'
async function parseJsonResponse(res) {
  try {
    const text = await res.text();
    if (!text || !text.trim()) {
      return null;
    }
    return JSON.parse(text);
  } catch (err) {
    console.warn('Failed to parse response as JSON:', err);
    return null;
  }
}

// Helper to get auth header with token
function getAuthHeaders() {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

// Helper to provide reliable local fallback for business information
function getLocalBusinessFallback() {
  try {
    const saved = localStorage.getItem('preview_business_info');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (e) {}

  return {
    businessNameMarathi: businessConfig.businessNameMarathi,
    phone: businessConfig.phone,
    email: businessConfig.email,
    address: businessConfig.address,
    openingTime: businessConfig.timing?.openingTime || 'सकाळी ९:००',
    closingTime: businessConfig.timing?.closingTime || 'रात्री ८:००',
    todayTimingText: businessConfig.timing?.todayTimingText || 'सकाळी ९:०० ते रात्री ८:००',
    isOpen: true,
    specialNotice: businessConfig.timing?.specialNotice || ''
  };
}

// Helper to provide reliable local fallback for services
function getLocalServicesFallback(showAll = false) {
  try {
    const saved = localStorage.getItem('preview_services');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return showAll ? parsed : parsed.filter(s => s.isActive !== false);
      }
    }
  } catch (e) {}

  return showAll ? servicesData : servicesData.filter(s => s.isActive !== false);
}

// ------------------------------------------------------------------
// PUBLIC READ CALLS (Firestore with Multi-Tier Fallback)
// ------------------------------------------------------------------

export async function getBusinessInfo() {
  // 1. Try reading from Firebase Firestore (settings/businessInfo)
  try {
    const docRef = doc(db, 'settings', 'businessInfo');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data && typeof data === 'object') {
        return data;
      }
    }
  } catch (firestoreErr) {
    console.warn('Firestore getBusinessInfo read warning (falling back):', firestoreErr);
  }

  // 2. Try Node.js backend if server is active
  try {
    const res = await fetch(`${API_BASE}/business`);
    const data = await parseJsonResponse(res);
    if (res.ok && data) return data;
  } catch (apiErr) {
    // Backend server may not be running in frontend-only mode
  }

  // 3. Graceful fallback to localStorage or businessConfig
  return getLocalBusinessFallback();
}

export async function getServices(showAll = false) {
  // 1. Try reading from Firebase Firestore ('services' collection)
  try {
    const colRef = collection(db, 'services');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const list = snapshot.docs.map(d => {
        const data = d.data();
        return {
          id: data.id || d.id,
          ...data
        };
      });

      // Sort by order/id if available
      list.sort((a, b) => (a.order || 0) - (b.order || 0) || (a.id || 0) - (b.id || 0));
      const filtered = showAll ? list : list.filter(s => s.isActive !== false);
      if (filtered.length > 0) {
        return filtered;
      }
    }
  } catch (firestoreErr) {
    console.warn('Firestore getServices read warning (falling back):', firestoreErr);
  }

  // 2. Try Node.js backend if server is active
  try {
    const url = showAll ? `${API_BASE}/services?all=true` : `${API_BASE}/services`;
    const res = await fetch(url, {
      headers: showAll ? getAuthHeaders() : {}
    });
    const data = await parseJsonResponse(res);
    if (res.ok && Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (apiErr) {
    // Backend server may not be running in frontend-only mode
  }

  // 3. Graceful fallback to localStorage or servicesData
  return getLocalServicesFallback(showAll);
}

// ------------------------------------------------------------------
// ADMIN AUTHENTICATION API CALLS
// ------------------------------------------------------------------

export async function loginAdmin(email, password) {
  try {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), username: email.trim(), password })
    });

    const data = await parseJsonResponse(res);

    if (!res.ok) {
      const errorMessage = data?.message || data?.error || (res.status === 404
        ? 'सर्व्हरशी संपर्क होऊ शकला नाही (API Not Found - 404).'
        : `लॉगिन अयशस्वी झाले (त्रुटी कोड: ${res.status}).`);
      throw new Error(errorMessage);
    }

    if (!data || (!data.success && !data.token)) {
      throw new Error(data?.message || data?.error || 'वापरकर्तानाव किंवा पासवर्ड चुकीचा आहे.');
    }

    if (data.token) {
      localStorage.setItem('adminToken', data.token);
    }
    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.toLowerCase().includes('fetch')) {
      throw new Error('सर्व्हरशी संपर्क होऊ शकला नाही. बॅकएंड सर्व्हर सुरू आहे का ते तपासा.');
    }
    throw err;
  }
}

export async function getAdminMe() {
  const token = localStorage.getItem('adminToken');
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/admin/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      localStorage.removeItem('adminToken');
      return null;
    }
    const data = await parseJsonResponse(res);
    return data;
  } catch (err) {
    localStorage.removeItem('adminToken');
    return null;
  }
}

export async function logoutAdmin() {
  try {
    await fetch(`${API_BASE}/admin/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
  } catch (err) {
    // Ignore error on logout
  } finally {
    localStorage.removeItem('adminToken');
  }
}

// ------------------------------------------------------------------
// ADMIN MANAGEMENT API CALLS
// ------------------------------------------------------------------

export async function updateTiming(openingTime, closingTime) {
  const res = await fetch(`${API_BASE}/admin/timing`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ openingTime, closingTime })
  });
  const data = await parseJsonResponse(res);
  if (!res.ok || !data) throw new Error(data?.message || data?.error || 'वेळ अपडेट करण्यात अपयश.');
  return data;
}

export async function updateStatus(isOpen) {
  const res = await fetch(`${API_BASE}/admin/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ isOpen })
  });
  const data = await parseJsonResponse(res);
  if (!res.ok || !data) throw new Error(data?.message || data?.error || 'स्थिती अपडेट करण्यात अपयश.');
  return data;
}

export async function updateNotice(specialNotice) {
  const res = await fetch(`${API_BASE}/admin/notice`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ specialNotice })
  });
  const data = await parseJsonResponse(res);
  if (!res.ok || !data) throw new Error(data?.message || data?.error || 'सूचना अपडेट करण्यात अपयश.');
  return data;
}

export async function updateBusinessInfo(info) {
  const res = await fetch(`${API_BASE}/admin/business`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(info)
  });
  const data = await parseJsonResponse(res);
  if (!res.ok || !data) throw new Error(data?.message || data?.error || 'माहिती अपडेट करण्यात अपयश.');
  return data;
}

export async function createService(serviceData) {
  const res = await fetch(`${API_BASE}/admin/services`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData)
  });
  const data = await parseJsonResponse(res);
  if (!res.ok || !data) throw new Error(data?.message || data?.error || 'नवीन सेवा जोडण्यात अपयश.');
  return data;
}

export async function updateService(id, serviceData) {
  const res = await fetch(`${API_BASE}/admin/services/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData)
  });
  const data = await parseJsonResponse(res);
  if (!res.ok || !data) throw new Error(data?.message || data?.error || 'सेवा अपडेट करण्यात अपयश.');
  return data;
}

export async function deleteService(id) {
  const res = await fetch(`${API_BASE}/admin/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await parseJsonResponse(res);
  if (!res.ok || !data) throw new Error(data?.message || data?.error || 'सेवा हटवण्यात अपयश.');
  return data;
}

