
import React, { useState, useEffect } from 'react';
import { persistence } from '../../../../utils/persistence';
import './ImageManager.css';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  order: number;
}

const ImageManager: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const storedImages = await persistence.getItem('gallery_images');
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      }
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveImages = async (newImages: GalleryImage[]) => {
    try {
      await persistence.setItem('gallery_images', JSON.stringify(newImages));
      setImages(newImages);
    } catch (error) {
      console.error('Error saving images:', error);
    }
  };

  const handleAddImage = () => {
    setEditingImage({
      id: Date.now().toString(),
      title: '',
      description: '',
      category: 'general',
      url: '',
      order: images.length
    });
    setIsModalOpen(true);
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image);
    setIsModalOpen(true);
  };

  const handleDeleteImage = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить это изображение?')) {
      const newImages = images.filter(img => img.id !== id);
      await saveImages(newImages);
    }
  };

  const handleSaveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    let newImages: GalleryImage[];
    if (images.find(img => img.id === editingImage.id)) {
      newImages = images.map(img => 
        img.id === editingImage.id ? editingImage : img
      );
    } else {
      newImages = [...images, editingImage];
    }

    await saveImages(newImages);
    setIsModalOpen(false);
    setEditingImage(null);
  };

  const handleInputChange = (field: keyof GalleryImage, value: string) => {
    if (editingImage) {
      setEditingImage({ ...editingImage, [field]: value });
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const index = images.findIndex(img => img.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === images.length - 1)) {
      return;
    }

    const newImages = [...images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Меняем порядок
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    
    // Обновляем порядковые номера
    newImages.forEach((img, idx) => {
      img.order = idx;
    });

    await saveImages(newImages);
  };

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="image-manager">
      <div className="manager-header">
        <h2>Управление изображениями</h2>
        <button onClick={handleAddImage} className="btn btn-primary">
          Добавить изображение
        </button>
      </div>

      <div className="images-grid">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <div className="image-preview">
              {image.url ? (
                <img src={image.url} alt={image.title} />
              ) : (
                <div className="image-placeholder">Нет изображения</div>
              )}
            </div>
            <div className="image-info">
              <h3>{image.title || 'Без названия'}</h3>
              <p>{image.description}</p>
              <span className="category">{image.category}</span>
            </div>
            <div className="image-actions">
              <button 
                onClick={() => handleReorder(image.id, 'up')}
                className="btn btn-small"
                disabled={image.order === 0}
              >
                ↑
              </button>
              <button 
                onClick={() => handleReorder(image.id, 'down')}
                className="btn btn-small"
                disabled