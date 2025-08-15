import React from 'react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Login</h1>
          <p className="text-gray-600">Página de login aquí</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
