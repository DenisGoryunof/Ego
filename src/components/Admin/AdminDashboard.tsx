
import React, { useState } from 'react';
import { AdminData } from '../../types/admin';
import ContentManager from './ContentManager/ContentManager';
import GalleryManager from './GalleryManager/GalleryManager';
import LinksManager from './LinksManager/LinksManager';
import SecuritySettings from './SecuritySettings/SecuritySettings';
import './AdminDashboard.css';

interface AdminDashboardProps {
  adminData: AdminData;
  onLogout: () => void;
  onUpdate: (data: Partial<AdminData>) => Promise<void>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  adminData, 
  onLogout, 
  onUpdate 
}) => {
  const [activeTab, setActiveTab] = useState('content');

  const tabs = [
    { id: 'content', label: 'Контент', icon: '📝' },
    { id: 'gallery', label: 'Галерея', icon: '🖼️' },
    { id: 'links', label: 'Ссылки', icon: '🔗' },
    { id: 'security', label: 'Безопасность', icon: '🔒' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return <ContentManager content={adminData.content} onUpdate={onUpdate} />;
      case 'gallery':
        return <GalleryManager gallery={adminData.gallery} onUpdate={onUpdate} />;
      case 'links':
        return <LinksManager links={adminData.links} onUpdate={onUpdate} />;
      case 'security':
        return <SecuritySettings security={adminData.security} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Панель администратора</h1>
          <div className="admin-actions">
            <span className="welcome">Добро пожаловать, {adminData.security.username}</span>
            <button onClick={onLogout} className="btn btn-secondary">
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        <nav className="admin-sidebar">
          <ul className="sidebar-nav">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  className={`sidebar-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="admin-main">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
