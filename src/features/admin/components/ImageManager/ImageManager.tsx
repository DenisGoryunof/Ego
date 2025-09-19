
import React, { useState } from 'react';
import { GalleryItem } from '../../../../types/admin';
import './ImageManager.css';

interface ImageManagerProps {
  images: GalleryItem[];
  onUpdate: (images: GalleryItem[]) => Promise<void>;
}

const ImageManager: React.FC<ImageManagerProps> = ({ images, onUpdate }) => {
  const [editedImages, setEditedImages] = useState(images);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImage = () => {
    const newImage: GalleryItem = {
      id: Date.now().toString(),
      title: 'Новое изображение',
      description: '',
      category: 'general',
      url: '',
      order: editedImages.length
    };
    setEditedImages([...editedImages, newImage]);
  };

  const handleRemoveImage = (id: string) => {
    setEditedImages(editedImages.filter(img => img.id !== id));
  };

  const handleUpdateImage = (id: string, field: keyof GalleryItem, value: string) => {
    setEditedImages(editedImages.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  const handleSave = async () => {
    setIsUploading(true);
    try {
      await onUpdate(editedImages);
    } catch (error) {
      console.error('Error saving images:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (file: File, imageId: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      handleUpdateImage(imageId, 'url', url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-manager">
      <div className="manager-header">
        <h2>Управление изображениями</h2>
        <div className="manager-actions">
          <button onClick={handleAddImage} className="btn btn-secondary">
            Добавить изображение
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

      <div className="images-grid">
        {editedImages.map((image) => (
          <div key={image.id} className="image-card">
            <div className="image-preview">
              {image.url ? (
                <img src={image.url} alt={image.title} />
              ) : (
                <div className="image-placeholder">
                  <span>Нет изображения</span>
                </div>
              )}
            </div>
            <div className="image-details">
              <input
                type="text"
                value={image.title}
                onChange={(e) => handleUpdateImage(image.id, 'title', e.target.value)}
                placeholder="Название изображения"
              />
              <textarea
                value={image.description}
                onChange={(e) => handleUpdateImage(image.id, 'description', e.target.value)}
                placeholder="Описание изображения"
                rows={2}
              />
              <select
                value={image.category}
                onChange={(e) => handleUpdateImage(image.id, 'category', e.target.value)}
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
                    handleImageUpload(file, image.id);
                  }
                }}
              />
              <div className="image-actions">
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="btn btn-danger"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageManager;
