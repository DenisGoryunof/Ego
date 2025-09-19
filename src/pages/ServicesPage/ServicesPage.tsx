
import React from 'react';
import './ServicesPage.css';

const ServicesPage: React.FC = () => {
  return (
    <div className="services-page">
      <div className="container">
        <div className="page-header">
          <h1>Наши услуги</h1>
          <p>Профессиональный уход и премиальное качество</p>
        </div>

        {/* Лазерная эпиляция */}
        <section id="epilation" className="service-section">
          <div className="service-content">
            <h2>Лазерная эпиляция</h2>
            <p>Лазерная эпиляция - это ваше лучшее решение. Мощный диодный аппарат, опытный мастер, максимальный эффект и комфорт.</p>
            
            <div className="advantages-list">
              <div className="advantage-item">
                <span className="check-icon">✓</span>
                <span>Мощный диодный аппарат</span>
              </div>
              <div className="advantage-item">
                <span className="check-icon">✓</span>
                <span>Опытный мастер</span>
              </div>
              <div className="advantage-item">
                <span className="check-icon">✓</span>
                <span>Максимальный эффект и комфорт</span>
              </div>
            </div>

            <div className="price-list">
              <h3>Прайс-лист:</h3>
              <ul>
                <li>Верхняя губа - <span className="price">500 руб.</span></li>
                <li>Подбородок - <span className="price">500 руб.</span></li>
                <li>Подмышечные впадины - <span className="price">1500 руб.</span></li>
                <li>Бикини классическое - <span className="price">2000 руб.</span></li>
                <li>Бикини глубокое - <span className="price">2500 руб.</span></li>
                <li>Голени - <span className="price">2500 руб.</span></li>
                <li>Бёдра - <span className="price">3000 руб.</span></li>
                <li>Ноги полностью - <span className="price">4500 руб.</span></li>
                <li>Руки до локтя - <span className="price">2000 руб.</span></li>
                <li>Руки полностью - <span className="price">2500 руб.</span></li>
              </ul>
            </div>

            <a href="https://ego-forms.netlify.app" className="btn btn-primary">
              Записаться на процедуру
            </a>
          </div>
          <div className="service-image">
            <div className="image-placeholder">
              <span>Фото лазерной эпиляции</span>
            </div>
          </div>
        </section>

        {/* Моментальный загар */}
        <section id="tan" className="service-section reverse">
          <div className="service-content">
            <h2>Моментальный загар</h2>
            <p>Это простой, безопасный и быстрый способ обрести красивый и ровный загар разных оттенков, который продержится до 2х недель. Благодаря распылению на тело специального лосьона (на основе тростникового сахара), происходит естественный процесс выработки меланина.</p>
            
            <div className="usage-list">
              <h3>Когда делают моментальный загар?</h3>
              <ul>
                <li>На фотосессию</li>
                <li>На праздничное событие</li>
                <li>В отпуск или поездку</li>
                <li>На свидание или мероприятие</li>
                <li>Для себя любимой 🫶</li>
              </ul>
            </div>

            <div className="price-total">
              <p>Стоимость: <span className="price">2500 руб.</span></p>
            </div>

            <a href="https://ego-forms.netlify.app" className="btn btn-primary">
              Записаться на процедуру
            </a>
          </div>
          <div className="service-image">
            <div className="image-placeholder">
              <span>Фото моментального загара</span>
            </div>
          </div>
        </section>

        {/* Маникюр и педикюр */}
        <section id="nails" className="service-section">
          <div className="service-content">
            <h2>Маникюр и педикюр</h2>
            <p>Наши мастера маникюра и педикюра - настоящие профессионалы, которые регулярно повышают квалификацию и следят за новейшими тенденциями в nail-индустрии. Мы используем только качественные материалы и стерильные инструменты.</p>
            
            <div className="price-list">
              <h3>Прайс-лист:</h3>
              <ul>
                <li>Маникюр + покрытие гель-лак - <span className="price">2500 руб.</span></li>
                <li>Педикюр + покрытие гель-лак - <span className="price">3000 руб.</span></li>
                <li>Комплекс "Все включено" - <span className="price">5000 руб.</span></li>
                <li>Наращивание ногтей - <span className="price">от 3500 руб.</span></li>
                <li>Дизайн ногтей - <span className="price">от 500 руб.</span></li>
              </ul>
            </div>

            <a href="https://ego-forms.netlify.app" className="btn btn-primary">
              Записаться на процедуру
            </a>
          </div>
          <div className="service-image">
            <div className="image-placeholder">
              <span>Фото маникюра и педикюра</span>
            </div>
          </div>
        </section>

        {/* Ламинирование ресниц */}
        <section id="lash" className="service-section reverse">
          <div className="service-content">
            <h2>Ламинирование ресниц</h2>
            <p>Это долговременная укладка, завивка и окрашивание ваших натуральных ресниц с нанесением специальных составов и питательной сыворотки.</p>
            
            <div className="advantages-list">
              <div className="advantage-item">
                <span className="check-icon">✓</span>
                <span>Красивый изгиб</span>
              </div>
              <div className="advantage-item">
                <span className="check-icon">✓</span>
                <span>Яркий, насыщенный цвет</span>
              </div>
              <div className="advantage-item">
                <span className="check-icon">✓</span>
                <span>Сильные и плотные реснички</span>
              </div>
              <div className="advantage-item">
                <span className="check-icon">✓</span>
                <span>Эффект до 2х месяцев</span>
              </div>
            </div>

            <div className="price-total">
              <p>Стоимость: <span className="price">2000 руб.</span></p>
            </div>

            <a href="https://ego-forms.netlify.app" className="btn btn-primary">
              Записаться на процедуру
            </a>
          </div>
          <div className="service-image">
            <div className="image-placeholder">
              <span>Фото ламинирования ресниц</span>
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

export default ServicesPage;
