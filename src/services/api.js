// API Service Helper for Login Computer Centre Public & Admin API

const API_BASE = '/api';

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
    if (!res.ok) throw new Error('Failed to fetch business info');
    return await res.json();
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
    if (!res.ok) throw new Error('Failed to fetch services');
    return await res.json();
  } catch (err) {
    console.error('Error fetching services:', err);
    return [];
  }
}

// ------------------------------------------------------------------
// ADMIN AUTHENTICATION API CALLS
// ------------------------------------------------------------------

export async function loginAdmin(email, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'लॉगिन करण्यात अडचण आली.');
  }
  if (data.token) {
    localStorage.setItem('adminToken', data.token);
  }
  return data;
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
    return await res.json();
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
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'वेळ अपडेट करण्यात अपयश.');
  return data;
}

export async function updateStatus(isOpen) {
  const res = await fetch(`${API_BASE}/admin/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ isOpen })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'स्थिती अपडेट करण्यात अपयश.');
  return data;
}

export async function updateNotice(specialNotice) {
  const res = await fetch(`${API_BASE}/admin/notice`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ specialNotice })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'सूचना अपडेट करण्यात अपयश.');
  return data;
}

export async function updateBusinessInfo(info) {
  const res = await fetch(`${API_BASE}/admin/business`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(info)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'माहिती अपडेट करण्यात अपयश.');
  return data;
}

export async function createService(serviceData) {
  const res = await fetch(`${API_BASE}/admin/services`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'नवीन सेवा जोडण्यात अपयश.');
  return data;
}

export async function updateService(id, serviceData) {
  const res = await fetch(`${API_BASE}/admin/services/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'सेवा अपडेट करण्यात अपयश.');
  return data;
}

export async function deleteService(id) {
  const res = await fetch(`${API_BASE}/admin/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'सेवा हटवण्यात अपयश.');
  return data;
}
