
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
