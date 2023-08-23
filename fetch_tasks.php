
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todoweb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT title, description, date FROM todo";
$result = $conn->query($sql);

$tasks = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
}

$conn->close();

echo json_encode($tasks);
?>