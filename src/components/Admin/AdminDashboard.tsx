
import React from 'react';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>Панель администратора</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Всего изображений</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Записей на услуги</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Отзывов</h3>
          <p className="stat-number">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
