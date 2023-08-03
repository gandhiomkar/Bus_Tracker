<?php

include 'config.php';

$input = file_get_contents('php://input');
$decode = json_decode($input, true);

$from = $decode["from"];
$to = $decode["to"];



$sql="SELECT 
  
  (CASE WHEN s1.stopno < s2.stopno
  AND r.path = '0'
  THEN b.busno
  WHEN s1.stopno > s2.stopno
  AND r.path = '1'
  THEN b.busno
  ELSE NULL
  END ) AS busno,

  (CASE WHEN s1.stopno < s2.stopno
  AND r.path = '0'
  THEN b.lat
  WHEN s1.stopno > s2.stopno
  AND r.path = '1'
  THEN b.lat
  ELSE NULL
  END ) AS lat,

  (CASE WHEN s1.stopno < s2.stopno
  AND r.path = '0'
  THEN b.lng
  WHEN s1.stopno > s2.stopno
  AND r.path = '1'
  THEN b.lng
  ELSE NULL
  END ) AS lng

  FROM `stop` s1

JOIN `route` r
ON s1.rid = r.rid
JOIN bus b 
ON r.bid = b.bid
JOIN place p1
ON s1.pid = p1.pid 
JOIN `stop` s2
ON s1.pid <> s2.pid 
JOIN place p2
ON s2.pid = p2.pid
WHERE 
p1.place = '{$from}'
AND p2.place ='{$to}'
HAVING busno IS NOT NULL
";

$result = mysqli_query($conn, $sql) or die("SQL Failed");
$output = [];

$total = mysqli_num_rows($result);


if(mysqli_num_rows($result) > 0){
  while($row = mysqli_fetch_assoc($result)){
    $output[] = $row;
  }
}else{
    $output['empty'] = ['empty'];
}

mysqli_close($conn);

echo json_encode($output);
//echo $total;

?>