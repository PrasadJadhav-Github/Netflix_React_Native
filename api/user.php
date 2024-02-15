<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "registration";
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$select_query = "SELECT * FROM info";
$result = $conn->query($select_query);

$response = array();

if ($result->num_rows > 0) {
    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    $response['status'] = "success";
    $response['message'] = "User data retrieved successfully!";
    $response['users'] = $users;
} else {
    $response['status'] = "failed";
    $response['message'] = "No user data found";
}

echo json_encode($response);

$conn->close();
