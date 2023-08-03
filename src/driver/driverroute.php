
<?php

include 'config.php';

$sql = "SELECT route_name ,busno FROM `route`
INNER JOIN bus on `route`.bid= bus.bid";

$result = mysqli_query($conn, $sql) or die("SQL Failed");

if(mysqli_num_rows($result) > 0){
  while($row = mysqli_fetch_assoc($result)){
    $output['routes'][] = $row;
  }
}

mysqli_close($conn);

echo json_encode($output);
?>