// JavaScript Document

$(".jumbotron").click(function(){
  console.log("start clicked");
  timer = setInterval(game.countdown, 1000);
  $("#info").prepend('<h2>Time Remaining: <span id="counter"></span></h2>')
  $(".jumbotron").remove();
  for(var i=0; i<questions.length; i++){
    $("#trivia").append("<h2>" + questions[i].quesiton  + "</h2>");
    for (var j=0; j<questions[i].answers.length; j++) {
      $("#trivia").append("<input type='radio' name='question- "+i+"' value='"+questions[i].answers[j]+"'> " +questions[i].answers[j]+'</input>');
    };//second for loop
  };//first for loop *confimmed
});//click event *confimmed

var questions = [{
  quesiton:"How many seeds does one stawberry have?",
  answers:["200 ","201 ","202 ","101 Dailmations "],
  correctAnswer:"a"
},{
  quesiton:"What color is a Hippo's sweat?",
  answers:["Chartroose ","Red ","Blood Red ","Clear "],
  correctAnswer:"b"
},{
  quesiton:"Which are you most likely to die from?",
  answers:["Sharks ","Tornados ","Toilet ","SharkNados "],
  correctAnswer:"c"
},{
  quesiton:"What trees stay green all year round?",
  answers:["Conofurs ","Seagreen ","Forevergreen ","Evergreen "],
  correctAnswer:"d"
}];


var game = {
    correct: 0,
    incorrect: 0,
    counter: 120,
	unanswered: 0,
    countdown: function(){
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter <= 0) {
        game.done();
      	}},
    
	done: function(){
		console.log("Time's up, hommie");
        for (var i = 0; i < questions.length; i++) {
          var userAnswer = $("input[name='question- "+i+"']:checked").val();
		  console.log(userAnswer);
          if (userAnswer === questions[i].correctAnswer) {
            game.correct++;
          } else if(!userAnswer) {
			  game.unanswered++;
		  }
			else {
            game.incorrect++;
          }
			
        }
			// $.each($("input[name='question-0']:checked"), function() {
			//   if($(this).val()==questions[0].correctAnswer) {
			//     game.correct++;
			//   } else {
			//     game.incorrect++;
			//   }
			// });
			// $.each($("input[name='question-1']:checked"), function() {
			//   if($(this).val()==questions[1].correctAnswer) {
			//     game.correct++;
			//   } else {
			//     game.incorrect++;
			//   }
			// });
			// $.each($("input[name='question-2']:checked"), function() {
			//   if($(this).val()==questions[2].correctAnswer) {
			//     game.correct++;
			//   } else {
			//     game.incorrect++;
			//   }
			// });
			// $.each($("input[name='question-3']:checked"), function() {
			//   if($(this).val()==questions[3].correctAnswer) {
			//     game.correct++;
			//   } else {
			//     game.incorrect++;
			//   }
			// });
			this.result();
		  },

    result: function () { 
        clearInterval(timer);
        $("#info").remove();
        $("#extra").html("All Done.");
        $("#extra").append("<h3>Right Answers: " +this.correct+ "</h3>");
        $("#extra").append("<h3>Wrong Answers: " +this.incorrect+ "</h3>");
        $("#extra").append("<h3>Unanswered Answers: " +this.unanswered+ "</h3>");// not working
		console.log("What's the Score?");
      }

  };
