// Полная система управления контентом
class ContentManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.unsavedChanges = false;
        this.init();
    }

    init() {
        this.checkAuth();
        this.initEventListeners();
        this.loadContent();
        this.initAutoSave();
    }

    checkAuth() {
        // Простая аутентификация
        const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true' ||
                              new URLSearchParams(window.location.search).has('admin');
        
        if (!isAuthenticated && !window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
            return;
        }

        if (isAuthenticated) {
            localStorage.setItem('admin_authenticated', 'true');
        }
    }

    initEventListeners() {
        // Навигация
        document.addEventListener('click', (e) => {
            if (e.target.closest('.admin-menu a')) {
                e.preventDefault();
                const target = e.target.closest('.admin-menu a').getAttribute('href').substring(1);
                this.switchSection(target);
            }

            if (e.target.closest('.quick-card')) {
                const target = e.target.closest('.quick-card').dataset.target;
                this.switchSection(target);
            }

            if (e.target.closest('.tab-btn')) {
                const tab = e.target.closest('.tab-btn').dataset.tab;
                this.switchTab(tab);
            }
        });

        // Сохранение
        document.querySelector('[data-action="save-all"]').addEventListener('click', () => this.saveAll());
        document.querySelector('[data-action="preview"]').addEventListener('click', () => this.previewSite());

        // Изменения в формах
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea, select')) {
                this.unsavedChanges = true;
                this.updateSaveButton();
            }
        });

        // Загрузка изображений
        document.addEventListener('change', (e) => {
            if (e.target.matches('input[type="file"]')) {
                this.handleFileUpload(e.target);
            }
        });

        // Выход
        document.querySelector('[data-action="logout"]').addEventListener('click', () => this.logout());
    }

    switchSection(sectionId) {
        // Скрыть все секции
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });

        // Показать выбранную секцию
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentPage = sectionId;

            // Загрузить данные для секции
            this.loadSectionData(sectionId);
        }

        // Обновить активное меню
        document.querySelectorAll('.admin-menu a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`.admin-menu a[href="#${sectionId}"]`)?.classList.add('active');
    }

    switchTab(tabId) {
        // Скрыть все табы
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Показать выбранный таб
        document.querySelector(`.tab-btn[data-tab="${tabId}"]`)?.classList.add('active');
        document.querySelector(`.tab-content[data-tab="${tabId}"]`)?.classList.add('active');
    }

    async loadContent() {
        try {
            // Загрузка контента с сайта
            const response = await fetch('../data/content.json');
            if (response.ok) {
                this.siteContent = await response.json();
                this.populateEditors();
            } else {
                // Fallback: создаем базовую структуру
                this.siteContent = this.createDefaultContent();
                this.populateEditors();
            }
        } catch (error) {
            console.warn('Не удалось загрузить контент, используем демо-данные');
            this.siteContent = this.createDefaultContent();
            this.populateEditors();
        }
    }

    createDefaultContent() {
        return {
            mainPage: {
                hero: {
                    title: "Салон красоты EGO в Севастополе",
                    subtitle: "Подарите себе совершенство с нашими премиальными услугами",
                    buttonText: "Записаться на процедуру",
                    backgroundImage: "../assets/images/hero-bg.jpg"
                },
                services: [
                    {
                        title: "Лазерная эпиляция",
                        description: "Современное оборудование для безболезненного и эффективного удаления волос",
                        icon: "✨"
                    }
                ]
            },
            services: [],
            gallery: [],
            reviews: []
        };
    }

    populateEditors() {
        // Заполняем редакторы данными
        this.populateMainPageEditor();
        this.populateServicesEditor();
        this.populateGalleryEditor();
        this.populateReviewsEditor();
    }

    populateMainPageEditor() {
        const content = this.siteContent.mainPage;
        
        // Герой-секция
        document.querySelector('[data-selector=".hero h1"]').value = content.hero.title;
        document.querySelector('[data-selector=".hero p"]').value = content.hero.subtitle;
        document.querySelector('[data-selector=".hero .btn"]').value = content.hero.buttonText;
        
        // Превью изображения
        this.updateImagePreview('.hero', content.hero.backgroundImage);
    }

    populateServicesEditor() {
        const servicesContainer = document.querySelector('.services-list');
        servicesContainer.innerHTML = this.siteContent.services.map((service, index) => `
            <div class="service-editor" data-index="${index}">
                <h3>Услуга #${index + 1}</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>Название услуги</label>
                        <input type="text" value="${service.title}" 
                               onchange="admin.updateService(${index}, 'title', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Цена (руб)</label>
                        <input type="number" value="${service.price || ''}" 
                               onchange="admin.updateService(${index}, 'price', this.value)">
                    </div>
                </div>
                <div class="form-group">
                    <label>Описание</label>
                    <textarea onchange="admin.updateService(${index}, 'description', this.value)">${service.description || ''}</textarea>
                </div>
                <button class="btn btn-danger btn-sm" onclick="admin.deleteService(${index})">
                    <i class="fas fa-trash"></i> Удалить
                </button>
                <hr>
            </div>
        `).join('');
    }

    updateService(index, field, value) {
        if (this.siteContent.services[index]) {
            this.siteContent.services[index][field] = value;
            this.unsavedChanges = true;
            this.updateSaveButton();
        }
    }

    async saveAll() {
        try {
            this.showNotification('Сохранение...', 'info');
            
            // Сохраняем все изменения
            await this.saveToLocalStorage();
            await this.saveToFiles();
            
            this.unsavedChanges = false;
            this.updateSaveButton();
            this.showNotification('Все изменения сохранены!', 'success');
            
        } catch (error) {
            this.showNotification('Ошибка сохранения: ' + error.message, 'error');
        }
    }

    async saveToLocalStorage() {
        // Сохраняем в localStorage для быстрого доступа
        localStorage.setItem('site_content', JSON.stringify(this.siteContent));
    }

    async saveToFiles() {
        try {
            // Здесь будет сохранение в файлы через API
            const response = await fetch('api/update-content.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.siteContent)
            });

            if (!response.ok) {
                throw new Error('Ошибка сервера');
            }
        } catch (error) {
            console.warn('Не удалось сохранить в файлы, используем localStorage');
        }
    }

    async handleFileUpload(input) {
        const files = input.files;
        if (!files.length) return;

        for (const file of files) {
            if (file.type.startsWith('image/')) {
                await this.uploadImage(file);
            }
        }
    }

    async uploadImage(file) {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('api/upload-image.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                this.showNotification('Изображение загружено!', 'success');
                return result.path;
            } else {
                throw new Error('Ошибка загрузки');
            }
        } catch (error) {
            this.showNotification('Ошибка загрузки изображения', 'error');
            // Fallback: создаем object URL
            return URL.createObjectURL(file);
        }
    }

    updateImagePreview(selector, imageUrl) {
        const preview = document.querySelector(`.image-preview[data-target="${selector}"]`);
        if (preview && imageUrl) {
            preview.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
        }
    }

    previewSite() {
        // Открываем сайт в новом окне
        window.open('../index.html', '_blank');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'info': 'fa-info-circle'
        };
        return icons[type] || 'fa-info-circle';
    }

    updateSaveButton() {
        const saveBtn = document.querySelector('[data-action="save-all"]');
        if (this.unsavedChanges) {
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Сохранить изменения*';
            saveBtn.style.background = 'linear-gradient(135deg, #e67e22, #d35400)';
        } else {
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Сохранить всё';
            saveBtn.style.background = '';
        }
    }

    initAutoSave() {
        // Автосохранение каждые 2 минуты
        setInterval(() => {
            if (this.unsavedChanges) {
                this.saveToLocalStorage();
            }
        }, 120000);
    }

    logout() {
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('site_content');
        window.location.href = 'login.html';
    }
}

// Инициализация
const admin = new ContentManager();

// Глобальные функции для вызова из HTML
window.addService = function() {
    admin.siteContent.services.push({
        title: 'Новая услуга',
        description: 'Описание услуги',
        price: 0
    });
    admin.populateServicesEditor();
    admin.unsavedChanges = true;
    admin.updateSaveButton();
};

window.deleteService = function(index) {
    if (confirm('Удалить эту услугу?')) {
        admin.siteContent.services.splice(index, 1);
        admin.populateServicesEditor();
        admin.unsavedChanges = true;
        admin.updateSaveButton();
    }
};