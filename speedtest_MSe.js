"use strict";

// assign button elements in the array
var buttons = [
  document.getElementById('button0'),
  document.getElementById('button1'),
  document.getElementById('button2'),
  document.getElementById('button3')
];

// click event handlers for buttons
buttons[0].onclick = function() { pressed(0) };
buttons[1].onclick = function() { pressed(1) };
buttons[2].onclick = function() { pressed(2) };
buttons[3].onclick = function() { pressed(3) };

// current active button
var current = 0;
//current amount of right guesses + empty array for storing the machine_selections
var tulos = 0;
var nappijono = [];

// pick the first active button in 1500ms, after that every 1000ms
// 1500 is a parameter for setTimeout, 1000 is a parameter for pickNext
var timer = setTimeout(pickNext, 1500, 1000);

// function to keep the engine going: pick a new button and set timer for the next pick
function pickNext(delay) {
  // pick next button
  var next = pickNew(current);

  // update the colours of the buttons: restore the previous active to black, the next one red
  buttons[current].style.backgroundColor = "black"; // previous
  if (next == 0){
    buttons[next].style.backgroundColor = "red";
  } else if (next == 1){
    buttons[next].style.backgroundColor = "blue";
  }else if (next == 2){
    buttons[next].style.backgroundColor = "green";
  }else {
    buttons[next].style.backgroundColor = "yellow";
  }

  //store the machine-selected buttons to an array, max 10 values
  if (nappijono.length < 10) {
    nappijono.push(next);
  } else {
    gameOver();
  }

  //check if User selection was correct:
  function comparewithUser() {
    if(buttons[0].pressed == true) {
      // respond to button being pressed
    }
  }

  // change the active button
  current = next;

  // set timer to pick the next button
  console.log("Active:", current);
  timer = setTimeout(pickNext, delay, delay*0.96);
}

//pick the next button to highlight:
//the same button should not be activated consecutively
function pickNew(previous) {
  var next = (Math.floor(Math.random() * 4));
  if (next != previous) {
    return next;
  } else {
    return pickNew(previous);
  }
}

// This function is called whenever a button is pressed
function pressed(i) {
  console.log("Pressed:", i);
  if (nappijono[0] == i) {
    tulos++;
    document.getElementById("score").innerHTML = tulos;
    nappijono.shift();
  } else {
    gameOver();
  }
}

// Function to call at game over
function gameOver() {
  clearTimeout(timer); // stop timer
  for (var i = 0; i < 4; i++) {
    buttons[i].style.backgroundColor = "white"; // set all buttons red
    buttons[i].onclick = null; // disable click event handlers
  }
  // show score
  document.getElementById("score").innerHTML = tulos;
  // Set the overlay-element visible and update the gameover-element
  document.getElementById("overlay").style.visibility = "visible";
  document.getElementById("gameover").innerHTML = "GAME OVER!";
}
