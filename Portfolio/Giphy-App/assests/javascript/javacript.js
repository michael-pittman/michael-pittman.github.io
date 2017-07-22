// JavaScript Document

$( document ).ready(function() {
  console.log("test one");
	
		
      // Initial array of gifs
      var gifs = ["Pulp Fiction", "Reservoir Dogs", "Jackie Brown", "Kill Bill"];
      // displaygifInfo function re-renders the HTML to display the appropriate content
      function displaygifInfo() {
        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=18d5fba58469425887775f39abefe902&limit=5";
        // Creates AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
			console.log(response);
			var results = response.data;
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var gifDiv = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var gifImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", results[i].images.fixed_width_still.url);
			gifImage.attr("data-state", "still");
			gifImage.attr("data-gif", results[i].images.fixed_width.url);
			
            // Appending the paragraph and image tag to the gifDiv
            gifDiv.append(p);
            gifDiv.append(gifImage);
			gifDiv.addClass("stopped");
            // Prependng the gifDiv to the HTML page in the div
            $("#gifs-view").prepend(gifDiv);}
			
			//stop and go: currently not working
				$(".stopped").on("click", function() {
				console.log("clicked img");
				var state = $(this).attr("data-state");
				if (state === "still") {
				$(this).attr("src", $(this).attr("data-gif"));
				$(this).attr("data-state", "animate");
				} else {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
				}
				});
			
        });
      }
	
      // Function for displaying gif data
      function renderButtons() {
        // Deletes the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of gifs
        for (var i = 0; i < gifs.length; i++) {
        
          var a = $("<button>");
          // Adds a class of gif to our button
          a.addClass("gif");
          // Added a data-attribute
          a.attr("data-name", gifs[i]);
          // Provided the initial button text
          a.text(gifs[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      // This function handles events when the add gif button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var gif = $("#gif-input").val().trim();
        // The gif from the textbox is then added to our array
        gifs.push(gif);
        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
        $("#gif-input").val('');
      });
      // Adding click event listeners to all elements with a class of "gif"
      $(document).on("click", ".gif", displaygifInfo);
		
      
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
	
});