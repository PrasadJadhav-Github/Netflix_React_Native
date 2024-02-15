<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "registration";
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_REQUEST['username']) && isset($_REQUEST['password'])) {
        $username = $_REQUEST['username'];
        $password = $_REQUEST['password'];

        if (!empty($username) && !empty($password)) {
            $select_query = "SELECT * FROM info WHERE contact = ? AND password = ?";
            $stmt = $conn->prepare($select_query);
            $stmt->bind_param("ss", $username, $password);
            $stmt->execute();
            $result = $stmt->get_result();
            $response = array();
            if ($result->num_rows > 0) {
                // fetch all user details
                $userDetails = array();
                while ($row = $result->fetch_assoc()) {
                    $userDetails[] = $row;
                }
                $response['status'] = "success";
                $response['message'] = "User authenticated successfully!";
                $response['userDetails'] = $userDetails;
            } else {
                $response['status'] = "failed";
                $response['message'] = "Authentication failed";
            }
            $stmt->close();
        } else {
            $response['status'] = "failed";
            $response['message'] = "Authentication failed";
        }
    } else {
        $response['status'] = "failed";
        $response['message'] = "Authentication failed";
    }
} else {
    $response['status'] = "failed";
    $response['message'] = "Authentication failed";
}
echo json_encode($response);

$conn->close();
