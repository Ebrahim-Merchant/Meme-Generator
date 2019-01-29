<?php
include 'connect.php';


//Gets all data for Gallery Table
$sql = "SELECT * FROM `gallery`";

$result = $conn->query($sql);

$output = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $temp_obj = new stdClass();
        $temp_obj ->id=$row["id"];
        $temp_obj ->name=$row["name"];
        $temp_obj ->img_url = '<img class="card-img-top" style="width:350px; height:400px;" src="data:image/png;base64,'.base64_encode( $row["picture"] ).'"  id="'.$row["id"].'"/>';
        
        array_push($output,$temp_obj);



    }

} else {
    echo "0 results";
}
header("Content-type: application/json");
//outputs the JSON Object
echo json_encode($output);



?>