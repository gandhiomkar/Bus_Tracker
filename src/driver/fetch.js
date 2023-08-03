function editRecord() {

    var editModal = document.getElementById("modal");
    editModal.style.display = 'block';
    // document.getElementById("editlname").value = "somevalue";


    fetch('driverroute.php')
        .then((response) => response.json())
        .then((data) => {
            var option = '';

            var selected = '';
            for (var j in data['routes']) {

                option += `<option  value="${data['routes'][j].buskey}">${data['routes'][j].route_name}</option>`;
            }

            document.getElementById('route3').innerHTML = option;
            //document.getElementById('routes1').innerHTML = option;

        })
        .catch((error) => {
            show_message('error', "Can't Fetch Data");
        });




}

let result = {};
let allroutes = {};

function filterroutes() {
    var filter = document.getElementById("inputFilter").value;
    result.routes = allroutes.routes.filter(x => x.route_name.includes(filter))
    let select = document.getElementById("one");

    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    for (let i = 0; i < result.routes.length; i++) {
        let option = document.createElement("option");
        option.value = result.routes[i].buskey;
        option.text = result.routes[i].route_name;
        select.appendChild(option);
    }
}

async function getroutes() {
    let url = 'users.json';
    try {
        let res = await fetch("driverroute.php");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderroutes() {
    allroutes = await getroutes();
    console.log(allroutes);
    result = Object.assign({}, allroutes);
    let select = document.getElementById("one");
    for (let i = 0; i < result.routes.length; i++) {
        let option = document.createElement("option");
        option.value = result.routes[i].busno;
        option.text = result.routes[i].route_name;
        select.appendChild(option);
    }
}

renderroutes();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(updatePosition);
    } else {
        document.getElementById("p1").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function updatePosition(position) {

    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var busno = document.getElementById('one').value;

    // document.getElementById("p2").innerHTML = "Latitude: " + lat +
    //    "<br>Longitude: " + lng;

    document.getElementById("p1").innerHTML = 'selected bus:' + busno;

    if (busno == 0) {
        alert('please select a route');
        window.location.replace("http://localhost/findmybus/driver/driver.php");

        return false;
    } else {
        var formdata = {
            'busno': busno,
            'lat': lat,
            'lng': lng
        }

        var jsondata = JSON.stringify(formdata);

        fetch('updatepos.php', {
                method: 'PUT',
                body: jsondata,
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((result) => {
                if (result.update == 'success') {
                    show_message('success', 'Data Inserted Successfully.');


                } else {
                    show_message('error', "Data Can't Inserted.");

                }
            })
            .catch((error) => {
                show_message('error', "Data not Inserted.");
            });


    }



}

function hidediv() {
    var edit2 = document.getElementById("form");
    edit2.style.display = 'none';
}

function submitdata() {

    hidediv();

    var edit1 = document.getElementById("div2");
    edit1.style.display = 'block';


    //var bkey = document.getElementById('one').value;
    //document.getElementById("p1").innerHTML = bkey;

    getLocation();


}

//show error / success message
function show_message(type, text) {
    if (type == 'error') {
        var message_box = document.getElementById('p3');
    } else {
        var message_box = document.getElementById('p3');
    }
    message_box.innerHTML = text;
    message_box.style.display = "block";
    //setTimeout(function() {
    //    message_box.style.display = "none";
    //}, 3000);
}