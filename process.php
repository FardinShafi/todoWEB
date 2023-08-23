
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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["taskTitle"];
    $description = $_POST["taskDescription"];
    $date = $_POST["taskDate"];

    $sql = "INSERT INTO todo (title, description, date) VALUES ('$title', '$description', '$date')";

    if ($conn->query($sql) === TRUE) {
        echo "Task added successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>