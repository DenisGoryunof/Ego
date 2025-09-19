
import React, { useState } from 'react';
import { GalleryItem } from '../../../types/admin';
import './GalleryManager.css';

interface GalleryManagerProps {
  gallery: GalleryItem[];
  onUpdate: (data: Partial<{ gallery: GalleryItem[] }>) => Promise<void>;
}

const GalleryManager: React.FC<GalleryManagerProps> = ({ gallery, onUpdate }) => {
  const [editedGallery, setEditedGallery] = useState(gallery);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddItem = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: 'Новое фото',
      description: '',
      category: 'general',
      url: '',
      order: editedGallery.length
    };
    setEditedGallery([...editedGallery, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setEditedGallery(editedGallery.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof GalleryItem, value: string) => {
    setEditedGallery(editedGallery.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = async () => {
    setIsUploading(true);
    try {
      await onUpdate({ gallery: editedGallery });
    } catch (error) {
      console.error('Error saving gallery:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (file: File, itemId: string) => {
    // В реальном приложении здесь будет загрузка на сервер
    // Для демонстрации используем base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      handleUpdateItem(itemId, 'url', url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="gallery-manager">
      <div className="manager-header">
        <h2>Управление галереей</h2>
        <div className="manager-actions">
          <button onClick={handleAddItem} className="btn btn-secondary">
            Добавить фото
          </button>
          <button 
            onClick={handleSave} 
            className="btn btn-primary"
            disabled={isUploading}
          >
            {isUploading ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </div>

      <div className="gallery-grid">
        {editedGallery.map((item) => (
          <div key={item.id} className="gallery-item">
            <div className="image-preview">
              {item.url ? (
                <img src={item.url} alt={item.title} />
              ) : (
                <div className="image-placeholder">
                  <span>Нет изображения</span>
                </div>
              )}
            </div>
            <div className="item-details">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                placeholder="Название фото"
              />
              <textarea
                value={item.description}
                onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                placeholder="Описание фото"
                rows={2}
              />
              <select
                value={item.category}
                onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value)}
              >
                <option value="general">Общее</option>
                <option value="epilation">Эпиляция</option>
                <option value="tan">Загар</option>
                <option value="nails">Маникюр</option>
                <option value="lash">Ресницы</option>
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file, item.id);
                  }
                }}
              />
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="btn btn-danger"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
