<?php
require_once 'admin-api.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // реквизит: все данные приходят в body.json
  // пример обновления файла content.json через admin-api
  $payload = json_decode(file_get_contents('php://input'), true);
  if (isset($payload['content'])) {
    file_put_contents('../../data/content.json', json_encode($payload['content']));
    echo json_encode(['status' => 'ok']);
    exit;
  }
}
http_response_code(400);
echo json_encode(['status' => 'error']);
?>