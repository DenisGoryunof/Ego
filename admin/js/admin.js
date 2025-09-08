// Простая админ-панель без сложной аутентификации
class AdminPanel {
    constructor() {
        this.init();
    }

    init() {
        this.checkSimpleAuth();
        this.initEventListeners();
        this.loadDashboard();
    }

    checkSimpleAuth() {
        // Простая проверка - если есть параметр ?admin в URL или в localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const isAdmin = urlParams.has('admin') || localStorage.getItem('simple_admin') === 'true';
        
        if (!isAdmin && !window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
            return;
        }
        
        if (isAdmin && window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    }

    initEventListeners() {
        // Login form
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleSimpleLogin(e));
        }

        // Logout
        const logoutBtn = document.querySelector('[data-action="logout"]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Кнопки действий
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action]')) {
                const action = e.target.closest('[data-action]').dataset.action;
                this.handleAction(action);
            }
        });
    }

    handleSimpleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Простая проверка - любой пароль работает
        if (username === 'admin') {
            // Сохраняем простой флаг доступа
            localStorage.setItem('simple_admin', 'true');
            
            // Показываем сообщение об успехе
            this.showMessage('Вход выполнен успешно!', 'success');
            
            // Переходим через секунду
            setTimeout(() => {
                window.location.href = 'index.html?admin=true';
            }, 1000);
        } else {
            this.showMessage('Введите "admin" в поле логина', 'error');
        }
    }

    logout() {
        localStorage.removeItem('simple_admin');
        window.location.href = 'login.html';
    }

    showMessage(message, type = 'success') {
        // Создаем простое сообщение
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            border-radius: 5px;
            z-index: 1000;
            font-weight: bold;
        `;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }

    async loadDashboard() {
        if (!window.location.pathname.includes('index.html')) return;

        // Загружаем mock данные
        this.loadStatistics();
        this.loadRecentBookings();
        this.loadServices();
    }

    loadStatistics() {
        // Mock данные
        const stats = {
            totalBookings: 1247,
            activeClients: 584,
            monthlyRevenue: 284500,
            pendingApprovals: 12
        };

        // Обновляем статистику
        document.getElementById('total-bookings').textContent = stats.totalBookings;
        document.getElementById('active-clients').textContent = stats.activeClients;
        document.getElementById('monthly-revenue').textContent = this.formatCurrency(stats.monthlyRevenue);
        document.getElementById('pending-approvals').textContent = stats.pendingApprovals;
    }

    loadRecentBookings() {
        const bookings = [
            { id: 1, client: 'Анна Иванова', service: 'Лазерная эпиляция', date: '2024-01-15 14:00', status: 'confirmed' },
            { id: 2, client: 'Мария Петрова', service: 'Моментальный загар', date: '2024-01-15 15:30', status: 'pending' },
            { id: 3, client: 'Елена Сидорова', service: 'Маникюр', date: '2024-01-15 16:00', status: 'confirmed' }
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
                <td>${this.getStatusText(booking.status)}</td>
                <td>
                    <button class="btn btn-sm" onclick="admin.editBooking(${booking.id})">✏️</button>
                    <button class="btn btn-sm btn-danger" onclick="admin.deleteBooking(${booking.id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    loadServices() {
        const services = [
            { id: 1, name: 'Лазерная эпиляция', price: 2500, duration: '60 мин', category: 'Эпиляция' },
            { id: 2, name: 'Моментальный загар', price: 2000, duration: '30 мин', category: 'Загар' },
            { id: 3, name: 'Маникюр', price: 1500, duration: '45 мин', category: 'Ногти' }
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
                    <button class="btn btn-sm" onclick="admin.editService(${service.id})">✏️</button>
                    <button class="btn btn-sm btn-danger" onclick="admin.deleteService(${service.id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    handleAction(action) {
        switch (action) {
            case 'add-booking':
                this.addBooking();
                break;
            case 'add-service':
                this.addService();
                break;
            case 'export-data':
                this.exportData();
                break;
        }
    }

    addBooking() {
        const client = prompt('Имя клиента:');
        if (client) {
            this.showMessage('Запись добавлена!', 'success');
            this.loadRecentBookings();
        }
    }

    addService() {
        const service = prompt('Название услуги:');
        if (service) {
            this.showMessage('Услуга добавлена!', 'success');
            this.loadServices();
        }
    }

    editBooking(id) {
        alert(`Редактирование записи #${id}`);
    }

    deleteBooking(id) {
        if (confirm('Удалить эту запись?')) {
            this.showMessage('Запись удалена!', 'success');
        }
    }

    editService(id) {
        alert(`Редактирование услуги #${id}`);
    }

    deleteService(id) {
        if (confirm('Удалить эту услугу?')) {
            this.showMessage('Услуга удалена!', 'success');
        }
    }

    exportData() {
        this.showMessage('Данные экспортированы!', 'success');
    }

    formatCurrency(amount) {
        return amount.toLocaleString('ru-RU') + ' ₽';
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleString('ru-RU');
    }

    getStatusText(status) {
        const statuses = {
            'pending': '⏳ Ожидание',
            'confirmed': '✅ Подтверждено',
            'cancelled': '❌ Отменено'
        };
        return statuses[status] || status;
    }
}

// Инициализация
const admin = new AdminPanel();