// API Service Helper for Login Computer Centre Public & Admin API

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

// ------------------------------------------------------------------
// PUBLIC API CALLS
// ------------------------------------------------------------------

export async function getBusinessInfo() {
  try {
    const res = await fetch(`${API_BASE}/business`);
    const data = await parseJsonResponse(res);
    if (!res.ok || !data) return null;
    return data;
  } catch (err) {
    console.error('Error fetching business info:', err);
    return null;
  }
}

export async function getServices(showAll = false) {
  try {
    const url = showAll ? `${API_BASE}/services?all=true` : `${API_BASE}/services`;
    const res = await fetch(url, {
      headers: showAll ? getAuthHeaders() : {}
    });
    const data = await parseJsonResponse(res);
    if (!res.ok || !Array.isArray(data)) return [];
    return data;
  } catch (err) {
    console.error('Error fetching services:', err);
    return [];
  }
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

