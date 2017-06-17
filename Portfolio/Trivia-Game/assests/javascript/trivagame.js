// JavaScript Document

$("button").click(function(){
  console.log("start clicked");
  timer = setInterval(game.countdown, 1000);
  $("#info").prepend('<h2>Time Remaining: <span id="counter"></span></h2>')
  $("button").remove();
  for(var i=0; i<questions.length; i++){
    $("#trivia").append("<h2>" + questions[i].quesiton  + "</h2>");
    for (var j=0; j<questions[i].answers.length; j++) {
      $("#trivia").append("<input type='radio' name='question- "+i+"' value='"+questions[i].answers[j]+"'> " +questions[i].answers[j]+'</input>');
    };//second for loop
  };//first for loop *confimmed
});//click event *confimmed

var questions = [{
  quesiton:"test One?",
  answers:["a","b","c","d"],
  correctAnswer:"a"
},{
  quesiton:"test Two?",
  answers:["a","b","c","d"],
  correctAnswer:"b"
},{
  quesiton:"test Three?",
  answers:["a","b","c","d"],
  correctAnswer:"c"
},{
  quesiton:"test Four?",
  answers:["a","b","c","d"],
  correctAnswer:"d"
}];


var game = {
    correct: 0,
    incorrect: 0,
    counter: 10,
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
