
import React, { useState } from 'react';
import { ContentData } from '../../../types/admin';
import './ContentManager.css';

interface ContentManagerProps {
  content: ContentData;
  onUpdate: (data: Partial<{ content: ContentData }>) => Promise<void>;
}

const ContentManager: React.FC<ContentManagerProps> = ({ content, onUpdate }) => {
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate({ content: editedContent });
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (section: keyof ContentData, field: string, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
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
          <h3>Главная секция</h3>
          <div className="form-group">
            <label>Заголовок</label>
            <input
              type="text"
              value={editedContent.hero.title}
              onChange={(e) => handleChange('hero', 'title', e.target.value)}
              placeholder="Заголовок главной секции"
            />
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea
              value={editedContent.hero.description}
              onChange={(e) => handleChange('hero', 'description', e.target.value)}
              placeholder="Описание главной секции"
              rows={3}
            />
          </div>
        </section>

        {/* Services */}
        <section className="content-section">
          <h3>Услуги</h3>
          {Object.entries(editedContent.services).map(([key, service]) => (
            <div key={key} className="service-editor">
              <h4>{service.title}</h4>
              <div className="form-group">
                <label>Описание</label>
                <textarea
                  value={service.description}
                  onChange={(e) => handleChange('services', key, {
                    ...service,
                    description: e.target.value
                  })}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </section>

        {/* About */}
        <section className="content-section">
          <h3>О нас</h3>
          <div className="form-group">
            <label>История</label>
            <textarea
              value={editedContent.about.story}
              onChange={(e) => handleChange('about', 'story', e.target.value)}
              rows={4}
              placeholder="История салона"
            />
          </div>
          <div className="form-group">
            <label>Философия</label>
            <textarea
              value={editedContent.about.philosophy}
              onChange={(e) => handleChange('about', 'philosophy', e.target.value)}
              rows={4}
              placeholder="Философия салона"
            />
          </div>
        </section>

        {/* Contacts */}
        <section className="content-section">
          <h3>Контакты</h3>
          <div className="form-group">
            <label>Адрес</label>
            <input
              type="text"
              value={editedContent.contacts.address}
              onChange={(e) => handleChange('contacts', 'address', e.target.value)}
              placeholder="Адрес салона"
            />
          </div>
          <div className="form-group">
            <label>Телефон</label>
            <input
              type="tel"
              value={editedContent.contacts.phone}
              onChange={(e) => handleChange('contacts', 'phone', e.target.value)}
              placeholder="Телефон"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={editedContent.contacts.email}
              onChange={(e) => handleChange('contacts', 'email', e.target.value)}
              placeholder="Email"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContentManager;
