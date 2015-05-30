var state = {
  items: []
};
var ls = localStorage.getItem('game');
if (ls) {
  state = JSON.parse(ls);
}

window.addEventListener('load', function () {
  var bodyTag = document.querySelector('body');
  var gameField = document.querySelector('.field');
  var errorDiv = document.querySelector('.error-message');
  var buttonGenField = document.querySelector('.generateField');
  var inputCount = document.querySelector('.count');
  var mainGameField = document.querySelector('.mainGame');
  var startGameField = document.querySelector('.startGame');
  var startGameButton = document.querySelector('.startNewGame');
  var winMess = document.querySelector('.winner-message');
  var res;
  var hod;

// Функция сохранения состояния
  function updateLS(){
    var c;
    var cellArr = [];
    var cells = document.querySelectorAll('.cell');
    for (c = 0; c < cells.length; c++){
      if (cells[c].classList.contains('x')) {
        cellArr[c] = 'x';
      } else if (cells[c].classList.contains('o')){
        cellArr[c] = 'o';
      } else{
        cellArr[c] = '';
      }

    }
    state.items = cellArr;
    localStorage.setItem('game', JSON.stringify(state));


  }

//  Функция анализа кликов по игровому полю
  function clicker(event) {
    var winner;
    // console.log(event.target.classList);
    startGameField.style.display = 'none';
    if (event.target.classList.contains('cell')) {
      if (!event.target.classList.contains('x') && !event.target.classList.contains('o')) {
        if (hod % 2 === 0) {
          event.target.classList.add('x');
        } else {
          event.target.classList.add('o');
        }
        hod++;
        winner = getWinner();

        if (winner) {
          if (winner === 'x') document.querySelector('.winner-message').innerHTML = 'Крестик победил';
          if (winner === 'o') document.querySelector('.winner-message').innerHTML = 'Нолик победил';
          winMess.style.display = 'block';
          gameField.removeEventListener('click', clicker);
        // ?  state.items = [];
        }
      }
    }
    updateLS();
  }

// Функция проверки является ли число десятичным
  function isDec(d) {
    if (d.length > 1 && Number(d[0]) !== 0 || d.length === 1) {
      res = true;
    } else res = false;
    return res;
  }
// Функция проверки кооректности введенного числа
  function currentNumber(n){
      return ( !isNaN(parseInt(n)) && isFinite(n) && isDec(n) && parseInt(n) >= 5 && parseInt(n) <= 15);
    }

// Нажатие кнопки "Новая игра"
  var startGame = function () {

    //var rows;
    var dr;
    var dc;
    hod = 0;
    // Удалить ячейки
    winMess.style.display = 'none';
    //rows = document.querySelectorAll('.row');
    while (gameField.firstChild){
      gameField.removeChild(gameField.firstChild)
    }
    gameField.innerText = '';

    startGameField.style.display = 'block';
    startGameButton.style.display = 'none';
    gameField.addEventListener('click', clicker);
    updateLS();
  };

// Функция создания поля
  function createField(){
    var numberFields = inputCount.value;
    var r;
    var t;
    var newRow;
    var newCell;
    winMess.style.display = 'none';
    if (!currentNumber(numberFields)){
        errorDiv.innerText = 'Вы ввели некорректное число';
    }
    else{
      errorDiv.innerText = '';
      mainGameField.style.display = 'inline-block';
      for (r = 0; r < numberFields; r++){
        newRow = document.createElement('div');
        newRow.classList.add('row');
        gameField.appendChild(newRow);
        for (t =0; t < numberFields; t++){
          newCell = document.createElement('div');
          newCell.classList.add('cell');
          newRow.appendChild(newCell);
        }
        startGameField.style.display = 'none';
        hod = 0;
      }
      startGameButton.style.display = 'block';
      startGameButton.addEventListener('click', startGame);
      gameField.addEventListener('click', clicker);
    }
    // Восстановление состояния



  updateLS();

  }
  function restoreGame() {
    var nc;
    var nr;
    var numberCells = state.items.length;
    var nuberRows = Math.sqrt(numberCells);
    var rows;
    var createRow;
    var createCell;
    hod = 0;
    errorDiv.innerText = '';
    mainGameField.style.display = 'inline-block';

    startGameButton.style.display = 'block';
    startGameField.style.display = 'none';
    winMess.style.display = 'none';

    for (nr = 0; nr < nuberRows; nr++) {
      createRow = document.createElement('div');
      createRow.classList.add('row');
      gameField.appendChild(createRow);
    }
    rows = document.querySelectorAll('.row');
    for (nc = 0; nc < numberCells; nc++){
      createCell = document.createElement('div');
      createCell.classList.add('cell');
      if (state.items[nc] === 'x'){
        createCell.classList.add('x');
        hod++;
      }
      if (state.items[nc] === 'o'){
        createCell.classList.add('o');
        hod++;
      }

      rows[(Math.floor(nc/nuberRows))].appendChild(createCell);
    }
    startGameButton.style.display = 'block';
    startGameButton.addEventListener('click', startGame);
    gameField.addEventListener('click', clicker);

  }
  console.log('tut');
  //startGameField.style.display = 'block';
  if (state.items.length>5){
    restoreGame();
  }
 // else {

    buttonGenField.addEventListener('click', createField);

 // }

});
