import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

const Home = lazy(() => import('./pages/Home'));
const Auth = lazy(() => import('./pages/Auth'));
const Sell = lazy(() => import('./pages/Sell'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const VendorDashboard = lazy(() => import('./pages/VendorDashboard'));
const AdminRequestDetails = lazy(() => import('./pages/AdminRequestDetails'));
const DeliveryDashboard = lazy(() => import('./pages/DeliveryDashboard'));
const TrackPickup = lazy(() => import('./pages/TrackPickup'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem', flexDirection: 'column' }}>
    <div style={{ width: 36, height: 36, border: '4px solid #e2e8f0', borderTopColor: '#16c55f', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function ProtectedRoute({ children, adminOnly = false, deliveryOnly = false }) {
  const { isLoggedIn, isAdmin, isDelivery } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (deliveryOnly && !isDelivery) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!adminOnly && !deliveryOnly && isAdmin && location.pathname === '/dashboard') {
    return <Navigate to="/pz-admin-panel" replace />;
  }

  if (!adminOnly && !deliveryOnly && isDelivery && location.pathname === '/dashboard') {
    return <Navigate to="/pz-delivery-panel" replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const isDashboardPage = location.pathname === '/dashboard';
  const isAdminRoute = location.pathname.startsWith('/pz-admin-panel');
  const isDeliveryRoute = location.pathname.startsWith('/pz-delivery-panel');
  const isAuthPage = location.pathname === '/auth';

  const hideNav = isAuthPage || isAdminRoute || isDeliveryRoute;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!hideNav && <AnnouncementBar />}
      {!hideNav && <Navbar />}
      <main style={{ flex: 1 }}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />

            {/* Requires login */}
            <Route path="/sell" element={
              <ProtectedRoute>
                <Sell />
              </ProtectedRoute>
            } />

            {/* User dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />

            {/* Admin — hidden route /pz-admin-panel */}
            <Route path="/pz-admin-panel" element={
              <ProtectedRoute adminOnly={true}>
                <VendorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/pz-admin-panel/request/:id" element={
              <ProtectedRoute adminOnly={true}>
                <AdminRequestDetails />
              </ProtectedRoute>
            } />

            <Route path="/pz-delivery-panel" element={
              <ProtectedRoute deliveryOnly={true}>
                <DeliveryDashboard />
              </ProtectedRoute>
            } />

            <Route path="/track" element={
              <ProtectedRoute>
                <TrackPickup />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!isDashboardPage && !hideNav && <Footer />}
      {!hideNav && <MobileBottomNav activePage={
        location.pathname === '/' ? 'home' :
        location.pathname === '/sell' ? 'sell' :
        location.pathname === '/track' ? 'track' :
        location.pathname === '/dashboard' ? 'dashboard' : 'home'
      } />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
