
var cityList = [];
var countryList = [];
var separation = [];
var selectedIndex;
var countrySearch;
var latitude
var longitude

function resetEntries() {
	$("#city-input").val("");
	$("#country-input").val("");
};

function resetResults() {
	$("#fahrenheit").html("");
	$("#celsius").html("");
	$("#cityResult").html("");
	$("#countryResult").html("");
};



//events ------------>
$(document).ready(function(){
	var firstLetters;
	var cityElements;
	var countryElements;

	$("#city-input").keyup(function() {
		cityList = [];
		countryList = [];
		separation = [];
		countrySearch = "";
		firstLetters = $(this).val().trim();
		var autocompleteURL = "https://autocomplete.wunderground.com/aq?&cb=call=?";

		$.ajax({
			url: autocompleteURL,
			dataType: "jsonp",
			data: {
				"query": firstLetters
			},
			crossDomain: true

		}).done(function(response) {
			$.each(response.RESULTS, function(i, element){
				cityElements = (response.RESULTS[i].name);
				countryElements = (response.RESULTS[i].c);
				cityList.push(cityElements);
				countryList.push(countryElements);
			});
			$("#city-input").autocomplete({
				source: cityList,
				appendTo: "#cityAutocomplete",
				select: function(event, ui){
					selectedIndex = $.inArray(ui.item.value,$("#city-input").autocomplete("option", "source"));
					separation = cityList[selectedIndex].split(",");
					console.log(separation);
					if (countryList[selectedIndex] === "US") {
						$("#country-input").val("United States");
						countrySearch = separation[1];
					} else {
						$("#country-input").val(separation[1]);
						countrySearch = countryList[selectedIndex];
					}
				}
			});
		});
	});
});

$("#add-entry").on("click", function(event) {
    event.preventDefault();
    resetResults();
    var apiKey = "b9907322a6922ec3"; /*Hernan's API Key*/
    var citySearch = separation[0];
  	var queryURL = "https://api.wunderground.com/api/" + apiKey + "/geolookup/conditions/q/" + countrySearch + "/" + citySearch + ".json";



	$.ajax({
	  	url : queryURL,
	  	method: "GET"
	}).done(function(response) {
		console.log(response);
		var city = response.location.city;
		var country = separation[1];
		var temp_f = response.current_observation.temp_f;
		var temp_c = response.current_observation.temp_c;
		var lat = response.location.lat;
		var lon = response.location.lon;
		var state_dept = response.location.country_name;
		$("#fahrenheit").append(temp_f + "F°");
		$("#celsius").append(temp_c + "C°");
		$("#cityResult").append(city);
		$("#countryResult").append(country);
		console.log(response);
		console.log(city);
		console.log(country);
		console.log(temp_f);
		console.log(temp_c);
		console.log(lat);
		console.log(lon);
		latitude = parseFloat(lat)
		longitude = parseFloat(lon)
		resetEntries();

		$("#map_script").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBoBixEgDuSpTPjepvL_RGMUlHUY0UlAgs&libraries=places&callback=initMap' async defer></script>")

// state department AJAX call is chained. uses location from first api ---------->

		$.ajax({
		  	url : "https://www.state.gov/api/v1/?command=get_country_fact_sheets&fields=title,title,terms&terms="+state_dept+":any,"+state_dept+":any"

		  }).done(function(response) {
				var state_dept_country = (response.country_fact_sheets [0].title)
				var state_dept_lower = state_dept_country.toLowerCase()
				var state_dept_url = 'https://travel.state.gov/content/passports/en/country/'+state_dept_lower+'.html'
				console.log(state_dept_url);

			$("#state_dept_link").attr("data_Url", state_dept_url);
			$("#click_here").attr("href", state_dept_url);

			});
	});
});
//maps ------------>

	var map;
  var infowindow;

  function initMap() {
    var pyrmont = {lat: latitude, lng: longitude};

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 1000,
      type: ['museum']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });


  }

$(function() {

	var config = {
	    apiKey: "AIzaSyCP7gyAk2MT2rY5JFD2i9b0WDHXbGUn7mQ",
    authDomain: "project1-1499294091466.firebaseapp.com",
    databaseURL: "https://project1-1499294091466.firebaseio.com",
    projectId: "project1-1499294091466",
    storageBucket: "project1-1499294091466.appspot.com",
    messagingSenderId: "258284106684"
	  };

	firebase.initializeApp(config);

  	var chatRef = firebase.database().ref();

  	$("#message-input").keypress(function (p) {
	    if (p.keyCode == 13) {
	      var name = $("#name-input").val();
	      var message = $("#message-input").val();
	      chatRef.push({name:name, message:message});
	      $("#message-input").val("");
	    }
	});

	chatRef.limitToLast(10).on("child_added", function (snapshot) {
	    var messagefire = snapshot.val();
	    var messageElement = $("<div/>").text(messagefire.name + ": " + messagefire.message);
	    messageElement.appendTo("#messagePost");
	});
});