



var gamepattern=[];
var colorsequence=["red", "blue", "green", "yellow"];
//
//userchosen color;
var userchosencolor=[];
var level=0;
var started=false;
var b=-1;
$(document).on("keypress",function(){
      
    if(!started) {
      b=1;
      $("h1").text("level "+level);
      started=true;
      newsequence();
    }
      
});

$(".btn").click(function(){
 var userclick= $(this).attr("id");
userchosencolor.push(userclick);
playsound(userclick);
animate(userclick);
checkAnswer(userchosencolor.length);
})


// create game sequence
function newsequence(){
      userchosencolor=[];
level++;
$("h1").text("level "+level);
var n= Math.floor(Math.random() *4);
var randomcolorsequence = colorsequence[n];
gamepattern.push(randomcolorsequence);
//button animation on random chosen sequence
$("#"+randomcolorsequence).fadeIn(100).fadeOut(100).fadeIn(100);
//buttonsound
playsound(randomcolorsequence);
}


//button animation
function animate(userclick){
$("#"+userclick).on("click",function(){
$("#"+userclick).addClass("pressed");
playsound(userclick);
setTimeout(function() { 
      $("#"+userclick).removeClass("pressed")
},100);

});
}

//sondplayfunction
function playsound(name){
      var audio=new Audio("/"+name+".mp3");
      audio.play();
      
}
//check answer
function checkAnswer(length1){
      if(gamepattern[length1-1]===userchosencolor[length1-1]){
            
      if(gamepattern.length===userchosencolor.length){
  setTimeout(function(){
 newsequence();
  }),1000
      }
}else{
        if(b===1){
            gameover();
        }
      }
}

function gameover(){
      b=-1;
      var audio=new Audio("/wrong.mp3");
      audio.play(); 
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startover();
}
function startover(){
      started=false;
      level=0;
      gamepattern=[];
}

