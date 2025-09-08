<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Simple authentication check
function checkAuth() {
    $headers = apache_request_headers();
    if (!isset($headers['Authorization']) || $headers['Authorization'] !== 'Bearer mock_jwt_token') {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}

// Get request data
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/admin/api/', '', $path);

checkAuth();

// Mock database (replace with real database)
$dataFile = 'data.json';

function getData() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        return ['bookings' => [], 'services' => [], 'clients' => []];
    }
    return json_decode(file_get_contents($dataFile), true);
}

function saveData($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

// API Routes
switch ($path) {
    case 'bookings':
        handleBookings($method);
        break;
    case 'services':
        handleServices($method);
        break;
    case 'login':
        handleLogin($method);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
}

function handleLogin($method) {
    if ($method !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input['username'] === 'admin' && $input['password'] === 'admin123') {
        echo json_encode([
            'success' => true,
            'token' => 'mock_jwt_token',
            'user' => ['username' => 'admin', 'role' => 'admin']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}

function handleBookings($method) {
    $data = getData();
    
    switch ($method) {
        case 'GET':
            echo json_encode($data['bookings']);
            break;
            
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            $newBooking = [
                'id' => uniqid(),
                'client' => $input['client'],
                'service' => $input['service'],
                'date' => $input['date'],
                'status' => $input['status'],
                'comment' => $input['comment'] ?? '',
                'created_at' => date('c')
            ];
            $data['bookings'][] = $newBooking;
            saveData($data);
            echo json_encode($newBooking);
            break;
            
        case 'PUT':
            // Update booking
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $data['bookings'] = array_filter($data['bookings'], fn($b) => $b['id'] !== $id);
                saveData($data);
                echo json_encode(['success' => true]);
            }
            break;
    }
}

function handleServices($method) {
    $data = getData();
    
    switch ($method) {
        case 'GET':
            echo json_encode($data['services']);
            break;
            
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            $newService = [
                'id' => uniqid(),
                'name' => $input['name'],
                'category' => $input['category'],
                'price' => (float)$input['price'],
                'duration' => $input['duration'],
                'description' => $input['description'] ?? '',
                'created_at' => date('c')
            ];
            $data['services'][] = $newService;
            saveData($data);
            echo json_encode($newService);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $data['services'] = array_filter($data['services'], fn($s) => $s['id'] !== $id);
                saveData($data);
                echo json_encode(['success' => true]);
            }
            break;
    }
}
?>