// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// API Client Helper
class APIClient {
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private baseURL: string;

  private async request(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Token Management
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('soilguard_token');
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('soilguard_token', token);
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('soilguard_token');
      localStorage.removeItem('soilguard_user');
    }
  }

  // User Management
  getUser(): any | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('soilguard_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  setUser(user: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('soilguard_user', JSON.stringify(user));
    }
  }

  // Auth Endpoints
  async register(data: { name: string; email: string; password: string }) {
    const response = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      this.setToken(response.token);
      this.setUser(response.user);
    }
    
    return response;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      this.setToken(response.token);
      this.setUser(response.user);
    }
    
    return response;
  }

  async logout() {
    this.removeToken();
  }

  async getProfile() {
    return this.request('/api/auth/me', {
      method: 'GET',
    });
  }

  async updateProfile(data: any) {
    return this.request('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Chat Endpoints
  async sendChatMessage(data: { message: string; sessionId: string; userId?: string }) {
    return this.request('/api/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getChatHistory(sessionId: string) {
    return this.request(`/api/chat/history/${sessionId}`, {
      method: 'GET',
    });
  }

  // Health Check
  async healthCheck() {
    return this.request('/api/health', {
      method: 'GET',
    });
  }
}

// Export singleton instance
export const apiClient = new APIClient(API_URL);

// Export helper functions
export const auth = {
  register: (data: any) => apiClient.register(data),
  login: (data: any) => apiClient.login(data),
  logout: () => apiClient.logout(),
  getProfile: () => apiClient.getProfile(),
  updateProfile: (data: any) => apiClient.updateProfile(data),
  getToken: () => apiClient.getToken(),
  getUser: () => apiClient.getUser(),
  isAuthenticated: () => !!apiClient.getToken(),
};

export const chat = {
  sendMessage: (data: any) => apiClient.sendChatMessage(data),
  getHistory: (sessionId: string) => apiClient.getChatHistory(sessionId),
};
