//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
var player = $('.player').text();
var tableLength = 10;
console.log(player);

var player_positions = $('#player_positions').text().split(" ");
var positions = [];
for (var i = 0; i < player_positions.length - 1; i++) {
  var coordinates = player_positions[i].split("");
  var position = { x: coordinates[0], y: coordinates[1]};
  positions.push(position);
}

var player_1_hits = $('#player_1_hits').text().split(" ");
var player_1_hits_positions = [];
for (var i = 0; i < player_1_hits.length - 1; i++) {
  var coordinates = player_1_hits[i].split("");
  var position = { x: coordinates[0], y: coordinates[1]};
  player_1_hits_positions.push(position);
}

var player_1_misses = $('#player_1_misses').text().split(" ");
var player_1_miss_positions = [];
for (var i = 0; i < player_1_misses.length - 1; i++) {
  var coordinates = player_1_misses[i].split("");
  var position = { x: coordinates[0], y: coordinates[1]};
  player_1_miss_positions.push(position);
}

var player_2_hits = $('#player_2_hits').text().split(" ");
var player_2_hits_positions = [];
for (var i = 0; i < player_2_hits.length - 1; i++) {
  var coordinates = player_2_hits[i].split("");
  var position = { x: coordinates[0], y: coordinates[1]};
  player_2_hits_positions.push(position);
}

var player_2_misses = $('#player_2_misses').text().split(" ");
var player_2_miss_positions = [];
for (var i = 0; i < player_2_misses.length - 1; i++) {
  var coordinates = player_2_misses[i].split("");
  var position = { x: coordinates[0], y: coordinates[1]};
  player_2_miss_positions.push(position);
}
console.log(player_2_miss_positions);

var createGrid = function() {
  var grid = "<table>"
  for (var row = 0; row < tableLength; row++) {
    grid += '<tr>';
    for (var col = 0; col < tableLength; col++) {
      grid += '<td class="cell" data-x=' + col + ' data-y=' + row + '></td>';
    }
    grid += '</tr>';
  }
  grid += '</table>';
  return grid;
}
$('#opponent_board').append(createGrid());
$("#player_board").append(createGrid());

for (var i = 0; i < positions.length; i++) {
  $('#player_board td[data-x=' + positions[i].x + '][data-y=' + positions[i].y + ']').addClass('ship');
}



var player1Board;
var player2Board;
if (player === 'Player 1') {
  player1Board = '#player_board';
  player2Board = '#opponent_board';
} else {
  player1Board = '#opponent_board';
  player2Board = '#player_board';
}

for (var i = 0; i < player_1_hits_positions.length; i++) {
  $(player2Board + ' td[data-x=' + player_1_hits_positions[i].x + '][data-y=' + player_1_hits_positions[i].y + ']').addClass('hit');
}

for (var i = 0; i < player_1_miss_positions.length; i++) {
  $(player2Board + ' td[data-x=' + player_1_miss_positions[i].x + '][data-y=' + player_1_miss_positions[i].y + ']').addClass('miss');
}

for (var i = 0; i < player_2_hits_positions.length; i++) {
  $(player1Board + ' td[data-x=' + player_2_hits_positions[i].x + '][data-y=' + player_2_hits_positions[i].y + ']').addClass('hit');
}

for (var i = 0; i < player_2_miss_positions.length; i++) {
  $(player1Board + ' td[data-x=' + player_2_miss_positions[i].x + '][data-y=' + player_2_miss_positions[i].y + ']').addClass('miss');
}

$("#opponent_board .cell").on('click', function(e){
  var cell = this;
  var gameId = $('#player_board').attr('class');
  var cell_position = this.dataset.x + this.dataset.y
  $.ajax({
    url: "/games/" + gameId + "/check?cell_position=" + cell_position,
    type: "GET"
  }).done(function(data){
    $(cell).off();
    if (data.response === "hit"){
      $(cell).addClass('hit');
    } else if (data.response === "miss") {
      $(cell).addClass('miss');
    } else {
      console.log(data.response);
    }
    window.location.reload();
  })
})

})
