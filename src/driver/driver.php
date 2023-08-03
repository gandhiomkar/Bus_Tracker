<?php
session_start();

if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin']!=true){
    header("location: login.php");
    exit;
}

?>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>welcome -
            <?php echo $_SESSION['username']?>
        </title>
        <script src="fetch.js"></script>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>

    <body>
        <?php require 'nav.php' ?>
        


        <div class="container my-3">
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Welcome -
                    <?php echo $_SESSION['username']?>
                </h4>
            </div>
        </div>
        <div id="form">
            <div id="formblock">
                <div id="div1">
                    <form method="">

                        <label for="routes">Choose your route from the list:</label>
                        <!--
            <button type="button" name="bt" onclick="editRecord()">button</button>  <div id="modal">

            <select id="route3"></select>


        </div>-->

                        <div class="select-box">
                            <div class="options-container">
                                <select class="option" id="one">
                <option value="0">Select a route.. </option>
                
              </select>
                            </div>
                            <div class="selected">
                                add filter:
                            </div>
                            <div class="search-box">
                                <input type="text" id="inputFilter" placeholder="Search..." onchange="filterroutes()" />
                            </div>
                        </div>

                        <input type="button" value="submit" onclick="submitdata()">
                    </form>
                </div>
            </div>
        </div>
        <div class="dive" id="div2">
            <div id="formblock2">
                <p id="p1"></p>
                <p id="p2"></p>
                <p id="p3"></p>
            </div>

        </div>


    </body>

    </html>