<?php

include 'connect.php';

//Gets all data for Memes Table
$sql = "SELECT * FROM `memes`";

$result = $conn->query($sql);


//Adds the data to a array
$output = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $temp_obj = new stdClass();
        $temp_obj ->id=$row["id"];
        $temp_obj ->name=$row["name"];
        $temp_obj ->img_url = '<img style="width:100px; height:100px;" src="data:image/png;base64,'.base64_encode( $row["picture"] ).'"  id="'.$row["id"].'"/>';        
        array_push($output,$temp_obj);
    }

} else {
    echo "0 results";
}
header("Content-type: application/json");


//outputs the JSON Object
echo json_encode($output);



?>