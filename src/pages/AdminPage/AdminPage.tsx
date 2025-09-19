
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../../features/admin/components/AdminLogin/AdminLogin';
import AdminHeader from '../../features/admin/components/AdminHeader/AdminHeader';
import AdminDashboard from '../../components/Admin/AdminDashboard';
import ContentManager from '../../components/Admin/ContentManager/ContentManager';
import GalleryManager from '../../components/Admin/GalleryManager/GalleryManager';
import { persistence } from '../../utils/persistence';
import { ContentData, GalleryItem } from '../../types/admin';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentData, setContentData] = useState<ContentData>({
    hero: {
      title: 'Салон красоты EGO',
      subtitle: 'Лёгкость, комфорт, забота и расслабление',
      ctaText: 'Записаться на процедуру'
    },
    services: [
      {
        id: '1',
        title: 'Лазерная эпиляция',
        description: 'Мощный диодный аппарат, опытный мастер, максимальный эффект и комфорт',
        category: 'epilation',
        order: 0
      },
      {
        id: '2',
        title: 'Моментальный загар',
        description: 'Красивый и ровный загар до 2х недель без вреда для кожи',
        category: 'tan',
        order: 1
      },
      {
        id: '3',
        title: 'Маникюр и педикюр',
        description: 'Профессиональный уход за ногтями от лучших мастеров',
        category: 'nails',
        order: 2
      },
      {
        id: '4',
        title: 'Ламинирование ресниц',
        description: 'Долговременная укладка, завивка и окрашивание ваших ресниц',
        category: 'lash',
        order: 3
      }
    ],
    about: {
      title: 'О салоне красоты Ego',
      description: 'Ваша красота - наша страсть и профессия',
      team: []
    },
    gallery: []
  });

  useEffect(() => {
    checkAuth();
    loadContentData();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await persistence.getItem('admin_session');
      setIsAuthenticated(!!session);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadContentData = async () => {
    try {
      const savedContent = await persistence.getItem('admin_content');
      if (savedContent) {
        setContentData(JSON.parse(savedContent));
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleContentUpdate = async (data: Partial<ContentData>) => {
    try {
      const updatedData = { ...contentData, ...data };
      setContentData(updatedData);
      await persistence.setItem('admin_content', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    }
  };

  const handleGalleryUpdate = async (data: Partial<{ gallery: GalleryItem[] }>) => {
    try {
      const updatedData = { ...contentData, gallery: data.gallery || [] };
      setContentData(updatedData);
      await persistence.setItem('admin_content', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving gallery:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-page">
      <AdminHeader onLogout={handleLogout} />
      <main className="admin-main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route 
              path="/content" 
              element={
                <ContentManager 
                  content={contentData} 
                  onUpdate={handleContentUpdate} 
                />
              } 
            />
            <Route 
              path="/gallery" 
              element={
                <GalleryManager 
                  gallery={contentData.gallery} 
                  onUpdate={handleGalleryUpdate} 
                />
              } 
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
