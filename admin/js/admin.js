(function(){
  // Простейший клиентский JS для админ-панели
  document.addEventListener('DOMContentLoaded', () => {
    // Пример: загрузка текущего контента
    fetch('/admin/api/admin-api.php?action=get-content')
      .then(r => r.json())
      .then(data => {
        // обновление UI по данным
        console.log('Контент загружен', data);
      })
      .catch(e => console.error('Ошибка загрузки контента', e));
  });
})();