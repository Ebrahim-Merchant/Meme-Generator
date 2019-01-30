<?php
include 'connect.php';


if(isset($_GET['id'])){
$id =$_GET['id'];
$sql = "SELECT name,picture FROM `memes` WHERE id=".$id;

$result = $conn->query($sql);

if ($result->num_rows > 0) {
   
    while($row = $result->fetch_assoc()) 
    {
        $image = $row['picture'];
        $name = $row['name'];
        }
        echo 'data:image/png;base64,'.base64_encode( $image );
    



} else {
    echo "0 results";
}
}
else {echo 'Error: ID is needed';}


?>