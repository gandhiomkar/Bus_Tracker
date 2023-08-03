function hidediv() {
    var edit2 = document.getElementById("form");
    edit2.style.display = 'none';
};

function hidediv2() {
    var edit2 = document.getElementById("newdiv");
    edit2.style.display = 'none';
};



function initMap() {
    var myOptions = {
        zoom: 14,
        center: { lat: 18.522535, lng: 73.888352 },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), myOptions);
}

var img = "icon1.png";

let marker1 = false;

function initialize(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);

    map.setCenter(latlng);
    /*marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Latitude:" + lat + " | Longitude:" + lng,
        icon: img

    });*/
    // console.log(marker1);

    if (marker1 == false) {


        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Latitude:" + lat + " | Longitude:" + lng,
            icon: img

        });
        marker1 = true;

    } else {

        marker.setPosition(latlng);
        marker.setTitle("Latitude:" + lat + " | Longitude:" + lng);


    }

    //setTimeout(initialize, 1000);

}




function getselected() {
    var select = document.getElementById("select1");
    var busno = select.options[select.selectedIndex].value;

    hidediv2();

    // var lng = select.options[select.selectedIndex].getAttribute('data-lng');

    //document.getElementById("p1").innerHTML = buskey;
    // document.getElementById("p2").innerHTML = lng;

    if (busno == '0' || busno == 'null') {
        alert('please select a bus');
        fetchdata();
        return false;
    } else {

        setInterval(function() {
            var formdata = {
                'busno': busno


            }

            var jsondata = JSON.stringify(formdata);


            fetch('fetchlatlng.php', {
                    method: "POST",
                    body: jsondata,
                    headers: {
                        'Content-type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    var p1 = document.getElementById('p1');
                    if (data['empty']) {
                        p1.innerHTML = 'no data';
                    } else {

                        for (var i in data) {


                            var lat = data[i].lat
                            var lng = data[i].lng


                        }
                        // p1.innerHTML = lat + ' ' + lng;

                        initialize(lat, lng);

                    }
                })
                .catch((error) => {
                    show_message('error', "Can't fetch data.");
                });

        }, 1000)
    }

}

function fetchdata() {
    hidediv();
    var editModal = document.getElementById("newdiv");
    editModal.style.display = 'block';

    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;

    //document.getElementById('p1').innerHTML = from;
    //document.getElementById('p2').innerHTML = to;

    if (from == '' | to == '') {
        alert('please fill the inputs');
        return false;
    } else {
        var formdata = {
            'from': from,
            'to': to

        }

        var jsondata = JSON.stringify(formdata);


        fetch('fetchloc.php', {
                method: "POST",
                body: jsondata,
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                var p1 = document.getElementById('p1');
                if (data['empty']) {
                    p1.innerHTML = '<h3>No Record Found.</h3>';
                } else {
                    document.getElementById('select1').innerHTML = "";
                    document.getElementById('select1').innerHTML = "<option  value='0'  >select a bus...</option>";

                    var option = '';

                    for (var j in data) {
                        option += `<option  value="${data[j].busno}" data-lat="${data[j].lat}" data-lng="${data[j].lng}" >${data[j].busno}</option>`;
                    }
                    document.getElementById('select1').innerHTML += option;

                }
            })
            .catch((error) => {
                show_message('error', "Can't fetch data.");
                console.log(error)
            });


    }
}





function fetchloc() {
    getselected();
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