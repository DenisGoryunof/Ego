
import React from 'react';
import { persistence } from '../../../../utils/persistence';
import './AdminHeader.css';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  const handleLogout = async () => {
    await persistence.removeItem('admin_session');
    onLogout();
  };

  return (
    <header className="admin-header">
      <div className="container">
        <div className="admin-header-content">
          <h1>Панель администратора</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
