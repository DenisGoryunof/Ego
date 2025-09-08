// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.init();
        this.currentUser = null;
    }

    init() {
        this.checkAuth();
        this.initEventListeners();
        this.loadDashboard();
    }

    checkAuth() {
        const token = localStorage.getItem('admin_token');
        if (!token && !window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
            return;
        }
        
        if (token && window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    }

    initEventListeners() {
        // Login form
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action]')) {
                const action = e.target.closest('[data-action]').dataset.action;
                this.handleAction(action, e.target.closest('[data-action]'));
            }
        });

        // Logout
        const logoutBtn = document.querySelector('[data-action="logout"]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Modal handling
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
            if (e.target.classList.contains('close-modal')) {
                this.closeModal();
            }
        });

        // Mobile menu
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                document.querySelector('.admin-sidebar').classList.toggle('active');
            });
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const formData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        try {
            // Simulate API call
            await this.mockLogin(formData);
            
            localStorage.setItem('admin_token', 'mock_jwt_token');
            localStorage.setItem('admin_user', JSON.stringify({
                username: formData.username,
                role: 'admin'
            }));
            
            window.location.href = 'index.html';
        } catch (error) {
            this.showNotification('Ошибка входа: неверные данные', 'error');
        }
    }

    async mockLogin(credentials) {
        // Mock authentication - replace with real API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.username === 'admin' && credentials.password === 'admin123') {
                    resolve({ success: true });
                } else {
                    reject({ success: false });
                }
            }, 1000);
        });
    }

    logout() {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = 'login.html';
    }

    async loadDashboard() {
        if (!window.location.pathname.includes('index.html')) return;

        await this.loadStatistics();
        await this.loadRecentBookings();
        await this.loadServices();
    }

    async loadStatistics() {
        // Mock data - replace with real API
        const stats = {
            totalBookings: 1247,
            activeClients: 584,
            monthlyRevenue: 284500,
            pendingApprovals: 12
        };

        this.updateStatCard('total-bookings', stats.totalBookings);
        this.updateStatCard('active-clients', stats.activeClients);
        this.updateStatCard('monthly-revenue', this.formatCurrency(stats.monthlyRevenue));
        this.updateStatCard('pending-approvals', stats.pendingApprovals);
    }

    updateStatCard(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    async loadRecentBookings() {
        // Mock data
        const bookings = [
            { id: 1, client: 'Анна Иванова', service: 'Лазерная эпиляция', date: '2024-01-15 14:00', status: 'confirmed' },
            { id: 2, client: 'Мария Петрова', service: 'Моментальный загар', date: '2024-01-15 15:30', status: 'pending' },
            { id: 3, client: 'Елена Сидорова', service: 'Маникюр', date: '2024-01-15 16:00', status: 'confirmed' },
            { id: 4, client: 'Ольга Николаева', service: 'Ламинирование ресниц', date: '2024-01-16 11:00', status: 'cancelled' }
        ];

        this.renderBookingsTable(bookings);
    }

    renderBookingsTable(bookings) {
        const tbody = document.querySelector('#bookings-table tbody');
        if (!tbody) return;

        tbody.innerHTML = bookings.map(booking => `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.client}</td>
                <td>${booking.service}</td>
                <td>${this.formatDate(booking.date)}</td>
                <td><span class="status-badge status-${booking.status}">${this.getStatusText(booking.status)}</span></td>
                <td>
                    <button class="btn btn-sm" data-action="edit-booking" data-id="${booking.id}">✏️</button>
                    <button class="btn btn-sm btn-danger" data-action="delete-booking" data-id="${booking.id}">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    async loadServices() {
        // Mock data
        const services = [
            { id: 1, name: 'Лазерная эпиляция', price: 2500, duration: '60 мин', category: 'Эпиляция' },
            { id: 2, name: 'Моментальный загар', price: 2000, duration: '30 мин', category: 'Загар' },
            { id: 3, name: 'Маникюр', price: 1500, duration: '45 мин', category: 'Ногти' },
            { id: 4, name: 'Педикюр', price: 1800, duration: '60 мин', category: 'Ногти' },
            { id: 5, name: 'Ламинирование ресниц', price: 2200, duration: '90 мин', category: 'Ресницы' }
        ];

        this.renderServicesTable(services);
    }

    renderServicesTable(services) {
        const tbody = document.querySelector('#services-table tbody');
        if (!tbody) return;

        tbody.innerHTML = services.map(service => `
            <tr>
                <td>${service.id}</td>
                <td>${service.name}</td>
                <td>${service.category}</td>
                <td>${this.formatCurrency(service.price)}</td>
                <td>${service.duration}</td>
                <td>
                    <button class="btn btn-sm" data-action="edit-service" data-id="${service.id}">✏️</button>
                    <button class="btn btn-sm btn-danger" data-action="delete-service" data-id="${service.id}">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    handleAction(action, element) {
        const id = element?.dataset?.id;

        switch (action) {
            case 'add-booking':
                this.openBookingModal();
                break;
            case 'edit-booking':
                this.openBookingModal(id);
                break;
            case 'delete-booking':
                this.deleteBooking(id);
                break;
            case 'add-service':
                this.openServiceModal();
                break;
            case 'edit-service':
                this.openServiceModal(id);
                break;
            case 'delete-service':
                this.deleteService(id);
                break;
            case 'export-data':
                this.exportData();
                break;
        }
    }

    openBookingModal(bookingId = null) {
        this.showModal(bookingId ? 'Редактирование записи' : 'Новая запись', `
            <form id="bookingForm">
                <div class="form-row">
                    <div class="form-group">
                        <label>Клиент</label>
                        <input type="text" name="client" required>
                    </div>
                    <div class="form-group">
                        <label>Услуга</label>
                        <select name="service" required>
                            <option value="">Выберите услугу</option>
                            <option value="1">Лазерная эпиляция</option>
                            <option value="2">Моментальный загар</option>
                            <option value="3">Маникюр</option>
                            <option value="4">Педикюр</option>
                            <option value="5">Ламинирование ресниц</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Дата и время</label>
                        <input type="datetime-local" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Статус</label>
                        <select name="status" required>
                            <option value="pending">Ожидание</option>
                            <option value="confirmed">Подтверждено</option>
                            <option value="completed">Завершено</option>
                            <option value="cancelled">Отменено</option>
                        </select>
                    </div>
                </div>
                <div class="form-group-full">
                    <label>Комментарий</label>
                    <textarea name="comment" rows="3"></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="admin.closeModal()">Отмена</button>
                    <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
            </form>
        `);
    }

    openServiceModal(serviceId = null) {
        this.showModal(serviceId ? 'Редактирование услуги' : 'Новая услуга', `
            <form id="serviceForm">
                <div class="form-row">
                    <div class="form-group">
                        <label>Название услуги</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Категория</label>
                        <select name="category" required>
                            <option value="">Выберите категорию</option>
                            <option value="Эпиляция">Эпиляция</option>
                            <option value="Загар">Загар</option>
                            <option value="Ногти">Ногти</option>
                            <option value="Ресницы">Ресницы</option>
                            <option value="Уход">Уход</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Цена (руб)</label>
                        <input type="number" name="price" required min="0">
                    </div>
                    <div class="form-group">
                        <label>Длительность</label>
                        <select name="duration" required>
                            <option value="30 мин">30 минут</option>
                            <option value="45 мин">45 минут</option>
                            <option value="60 мин">1 час</option>
                            <option value="90 мин">1.5 часа</option>
                            <option value="120 мин">2 часа</option>
                        </select>
                    </div>
                </div>
                <div class="form-group-full">
                    <label>Описание</label>
                    <textarea name="description" rows="3"></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="admin.closeModal()">Отмена</button>
                    <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
            </form>
        `);
    }

    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${title}</h2>
                ${content}
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    }

    async deleteBooking(id) {
        if (confirm('Вы уверены, что хотите удалить эту запись?')) {
            // Mock delete - replace with real API
            this.showNotification('Запись успешно удалена', 'success');
            await this.loadRecentBookings();
        }
    }

    async deleteService(id) {
        if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
            // Mock delete - replace with real API
            this.showNotification('Услуга успешно удалена', 'success');
            await this.loadServices();
        }
    }

    exportData() {
        // Mock export - replace with real implementation
        const data = "ID,Клиент,Услуга,Дата,Статус\n1,Анна Иванова,Лазерная эпиляция,2024-01-15,confirmed";
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bookings_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        
        this.showNotification('Данные успешно экспортированы', 'success');
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show and hide animation
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleString('ru-RU');
    }

    getStatusText(status) {
        const statuses = {
            'pending': 'Ожидание',
            'confirmed': 'Подтверждено',
            'completed': 'Завершено',
            'cancelled': 'Отменено'
        };
        return statuses[status] || status;
    }
}

// Initialize admin panel
const admin = new AdminPanel();