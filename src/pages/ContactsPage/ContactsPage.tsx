
import React from 'react';
import './ContactsPage.css';

const ContactsPage: React.FC = () => {
  return (
    <div className="contacts-page">
      <div className="container">
        {/* Hero Section */}
        <section className="contact-hero">
          <h1>Контакты</h1>
          <p>Приходите к нам в гости в самом центре Севастополя</p>
        </section>

        {/* Contact Content */}
        <section className="contact-content">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Адрес</h3>
                  <p>г. Севастополь, ул. 6-я Бастионная, дом 40, 2й этаж</p>
                  <p>вход со двора</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Телефон</h3>
                  <p><a href="tel:+79788590384">+7 (978) 859-03-84</a></p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p><a href="mailto:info@ego-sevastopol.ru">info@ego-sevastopol.ru</a></p>
                  <p><a href="mailto:booking@ego-sevastopol.ru">booking@ego-sevastopol.ru</a></p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">⏰</div>
                <div className="contact-details">
                  <h3>График работы</h3>
                  <p>Пн-Сб: 9:30-20:00</p>
                  <p>Вс: выходной</p>
                </div>
              </div>

              <div className="social-contact">
                <h3>Мы в соцсетях</h3>
                <div className="social-buttons">
                  <a href="https://vk.com/lunalikapronogti" className="social-btn vk">
                    VK
                  </a>
                  <a href="https://wa.me/79788590384" className="social-btn whatsapp">
                    WhatsApp
                  </a>
                  <a href="https://t.me/79788590384" className="social-btn telegram">
                    Telegram
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="map-container">
              <div className="map-placeholder">
                <span>Карта проезда</span>
                <p>г. Севастополь, ул. 6-я Бастионная, дом 40</p>
                <div className="map-actions">
                  <button className="btn btn-secondary">
                    Построить маршрут
                  </button>
                  <button className="btn btn-secondary">
                    Полный экран
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="booking-section">
          <h2>Записаться на процедуру</h2>
          <a href="https://ego-forms.netlify.app/" className="btn btn-primary">
            Записаться на процедуру
          </a>
        </section>
      </div>
    </div>
  );
};

export default ContactsPage;
