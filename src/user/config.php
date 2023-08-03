<?php


$server="localhost";
$username="root";
$password="root";
$dbname = "bus1";


$conn= mysqli_connect($server,$username,$password,$dbname);

if(!$conn){
    die("connection failed due to".mysqli_connect_error());
}
?>