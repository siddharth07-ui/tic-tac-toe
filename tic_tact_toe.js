// Restart Game Button
var restart = document.querySelector('#b');

// Grab all the squares
var squares = document.querySelectorAll("td");

players = ['X', 'O'];

const tiles = document.querySelectorAll('td');

// Get random player from players array
let currentPlayer = players[Math.floor(Math.random() * players.length)];
console.log(currentPlayer + " plays first");

win_message = document.querySelector('#win_message');
win_message.textContent = currentPlayer + " plays first";

// Clear Squares Function
function clearBoard() {
  for (var i = 0; i < squares.length; i++) {
      squares[i].textContent = '';
  }
  win_message.textContent = '';
  tiles.forEach(tile => tile.addEventListener('click', changeMarker));
  restart.disabled = true;
  win_message.textContent = currentPlayer + " plays first";
}
restart.addEventListener('click',clearBoard)

// Create a function to check the square marker. If the square marker is === "", change it to currentPlayer.
// For the next marker, square marker will be set to the next player.
// Also if player has moved to next square, he/she can not change the previous square

function changeMarker() {
  if (this.textContent === '') {
    this.textContent = currentPlayer;
    // Change currentPlayer to the next player
    currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
    win_message.textContent = currentPlayer + " plays now";
  }
  if (checkWinner()) {
    // Do something if checkWinner returns true
    // Remove event listeners from all tiles
    tiles.forEach(tile => tile.removeEventListener('click', changeMarker));
    win_message.textContent = this.textContent + " is the winner";
    restart.disabled = false;
  }

  let allFilled = false
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      allFilled = false;
      break;
    } else {
      allFilled = true;
    }
  }
  if (allFilled) {
    win_message.textContent = "It's a tie!";
    restart.disabled = false;
  }
}

function getRandomColor(){
  var letters = "0123456789ABCDEF";
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random()*16)];
  }
  return color
}

// Simple function for clarity
function changeHeaderColor(){
  colorInput = getRandomColor()
  win_message.style.color = colorInput;
}

// Now perform the action over intervals (milliseocnds):
setInterval("changeHeaderColor()",500);

// Use a for loop to add Event listeners to all the squares
for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', changeMarker);
}

function checkWinner() {
  // Check for rows
  for (let i = 0; i < 3; i++) {
    if (tiles[i * 3].textContent === tiles[i * 3 + 1].textContent && tiles[i * 3 + 1].textContent === tiles[i * 3 + 2].textContent && tiles[i * 3].textContent !== '') {
      return true;
    }
  }

  // Check for columns
  for (let i = 0; i < 3; i++) {
    if (tiles[i].textContent === tiles[i + 3].textContent && tiles[i + 3].textContent === tiles[i + 6].textContent && tiles[i].textContent !== '') {
      return true;
    }
  }

  // Check for diagonals
  if (tiles[0].textContent === tiles[4].textContent && tiles[4].textContent === tiles[8].textContent && tiles[0].textContent !== '') {
    return true;
  }

  if (tiles[2].textContent === tiles[4].textContent && tiles[4].textContent === tiles[6].textContent && tiles[2].textContent !== '') {
    return true;
  }

  // No winner
  return false;
}