'Метод не поддерживается'], 405);
exit;
}

// Авторизация
$token = isset($SERVER['HTTP' . strtoupper(str_replace('-', '', TOKEN_HEADER))])
? $SERVER['HTTP' . strtoupper(str_replace('-', '', TOKEN_HEADER))]
: (isset($_SERVER['HTTP_X_AUTH_TOKEN']) ? $_SERVER['HTTP_X_AUTH_TOKEN'] : '');

if (!in_array($token, $VALID_TOKENS, true)) {
sendJson(['error' => 'Недостаточно прав'], 401);
exit;
}

// Получение и валидация входных данных
$input = json_decode(trim(file_get_contents('php://input')), true);
if (!is_array($input)) {
sendJson(['error' => 'Неверный формат данных. Ожидается JSON.'], 400);
exit;
}

// Ожидаемые поля в content.json. Можно расширить по мере необходимости.
$allowedTopLevel = [
'navigation',
'contentBlocks',
'metadata',
'localization'
];

// Валидация структуры (простая проверка на наличие ключей)
foreach ($allowedTopLevel as $key) {
if (!array_key_exists($key, $input)) {
// Разрешаем отсутствующие поля для минимальной гибкости
// При желании можно вернуть ошибку
// continue;
$input[$key] = $input[$key] ?? null;
}
}

// Загрузка текущего файла, чтобы сохранить целостность
$current = [];
if (file_exists(DATA_FILE)) {
$raw = @file_get_contents(DATA_FILE);
if ($raw !== false) {
$decoded = json_decode($raw, true);
if (is_array($decoded)) {
$current = $decoded;
}
}
}

// Объединение: позволяем частичное обновление и сохранение целого файла
$updated = array_merge($current, array_filter($input, function($v) { return $v !== null; }));

// Включаем принудительную сортировку ключей для предсказуемости (необязательно)
$updated = array_replace_recursive($current, $input);

// Дополнительная валидация контента (по желанию): например, ensure строки и массивы
// Пример простых проверок
if (isset($updated['navigation']) && !is_array($updated['navigation'])) {
sendJson(['error' => 'Поле navigation должно быть массивом.'], 400);
exit;
}
if (isset($updated['contentBlocks']) && !is_array($updated['contentBlocks'])) {
sendJson(['error' => 'Поле contentBlocks должно быть массивом.'], 400);
exit;
}

// Запись файла
$dir = dirname(DATA_FILE);
if (!is_dir($dir)) {
if (!mkdir($dir, 0775, true)) {
sendJson(['error' => 'Не удалось создать директорию для данных.'], 500);
exit;
}
}

$encoded = json_encode($updated, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if ($encoded === false) {
sendJson(['error' => 'Не удалось сериализовать данные.'], 500);
exit;
}

if (file_put_contents(DATA_FILE, $encoded) === false) {
sendJson(['error' => 'Не удалось сохранить файл.'], 500);
exit;
}

// Успех
sendJson(['success' => true, 'updatedAt' => date('c')], 200);

// Вспомогательная функция отправки JSON
function sendJson($data, $status = 200) {
http_response_code($status);
header('Content-Type: application/json; charset=utf-8');
echo json_encode($data, JSON_UNESCAPED_UNICODE);
exit;
}
?>

Как использовать:

Разместите этот файл по пути admin/api/update-content.php в вашем проекте.
Убедитесь, что путь к data/content.json указан правильно относительно этого файла. В примере используется ../../data/content.json.
В запросе к этому скрипту отправляйте метод POST и заголовок X-Auth-Token со значением одним из ваших валидных токенов.
В теле запроса передайте JSON-объект, например:
{
"navigation": [
{ "name": "Главная", "href": "/" },
{ "name": "Контакты", "href": "/contact.html" }
],
"contentBlocks": [
{ "id": "hero", "type": "hero", "content": "Добро пожаловать на наш сайт" }
],
"metadata": {
"siteTitle": "EGO сайт",
"description": "Профессиональные веб-решения и цифровой маркетинг.",
"keywords": ["веб-разработка", "дизайн", "SEO", "поддержка"]
},
"localization": {
"lang": "ru",
"translations": {
"menu": "Меню",
"contact": "Контакты",
"send": "Отправить"
}
}
}