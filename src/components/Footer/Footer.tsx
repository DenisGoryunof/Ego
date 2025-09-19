
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Контакты</h3>
            <p>г. Севастополь, ул. 6-я Бастионная, 40, 2й этаж</p>
            <p>Вход со двора</p>
            <p>
              <a href="tel:+79788590384">+7 (978) 859-03-84</a>
            </p>
            <p>Пн-Сб: 9:30-20:00</p>
            <p>Вс: выходной</p>
          </div>
          
          <div className="footer-section">
            <h3>Услуги</h3>
            <ul>
              <li>Лазерная эпиляция</li>
              <li>Моментальный загар</li>
              <li>Маникюр и педикюр</li>
              <li>Ламинирование ресниц</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Социальные сети</h3>
            <div className="social-links">
              <a href="https://t.me/79788590384" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              <a href="https://wa.me/79788590384" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href="https://vk.com/egosevastopol" target="_blank" rel="noopener noreferrer">
                VKontakte
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Салон красоты Ego. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
