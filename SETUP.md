# Backend Integration Setup Guide

## Environment Configuration

To connect the frontend to the backend, you need to create a `.env.local` file in the `R-seeds-Web` directory with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

If your backend is running on a different port or URL, update the `NEXT_PUBLIC_API_URL` accordingly.

## Backend Requirements

1. **Database**: Ensure your PostgreSQL database is running and configured in `application.properties`
2. **Backend Server**: Start the Spring Boot backend server (default port: 8080)
3. **CORS**: The backend CORS configuration has been updated to allow requests from `http://localhost:3000`

## Features Integrated

### Sign Up Page
- ✅ Connected to backend `/api/v1/auth/register` endpoint
- ✅ Supports three user types: User, Graduate, and Sponsor
- ✅ Dynamic form fields based on user type:
  - **Graduate**: Requires graduation year
  - **Sponsor**: Requires organization name
  - **User**: Requires country
- ✅ Stores authentication token and user data in localStorage
- ✅ Automatic redirect based on user role after successful registration

### Login Page
- ✅ Connected to backend `/api/v1/auth/login` endpoint
- ✅ Stores authentication token and user data in localStorage
- ✅ Automatic redirect based on user role after successful login

## API Endpoints Used

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

## Data Flow

1. User fills out the signup form
2. Frontend sends request to backend API
3. Backend creates user account in database (with associated Graduate/Sponsor record if applicable)
4. Backend returns JWT token and user data
5. Frontend stores token and user data in localStorage
6. User is redirected to their role-specific dashboard

## Testing

1. Start the backend server
2. Start the frontend: `npm run dev`
3. Navigate to `/signup`
4. Fill out the form and select a user type
5. Submit the form - you should be redirected to the appropriate dashboard

