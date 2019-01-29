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
        // //header("Content-type: image/png");
        // header('Content-Disposition: attachment; filename="'.$name.'"');
        // // header("Content-Transfer-Encoding: BASE64"); 
        // // header('Expires: 0');
        // // header('Pragma: no-cache');
        // //header("Content-Length: ".strlen($image->data)); 
        // echo $image; 
        echo 'data:image/png;base64,'.base64_encode( $image );
    



} else {
    echo "0 results";
}
}
else {echo 'Error: ID is needed';}


?>