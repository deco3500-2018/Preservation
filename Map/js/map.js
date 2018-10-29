 var curLat;
 var curLng;
 var map;
 var loc_markers = [];

 function initMap() {
   // Try HTML5 geolocation.
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
     curLat = position.coords.latitude;
     curLng = position.coords.longitude;

     var pos = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
     };

     // Set current location as center
     infoWindow.setPosition(pos);
     infoWindow.setContent('You are here');
     map.setCenter(pos);

     }, function() {
     handleLocationError(true, infoWindow, map.getCenter());
     });
   } else {
     // Browser doesn't support Geolocation
     handleLocationError(false, infoWindow, map.getCenter());
   }

 // create the map
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: curLat, lng: curLng},
	  zoom: 17
	});

  var place = new google.maps.LatLng(curLat, curLng);
  // General Post Office
  var place1 = new google.maps.LatLng(-27.467804,153.027925);
  // Plough Inn
  var place2 = new google.maps.LatLng(-27.478283, 153.022432);
  // Victoria Bridge
  // Southbank Side
  var place3 = new google.maps.LatLng(-27.473329, 153.019965);
  // City Side
  var place4 = new google.maps.LatLng(-27.471317, 153.022718);
  // Queen Street Mall
  var place5 = new google.maps.LatLng(-27.469039, 153.026012);
  // South Bank Fountain/Wheel
  var place6 = new google.maps.LatLng(-27.475336, 153.020913);
  // Southbank Canals
  var place7 = new google.maps.LatLng(-27.477608, 153.022005);
  // Advanced Engineering Building
  var place8 = new google.maps.LatLng(-27.499501, 153.015209);

  var marker = new google.maps.Marker({position:place});
  var marker1 = new google.maps.Marker({position:place1});
  var marker2 = new google.maps.Marker({position:place2});
  var marker3 = new google.maps.Marker({position:place3});
  var marker4 = new google.maps.Marker({position:place4});
  var marker5 = new google.maps.Marker({position:place5});
  var marker6 = new google.maps.Marker({position:place6});
  var marker7 = new google.maps.Marker({position:place7});
  var marker8 = new google.maps.Marker({position:place8});

  marker.setMap(map);
  marker1.setMap(map);
  marker2.setMap(map);
  marker3.setMap(map);
  marker4.setMap(map);
  marker5.setMap(map);
  marker6.setMap(map);
  marker7.setMap(map);
  marker8.setMap(map);

  var infowindow = new google.maps.InfoWindow({
    content: "Hello World!"
  });

  var infowindow1 = new google.maps.InfoWindow({
    content: '<h3>' +
    'General Post Office' +
    '</h3>' +
    '<img src="imgs/1.jpg">' +
    '</img>'
  });
  marker1.addListener('click', function() {
  infowindow1.open(map, marker1);
  });

  var infowindow2 = new google.maps.InfoWindow({
    content: '<h3>' +
    'Plough Inn' +
    '</h3>' +
    '<img src="imgs/2.jpg">' +
    '</img>'
  });
  marker2.addListener('click', function() {
  infowindow2.open(map, marker2);
  });

  var infowindow3 = new google.maps.InfoWindow({
    content: '<h3>' +
    'Victoria Bridge Southbank Side' +
    '</h3>' +
    '<img src="imgs/3.jpg">' +
    '</img>'
  });
  marker3.addListener('click', function() {
  infowindow3.open(map, marker3);
  });

  var infowindow4 = new google.maps.InfoWindow({
    content: '<h3>' +
    'Victoria Bridge City Side' +
    '</h3>' +
    '<img src="imgs/4.jpg">' +
    '</img>'
  });
  marker4.addListener('click', function() {
  infowindow4.open(map, marker4);
  });

  var infowindow5 = new google.maps.InfoWindow({
    content: '<h3>' +
    'Queen Street Mall' +
    '</h3>' +
    '<img src="imgs/5.jpg">' +
    '</img>'
  });
  marker5.addListener('click', function() {
  infowindow5.open(map, marker5);
  });

  var infowindow6 = new google.maps.InfoWindow({
    content: '<h3>' +
    'South Bank Fountain/Wheel' +
    '</h3>' +
    '<img src="imgs/6.jpg">' +
    '</img>'
  });
  marker6.addListener('click', function() {
  infowindow6.open(map, marker6);
  });

  var infowindow7 = new google.maps.InfoWindow({
    content: '<h3>' +
    'Southbank Canals' +
    '</h3>' +
    '<img src="imgs/7.jpg">' +
    '</img>'
  });
  marker7.addListener('click', function() {
  infowindow7.open(map, marker7);
  });

  var infowindow8 = new google.maps.InfoWindow({
    content: '<h3>' +
    'Advanced Engineering Building' +
    '</h3>' +
    '<img src="imgs/8.jpg">' +
    '</img>'
  });
  marker8.addListener('click', function() {
  infowindow8.open(map, marker8);
  });

	var infoWindow = new google.maps.InfoWindow({map: map});

  // route
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay1 = new google.maps.DirectionsRenderer({
              suppressInfoWindows: true,
              suppressMarkers: true,
              map: map
            });

  var directionsDisplay2 = new google.maps.DirectionsRenderer ({
              suppressInfoWindows: true,
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: 'red',
                strokeWeight: 7,
                strokeOpacity: 0.5,
              },
              suppressMarkers: true,
              map: map
            });
  directionsDisplay1.setMap(map);
  directionsDisplay2.setMap(map);

  var onChangeHandler = function() {
    directionsService.route({
      origin: {lat: curLat, lng: curLng},
      destination: document.getElementById('first').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay1.setDirections(response);
      } else {
        directionsDisplay1.setDirections({routes: []});
        }
      })

    directionsService.route({
          origin: document.getElementById('first').value,
          destination: document.getElementById('second').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay2.setDirections(response);
          } else {
            directionsDisplay2.setDirections({routes: []});
            }
          })
    };

    document.getElementById('first').addEventListener('change', onChangeHandler);
    document.getElementById('second').addEventListener('change', onChangeHandler);
}
