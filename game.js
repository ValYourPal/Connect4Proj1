//initial empty board
gameState = [...Array(6)].map(() => Array(7).fill(0))
//holds which player's turn it is
playerSelected = 1
//after a click, playerSelected alternates to the other player
function playerClick(e){ 
  const column = e.path[0].cellIndex
  //gravity
  let row = gameState.length - 1
  while(row > 0 && gameState[row][column]) {
    row--
  }
  //here's the alternating
  if (!gameState[row][column]) {
    gameState[row][column] = playerSelected
    playerSelected = playerSelected == 1 ? 2 : 1
  }

  checkForWinner(row, column)
  if (checkForWinner(row, column)) {
    alert(`Player ${gameState[row][column]} won!`)
    //initial empty board
    gameState = [...Array(6)].map(() => Array(7).fill(0))
    //holds which player's turn it is
    playerSelected = 1
  }
  generateBoard()
}

//checks for 4 in a row throughout the board
function checkForWinner(row, column){
  let lastPlayer = gameState[row][column]
  let win = false;

  let count = 0
  // count horizontal
  if (column - 1 >= 0 && (gameState[row][column - 1 ] === lastPlayer)) {}//do it again
  // win = win || count > 3 ?
  // console.log(row, column)

  // count horizontally
  // to left
  for(let i = column - 1; i >= 0; i--) {

    if (gameState[row][i] === lastPlayer) {
      count++
    } else {break}

  }
  //to right
  for(let i = column + 1; i < gameState[row].length; i++) {

  // count diagonal
    if (gameState[row][i] === lastPlayer) {
      count++
    } else {break}

  }

  if (count >= 3) {
    return true
  }

  // count vertical
  count = 0;

  //checking vertically
  //checking above
  for(let i = row - 1; i >= 0; i--) {
    if (gameState[i][column] === lastPlayer) {
      count++
    } else {break}

  }
  //below
  for(let i = row + 1; i < gameState.length; i++) {

    if (gameState[i][column] === lastPlayer) {
      count++
    } else {break}

  }

  if (count >= 3) {
    return true
  }

  count = 0;

  //check diagonal
  //upper left 
  for(let i = 1; Math.min(row,column) - i >= 0; i++) {
    if (gameState[row - i][column - i] === lastPlayer) {
      count++
    } else {break}

  }
  //lower right
  for(let i = 1; (row + i < gameState.length) && (column + i < gameState[0].length); i++) {
    if (gameState[row + i][column + i] === lastPlayer) {
      count++
    } else {break}

  }

  if (count >= 3) {
    return true
  }

  count = 0

  //upper right
  for(let i = 1; (row - i >= 0) && (column + i < gameState[0].length); i++) {
    if (gameState[row - i][column + i] === lastPlayer) {
      count++
    } else {break}

  }
  //lower left
  for(let i = 1; (row + i < gameState.length) && (column - i >= 0); i++) {
    if (gameState[row + i][column - i] === lastPlayer) {
      count++
    } else {break}

  }

  if (count >= 3) {
    return true
  }

  // count counter-diagonal

  if (win) alert("winner")
}

//UI
function generateBoard(){
  //identifies who's turn it is
  document.querySelector("h2").innerText = `Player ${playerSelected}'s turn`
  const table = document.querySelector("table")
  table.innerHTML = ''
  for(let gameRow of gameState) {
    const row = table.insertRow()
    //inserting individual cells and giving player info to show the corresponding color
    for(let gameCell of gameRow) {
      const cell = row.insertCell()
      cell.className = `player${gameCell}`
      cell.id = `player${gameCell}`
      cell.onclick = playerClick
    }
  }
}

window.onload = generateBoard
