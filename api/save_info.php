<?php
require_once 'db_config_form.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }

    $required = ['costumer_name', 'costumer_email', 'costumer_message'];
    foreach ($required as $field) {
        if (!isset($data[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Missing required field: $field"]);
            exit;
        }
    }

    $costumer_name = trim($data['costumer_name']);
    $costumer_email = trim($data['costumer_email']);
    $costumer_message = trim($data['costumer_message']);

    try {
        $stmt = $conn->prepare("INSERT INTO information (costumer_name, costumer_email, costumer_message) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $costumer_name, $costumer_email, $costumer_message);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
        } else {
            throw new Exception('Database error');
        }
    } catch (Exception $e) {
        http_response_code(500);
        error_log("Database error: " . $stmt->error);
        echo json_encode(['error' => 'Failed to save information']);
    } finally {
        $stmt->close();
        $conn->close();
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>