var targetNumber = Math.floor((Math.random() * 120) + 1);


  $("#number-to-guess").text(targetNumber);

  var counter = 0;
  var wins = 0;
  var lost = 0;
  var numberOptions = [1, 5, 12, 7];

  for (var i = 0; i < numberOptions.length; i++) {
    var imageCrystal = $("<img>");
    imageCrystal.addClass("crystal-image");
	  imageCrystal.addClass("img-thumbnail");
    imageCrystal.attr("src", "https://vignette3.wikia.nocookie.net/steven-universe/images/f/f0/Steven_Shield_WD.png/revision/latest?cb=20160406110631");
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);
    $("#crystals").append(imageCrystal);
  }

  $(".crystal-image").on("click", function() {
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    counter += crystalValue;	  
	 $("#your-score").text(counter);
	  $("#wins").text(wins);
	  $("#lost").text(lost);

    if (counter === targetNumber) {
      alert("You win!");
		wins = ++wins;		
		targetNumber = Math.floor((Math.random() * 120) + 1);
		$("#number-to-guess").text(targetNumber);
		counter = 0;
    }

    else if (counter >= targetNumber) {
      alert("You lose!!");
		lost = ++lost;		
		targetNumber = Math.floor((Math.random() * 120) + 1);
		$("#number-to-guess").text(targetNumber);
		counter = 0;
    }

  });
