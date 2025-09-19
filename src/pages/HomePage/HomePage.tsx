
import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Салон красоты EGO</h1>
            <p>Лёгкость, комфорт, забота и расслабление</p>
            <div className="hero-buttons">
              <a href="https://ego-forms.netlify.app/" className="btn btn-primary">
                Записаться на процедуру
              </a>
              <a href="https://t.me/Ego_ch_bot" className="btn btn-secondary">
                Записаться через чат-бот telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <h2>Наши услуги</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h3>Лазерная эпиляция</h3>
              <p>Мощный диодный аппарат, опытный мастер, максимальный эффект и комфорт</p>
            </div>
            <div className="service-card">
              <div className="service-icon">☀️</div>
              <h3>Моментальный загар</h3>
              <p>Красивый и ровный загар до 2х недель без вреда для кожи</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💅</div>
              <h3>Маникюр и педикюр</h3>
              <p>Профессиональный уход за ногтями от лучших мастеров</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👁️</div>
              <h3>Ламинирование ресниц</h3>
              <p>Долговременная укладка, завивка и окрашивание ваших ресниц</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="advantages">
        <div className="container">
          <h2>Почему выбирают нас</h2>
          <div className="advantages-grid">
            <div className="advantage">
              <h3>10+ лет работы</h3>
              <p>Более 10 лет дарим красоту и уверенность нашим клиентам</p>
            </div>
            <div className="advantage">
              <h3>Профессионализм</h3>
              <p>Наши специалисты регулярно проходят обучение и повышают квалификацию</p>
            </div>
            <div className="advantage">
              <h3>Качество</h3>
              <p>Используем только сертифицированные материалы и оборудование</p>
            </div>
            <div className="advantage">
              <h3>Гигиена</h3>
              <p>Строго соблюдаем все санитарные нормы и правила стерилизации</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="testimonials-preview">
        <div className="container">
          <h2>Отзывы клиентов</h2>
          <div className="testimonials-slider">
            <div className="testimonial">
              <p>"Лучший салон в Севастополе! Делала лазерную эпиляцию - результат превзошел ожидания. Мастера настоящие профессионалы!"</p>
              <span>- Анна</span>
            </div>
            <div className="testimonial">
              <p>"Регулярно делаю искусственный загар в EGO. Всегда ровный, естественный оттенок без разводов. Очень довольна!"</p>
              <span>- Мария</span>
            </div>
          </div>
          <a href="/reviews" className="btn btn-secondary">
            Все отзывы
          </a>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-preview">
        <div className="container">
          <h2>Наши работы</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="gallery-placeholder">
                <span>Фото результата лазерной эпиляции</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-placeholder">
                <span>Фото искусственного загара</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-placeholder">
                <span>Фото маникюра</span>
              </div>
            </div>
          </div>
          <a href="/gallery" className="btn btn-secondary">
            Вся галерея
          </a>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking">
        <div className="container">
          <h2>Записаться на процедуру</h2>
          <a href="https://ego-forms.netlify.app/" className="btn btn-primary">
            Записаться на процедуру
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
