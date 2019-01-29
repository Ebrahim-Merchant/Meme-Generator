<?php

include 'connect.php';

//Takes the fully edited picture and adds it to gallery
$image = addslashes(file_get_contents($_FILES['data']['tmp_name']));
$name = $_POST['fname'];
$sql = "INSERT INTO `gallery`(name, picture) VALUES ('{$name}','{$image}')";

if ($conn->query($sql) === TRUE) {
    $last_id = mysqli_insert_id($conn);
    echo $last_id;

} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

?>