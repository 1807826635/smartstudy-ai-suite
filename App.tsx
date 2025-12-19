
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import EditorPage from './pages/EditorPage';
import ExportPage from './pages/ExportPage';
import DashboardPage from './pages/DashboardPage';
import { AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('login');

  const navigate = (newView: AppView) => {
    setView(newView);
  };

  return (
    <div className="min-h-screen">
      {view === 'login' && <LoginPage onLogin={() => navigate('editor')} />}
      {view === 'editor' && (
        <EditorPage 
          onExport={() => navigate('export')} 
          onLogout={() => navigate('login')} 
          onDashboard={() => navigate('dashboard')}
        />
      )}
      {view === 'export' && (
        <ExportPage 
          onBack={() => navigate('editor')} 
        />
      )}
      {view === 'dashboard' && (
        <DashboardPage 
          onBack={() => navigate('editor')} 
        />
      )}
    </div>
  );
};

export default App;
