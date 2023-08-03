<?php

include 'config.php';

$input = file_get_contents('php://input');
$decode = json_decode($input, true);

$busno = $decode["busno"];




$sql ="SELECT b.lat AS lat, b.lng AS lng 
FROM bus b
WHERE 
b.busno = '{$busno}'

";

$result = mysqli_query($conn, $sql) or die("SQL Failed");
$output = [];



if(mysqli_num_rows($result) > 0){
  while($row = mysqli_fetch_assoc($result)){
    $output[] = $row;
  }
}else{
    $output['empty'] = ['empty'];
}

mysqli_close($conn);

echo json_encode($output);


?>