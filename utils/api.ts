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

// Project interfaces
export interface ProjectLink {
  label: string;
  url: string;
}

export interface Milestone {
  title: string;
  description: string;
  completionDate: string;
  budget: number;
  status: 'IN_PROGRESS' | 'COMPLETED';
}

export interface FundingInfo {
  goal: number;
  raised?: number;
}

export interface GraduateDTO {
  id: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  finishYear?: number;
  totalProjects?: number;
}

export type ProjectCategory = 'EDUCATION' | 'AGRICULTURE' | 'FINANCE' | 'BUSINESS' | 'HEALTH' | 'SOCIAL' | 'TRANSPORTATION' | 'ECOMMERCE' | 'GOVERNMENT';

export interface ProjectCreationRequest {
  title: string;
  category: ProjectCategory;
  description: string;
  mission: string;
  vision: string;
  logo: string;
  keyFeature: string;
  status: 'ACTIVE' | 'ARCHIVED';
  fundingInfo: FundingInfo;
  links: ProjectLink[];
  team: GraduateDTO[];
  milestones: Milestone[];
}

export interface ProjectDTO {
  id: string;
  title: string;
  category: string;
  description: string;
  mission: string;
  vision: string;
  logo: string;
  keyFeature: string;
  status: string;
  fundingInfo: FundingInfo;
  links: ProjectLink[];
  interaction?: {
    likes: number;
    views: number;
    shares: number;
    comments: string[];
  };
  owner?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Upload project image
export async function uploadProjectImage(file: File): Promise<string> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload/projects`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Image upload failed' }));
    throw new Error(errorData.message || 'Image upload failed');
  }

  const apiResponse: ApiResponse<string> = await response.json();
  return apiResponse.data;
}

// Create project
export async function createProject(request: ProjectCreationRequest): Promise<ProjectDTO> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  console.log('Sending project creation request to:', `${API_BASE_URL}/projects`);
  console.log('Request payload:', JSON.stringify(request, null, 2));

  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  console.log('Response status:', response.status);
  console.log('Response ok:', response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response text:', errorText);
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText || 'Project creation failed' };
    }
    const errorMessage = errorData.message || errorData.error || 'Project creation failed';
    console.error('Error data:', errorData);
    throw new Error(errorMessage);
  }

  const apiResponse: ApiResponse<ProjectDTO> = await response.json();
  console.log('Project created successfully:', apiResponse);
  return apiResponse.data;
}

// Get user's projects
export async function getMyProjects(): Promise<ProjectDTO[]> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  console.log('Fetching user projects from:', `${API_BASE_URL}/projects/my`);

  const response = await fetch(`${API_BASE_URL}/projects/my`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log('Projects response status:', response.status);
  console.log('Projects response ok:', response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error fetching projects:', errorText);
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText || 'Failed to fetch projects' };
    }
    throw new Error(errorData.message || errorData.error || 'Failed to fetch projects');
  }

  const apiResponse: ApiResponse<ProjectDTO[]> = await response.json();
  console.log('Projects fetched successfully:', apiResponse.data?.length || 0, 'projects');
  return apiResponse.data || [];
}

// Get all projects
export async function getAllProjects(): Promise<ProjectDTO[]> {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch projects' }));
    throw new Error(errorData.message || 'Failed to fetch projects');
  }

  const apiResponse: ApiResponse<ProjectDTO[]> = await response.json();
  return apiResponse.data;
}

// Get all graduates (for team member selection)
export async function getGraduates(): Promise<GraduateDTO[]> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/users/graduates`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch graduates' }));
    throw new Error(errorData.message || 'Failed to fetch graduates');
  }

  const apiResponse: ApiResponse<GraduateDTO[]> = await response.json();
  return apiResponse.data || [];
}

