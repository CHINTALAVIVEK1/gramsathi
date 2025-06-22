import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getProfile: () => api.get('/api/auth/profile'),
};

export const weatherAPI = {
  getCurrentWeather: (location) => api.get(`/api/weather/current/${location}`),
  getForecast: (location, days = 5) => api.get(`/api/weather/forecast/${location}?days=${days}`),
};

export const schemesAPI = {
  getAllSchemes: (category = null) => {
    const params = category ? { category } : {};
    return api.get('/api/schemes/', { params });
  },
  getSchemeDetails: (schemeId) => api.get(`/api/schemes/${schemeId}`),
  searchSchemes: (query) => api.post('/api/schemes/search', { query }),
  chatWithAssistant: (message) => api.post('/api/schemes/chat', { message }),
};

export const healthAPI = {
  checkSymptoms: (symptomsData) => api.post('/api/health/symptom-check', symptomsData),
  getHealthTips: (category = null) => {
    const params = category ? { category } : {};
    return api.get('/api/health/tips', { params });
  },
  getEmergencyContacts: () => api.get('/api/health/emergency-contacts'),
  bookConsultation: (consultationData) => api.post('/api/health/book-consultation', consultationData),
};

export const marketplaceAPI = {
  getAllProducts: (category = null, location = null) => {
    const params = {};
    if (category) params.category = category;
    if (location) params.location = location;
    return api.get('/api/marketplace/products', { params });
  },
  getProductDetails: (productId) => api.get(`/api/marketplace/products/${productId}`),
  createProduct: (productData) => api.post('/api/marketplace/products', productData),
  uploadProductImage: (productId, imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    return api.post(`/api/marketplace/products/${productId}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getCategories: () => api.get('/api/marketplace/categories'),
  checkout: (checkoutData) => api.post('/api/marketplace/checkout', checkoutData),
};

export const soilAPI = {
  analyzeSoil: (soilData) => api.post('/api/soil/analyze', soilData),
  analyzeImage: (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    return api.post('/api/soil/image-analysis', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getSoilTypes: () => api.get('/api/soil/soil-types'),
  getCropCalendar: (district) => api.get(`/api/soil/crop-calendar/${district}`),
};

// Generic API call function
export const apiCall = async (method, url, data = null, config = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error('API call failed:', error);
    return {
      success: false,
      error: error.response?.data?.detail || error.message || 'An error occurred',
    };
  }
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.detail || error.response.data?.message || 'Server error';
    return { message, status: error.response.status };
  } else if (error.request) {
    // Request was made but no response received
    return { message: 'Network error - please check your connection', status: 0 };
  } else {
    // Something else happened
    return { message: error.message || 'An unexpected error occurred', status: -1 };
  }
};

// Export the main api instance for custom calls
export default api;
