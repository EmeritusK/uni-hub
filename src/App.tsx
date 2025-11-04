import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { Dashboard } from './features/dashboard';
import { Chatbot } from './features/chatbot';
import './App.css';
import './prime-theme.css';
import 'primeicons/primeicons.css';

function App() {
  console.log('App component rendered');
  
  return (
    <Router>
      <Routes>
        {/* Auth routes (sin sidebar) */}
        <Route path="/login" element={<AuthLayout />} />

        {/* Main app routes (con sidebar) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
              <p>Ruta: {window.location.pathname}</p>
            </div>
          } />
          <Route path="reports" element={
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
              <p>Ruta: {window.location.pathname}</p>
            </div>
          } />
          <Route path="sales" element={
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ventas</h1>
              <p>Ruta: {window.location.pathname}</p>
            </div>
          } />
           <Route path="chatbot" element={<Chatbot />} />
          <Route path="withdrawal" element={
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Withdrawal</h1>
            </div>
          } />
          <Route path="tables/*" element={
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Tables</h1>
            </div>
          } />
          <Route path="dishes/*" element={
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Dishes</h1>
            </div>
          } />
          <Route path="payments/*" element={
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Payments</h1>
            </div>
          } />
          <Route path="settings" element={
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            </div>
          } />
        </Route>

        {/* Catch all route - debe estar al final */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
