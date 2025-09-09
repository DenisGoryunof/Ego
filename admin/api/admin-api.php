<?php
// Простой API админки: безопасно ограниченный доступ
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $user = $_POST['username'] ?? '';
  $pass = $_POST['password'] ?? '';
  // Пример проверки (замените на полноценную систему)
  if ($user === 'admin' && $pass === 'YOUR_STRONG_PASSWORD') {
    $_SESSION['admin'] = true;
    echo json_encode(['status' => 'ok', 'message' => 'Authenticated']);
    exit;
  } else {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    exit;
  }
}
if (!isset($_SESSION['admin']) || $_SESSION['admin'] !== true) {
  http_response_code(403);
  echo json_encode(['status' => 'forbidden']);
  exit;
}

// Пример роутинга
$action = $_GET['action'] ?? '';
if ($action === 'get-content') {
  // читаем контент из data/content.json или другого источника
  $json = file_get_contents('../../data/content.json');
  header('Content-Type: application/json');
  echo $json;
  exit;
}

if ($action === 'update-content') {
  // простая замена контента (для примера)
  $input = json_decode(file_get_contents('php://input'), true);
  if (isset($input['content'])) {
    // сохранение в файл (только как пример)
    file_put_contents('../../data/content.json', json_encode($input['content']));
    echo json_encode(['status' => 'ok']);
  } else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No content provided']);
  }
  exit;
}
?>