
import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>О салоне красоты Ego</h1>
          <p>Ваша красота - наша страсть и профессия</p>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="story-content">
            <div className="story-text">
              <h2>Наша история</h2>
              <p>Салон красоты Ego был основан в 2015 году с целью создания пространства, где каждый клиент может почувствовать себя особенным. Начиная с небольшой студии, мы выросли в премиальный салон, известный по всему Севастополю.</p>
              <p>Наше название "Ego" отражает философию: мы помогаем нашим клиентам обрести уверенность в себе и подчеркнуть их уникальную красоту. Мы верим, что уход за собой - это не роскошь, а necessity для современного человека.</p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span>Фото интерьера салона</span>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section reverse">
          <div className="story-content">
            <div className="story-text">
              <h2>Почему выбирают нас</h2>
              <p>В салоне Ego мы сочетаем лучшие традиции европейского качества с индивидуальным подходом к каждому клиенту. Мы используем только сертифицированную продукцию и современное оборудование.</p>
              <p>Наша миссия - делать людей счастливее через красоту и уход за собой. Мы создаем атмосферу, где вы можете расслабиться, довериться профессионалам и получить результат, который превзойдет ожидания.</p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span>Фото команды салона</span>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <h2>Наша философия</h2>
          <div className="philosophy-grid">
            <div className="philosophy-item">
              <div className="philosophy-icon">💎</div>
              <h3>Качество</h3>
              <p>Мы используем только premium продукты и оборудование, чтобы гарантировать безупречный результат</p>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-icon">🤝</div>
              <h3>Доверие</h3>
              <p>Честность и прозрачность - основа наших отношений с клиентами. Мы всегда говорим правду о результате</p>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-icon">❤️</div>
              <h3>Забота</h3>
              <p>Мы создаем атмосферу, где вы чувствуете себя комфортно и расслабленно в руках профессионалов</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Наша команда</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <span>Фото Марии</span>
              </div>
              <h3>Мария</h3>
              <p className="position">Специалист по лазерной эпиляции</p>
              <p className="bio">Опыт работы 8 лет. Сертифицированный специалист по работе с лазерными системами последнего поколения.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <span>Фото Анны</span>
              </div>
              <h3>Анна</h3>
              <p className="position">Специалист по искусственному загару</p>
              <p className="bio">Работает в индустрии красоты 6 лет. Знает все секреты идеального ровного загара без разводов.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <span>Фото Елены</span>
              </div>
              <h3>Елена</h3>
              <p className="position">Мастер маникюра и педикюра</p>
              <p className="bio">Профессионал с 10-летним стажем. Участник международных конкурсов nail-индустрии.</p>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section className="certificates-section">
          <h2>Наши сертификаты</h2>
          <div className="certificates-grid">
            <div className="certificate-item">
              <div className="certificate-image">
                <span>Сертификат качества</span>
              </div>
              <h3>Сертификат качества</h3>
            </div>
            <div className="certificate-item">
              <div className="certificate-image">
                <span>Сертификат специалиста</span>
              </div>
              <h3>Профессиональная подготовка</h3>
            </div>
            <div className="certificate-item">
              <div className="certificate-image">
                <span>Сертификат гигиены</span>
              </div>
              <h3>Стандарты гигиены</h3>
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

export default AboutPage;
