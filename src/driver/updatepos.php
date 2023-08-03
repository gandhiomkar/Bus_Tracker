<?php

include 'config.php';

$input = file_get_contents('php://input');
$decode = json_decode($input, true);

$busno = $decode["busno"];
$lat = $decode["lat"];
$lng = $decode["lng"];


$sql = "UPDATE bus SET lat = '{$lat}', lng = '{$lng}' WHERE busno = '{$busno}'";

if(mysqli_query($conn,$sql)){
	echo json_encode(array('update' => 'success'));
}else{
	echo json_encode(array('update' => 'failed'));
};

//mysqli_close($conn);
?>