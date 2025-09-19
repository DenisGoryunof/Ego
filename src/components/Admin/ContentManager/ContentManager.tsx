
import React, { useState } from 'react';
import { ContentData, ServiceItem } from '../../../types/admin';
import './ContentManager.css';

interface ContentManagerProps {
  content: ContentData;
  onUpdate: (data: Partial<ContentData>) => Promise<void>;
}

const ContentManager: React.FC<ContentManagerProps> = ({ content, onUpdate }) => {
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleHeroUpdate = (field: keyof ContentData['hero'], value: string) => {
    setEditedContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value
      }
    }));
  };

  const handleServiceUpdate = (index: number, field: keyof ServiceItem, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const handleAboutUpdate = (field: keyof ContentData['about'], value: string) => {
    setEditedContent(prev => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(editedContent);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="content-manager">
      <div className="manager-header">
        <h2>Управление контентом</h2>
        <button 
          onClick={handleSave} 
          className="btn btn-primary"
          disabled={isSaving}
        >
          {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </div>

      <div className="content-sections">
        {/* Hero Section */}
        <section className="content-section">
          <h3>Главный баннер</h3>
          <div className="form-group">
            <label>Заголовок</label>
            <input
              type="text"
              value={editedContent.hero.title}
              onChange={(e) => handleHeroUpdate('title', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Подзаголовок</label>
            <input
              type="text"
              value={editedContent.hero.subtitle}
              onChange={(e) => handleHeroUpdate('subtitle', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Текст кнопки</label>
            <input
              type="text"
              value={editedContent.hero.ctaText}
              onChange={(e) => handleHeroUpdate('ctaText', e.target.value)}
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="content-section">
          <h3>Услуги</h3>
          {editedContent.services.map((service, index) => (
            <div key={service.id} className="service-editor">
              <h4>{service.title}</h4>
              <div className="form-group">
                <label>Название услуги</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => handleServiceUpdate(index, 'title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Описание</label>
                <textarea
                  value={service.description}
                  onChange={(e) => handleServiceUpdate(index, 'description', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Цена (опционально)</label>
                <input
                  type="text"
                  value={service.price || ''}
                  onChange={(e) => handleServiceUpdate(index, 'price', e.target.value)}
                  placeholder="2500 руб."
                />
              </div>
            </div>
          ))}
        </section>

        {/* About Section */}
        <section className="content-section">
          <h3>О нас</h3>
          <div className="form-group">
            <label>Заголовок</label>
            <input
              type="text"
              value={editedContent.about.title}
              onChange={(e) => handleAboutUpdate('title', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea
              value={editedContent.about.description}
              onChange={(e) => handleAboutUpdate('description', e.target.value)}
              rows={4}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContentManager;
