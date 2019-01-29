<?php
include 'connect.php';
//Takes the uploaded picture and adds it to memes

$image = addslashes(file_get_contents($_FILES['file']['tmp_name']));
$name = $_FILES['file']['name'];
$sql = "INSERT INTO `memes`(name, picture) VALUES ('{$name}','{$image}')";

if ($conn->query($sql) === TRUE) {
    $last_id = mysqli_insert_id($conn);
    echo $last_id;

} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

?>