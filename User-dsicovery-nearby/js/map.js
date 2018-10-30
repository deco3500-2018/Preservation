 var curLat = -27;
 var curLng = 153;
 var map;
 var loc_markers = [];
 
 function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: curLat, lng: curLng},
	  zoom: 15
	});
	var infoWindow = new google.maps.InfoWindow({map: map});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	  curLat = position.coords.latitude;
	  curLng = position.coords.longitude;
	  
		var pos = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
		};



		infoWindow.setPosition(pos);
		infoWindow.setContent('You are here');
		map.setCenter(pos);
		
		
		
		var type = getParameterByName('type');
		if (type != null)
		{
			var request = {
				location: new google.maps.LatLng(curLat,curLng),
				radius: '500',
				type: [type]
			};
		
			service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request, callback);
		}
	  }, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}
	
	// Create the search box and link it to the UI element.
    var input = document.getElementById("inputBox");
    var searchBox = new google.maps.places.SearchBox(input);
	// Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function() {
    	searchBox.setBounds(map.getBounds());
    });
	
	var markers = [];
	
	// Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", function() {
    	var places = searchBox.getPlaces();
		if (places.length == 0) { return; }
		
		markers.forEach(function(marker) {
            marker.setMap(null);
          });
	    markers = [];
		  
	    // For each place, get the icon, name and location.
	    var bounds = new google.maps.LatLngBounds();
	    places.forEach(function(place) {
	    	if (!place.geometry) { console.log("Returned place contains no geometry"); return; }

		    var myloc = String(place.geometry.location);
		    var myloc2 = (myloc.slice(1,myloc.length-1)).replace(" ","");
		    curLat = myloc2.split(",")[0];
		    curLng = myloc2.split(",")[1];
			
			var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
			
			// Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
			
			
	  	});
	    map.fitBounds(bounds); 
		
		var type = getParameterByName('type');
		if (type != null)
		{
			var request = {
				location: new google.maps.LatLng(curLat,curLng),
				radius: '500',
				type: [type]
			};
		
			service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request, callback);
		}
	});
	
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {

    loc_markers.forEach(function(marker) {
            marker.setMap(null);
          });
	loc_markers = [];
	
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      addMarker(results[i], map);
    }
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
}

function addMarker(results, map) {
	// Add the marker at the clicked location, and add the next-available label
	// from the array of alphabetical characters.
	loc_markers.push(new google.maps.Marker({
	  position: results.geometry.location,
	  label: results.name,
	  map: map
	}));
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


