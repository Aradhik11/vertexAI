import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { useCredits } from './hooks/useCredits';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import FeedPage from './pages/feed/FeedPage';
import SavedPage from './pages/saved/SavedPage';
import ProfilePage from './pages/profile/ProfilePage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';

// Guards
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore(state => state.user);
  const location = useLocation();
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }
  
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const { addLoginCredit } = useCredits();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  useEffect(() => {
    if (isAuthenticated) {
      addLoginCredit();
    }
  }, [isAuthenticated, addLoginCredit]);
  
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="/login" />} />
        <Route path="login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      </Route>
      
      {/* Dashboard Routes */}
      <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="profile" element={<ProfilePage />} />
        
        {/* Admin Routes */}
        <Route path="admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
        <Route path="admin/analytics" element={<AdminRoute><AdminAnalyticsPage /></AdminRoute>} />
      </Route>
      
      {/* Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;