// API utility for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'GRADUATE' | 'SPONSOR' | 'ADMIN';
    country?: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'GRADUATE' | 'SPONSOR';
  finishYear?: number;
  organization?: string;
  country?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Register a new user
export async function registerUser(request: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error(errorData.message || 'Registration failed');
  }

  const apiResponse: ApiResponse<AuthResponse> = await response.json();
  return apiResponse.data;
}

// Login user
export async function loginUser(request: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(errorData.message || 'Login failed');
  }

  const apiResponse: ApiResponse<AuthResponse> = await response.json();
  return apiResponse.data;
}

// Store auth token and user info
export function storeAuthData(authResponse: AuthResponse) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
    localStorage.setItem('userType', authResponse.user.role.toLowerCase());
    localStorage.setItem('isLoggedIn', 'true');
  }
}

// Get auth token
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

// Clear auth data
export function clearAuthData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
  }
}

