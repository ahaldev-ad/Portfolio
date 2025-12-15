import { INITIAL_DATA } from '../constants';

const STORAGE_KEY = 'portfolio_data_v1';
const AUTH_KEY = 'portfolio_auth_session';

export const getAppData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with default data if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse portfolio data", e);
    return INITIAL_DATA;
  }
};

export const saveAppData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Dispatch a custom event so components can subscribe to changes across the app
  window.dispatchEvent(new Event('storage-update'));
};

export const checkAuth = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const login = (pass) => {
  // Simple mock login
  if (pass === 'password123') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};