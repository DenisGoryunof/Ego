<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Простое сохранение контента в JSON файл
$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    // Сохраняем в файл
    file_put_contents('../../data/content.json', json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    echo json_encode(['success' => true, 'message' => 'Контент сохранен']);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Нет данных']);
}
?>