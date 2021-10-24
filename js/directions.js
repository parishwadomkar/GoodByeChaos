console.info('directions.js loaded');

const directionsInfo = document.querySelector('#directions-info');
const directionsButton = document.querySelector('#get-directions');
directionsButton.addEventListener('click', getLocation);
let directionsService;
let directionsDisplay;

function getLocation(){
	navigator.getLocation.getCurrentPosition(function(position){
		directionsInfo.innerHTML = "You appear to be at: ${position.coords.latitude}, ${position.coords.longitude}"
		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		initMap(pos);
	});
}


function initMap(location){
	directionsMap = new google.maps.Map(document.querySelector('#directions-map'), {
		center: location,
		zoom: 12
	});

	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(directionsMap);
	let destination = new google.maps.LatLng(59.3315303,18.0520829);

	calcRoute(location,destination);

}

function calcRoute(start, destination){
	let request = {
		origin: start,
		destination: destination,
		travelmode: google.maps.TravelMode.DRIVING  //
	};
	directionsService.route(request, function(response, status){
		if(status='OK'){
			directionsDisplay.setDirections(response);
			let starter = new google.maps.Marker({
				position: start,
				map: directionsMap,
				label: 'You are here'
			});
			let marker = new google.maps.Marker({ 
				position: destination,
				map: directionsMap,
				label: 'You need to reach here..'
			});
		}
	})
}