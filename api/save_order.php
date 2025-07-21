<?php
require_once 'db_config_orders.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if ($data === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }

    $required = ['product_number', 'product_name', 'price'];
    foreach ($required as $field) {
        if (!isset($data[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Missing required field: $field"]);
            exit;
        }
    }

    $product_number = trim($data['product_number']);
    $product_name = trim($data['product_name']);
    $price = filter_var($data['price'], FILTER_VALIDATE_FLOAT);

    if ($price === false || $price <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid price value']);
        exit;
    }

    try {
        $stmt = $conn->prepare("INSERT INTO orders (product_number, product_name, price) VALUES (?, ?, ?)");
        $stmt->bind_param("ssd", $product_number, $product_name, $price);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
        } else {
            throw new Exception('Database error');
        }
    } catch (Exception $e) {
        http_response_code(500);
        error_log("Database error: " . $stmt->error);
        echo json_encode(['error' => 'Failed to save order']);
    } finally {
        $stmt->close();
        $conn->close();
    }
}
else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
