<?php

// Define the variables
$location = $_POST['location'];
$size = $_POST['size'];
$details = $_POST['details'];
$image = 'images/' . $_FILES['image']['name'];

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "potholes";
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Prepare the SQL statement
$sql = "INSERT INTO reports (location, size, details, image_path)
        VALUES ('$location', '$size', '$details', '$image')";

// Execute the SQL statement
if (mysqli_query($conn, $sql)) {
    echo "New pothole report saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);
?>
