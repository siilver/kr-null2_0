window.addEventListener('load', function () {
  var bodyTag = document.querySelector('body');
  var gameField = document.querySelector('.field');
  var errorDiv = document.querySelector('.error-message');
  var buttonGenField = document.querySelector('.generateField');
  var inputCount = document.querySelector('.count');
  var mainGameField = document.querySelector('.mainGame');
  var startGameField = document.querySelector('.startGame');
  var startGameButton = document.querySelector('.startNewGame')
  var res;
  var hod;
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

    var rows;
    var dr;
    var dc;
    hod = 0;
    // Удалить ячейки
    rows = document.querySelectorAll('.row');
    while (gameField.firstChild){
      gameField.removeChild(gameField.firstChild)
    }
    gameField.innerText = '';

    startGameField.style.display = 'block';
    startGameButton.style.display = 'none';

  };

// Функция создания поля
  function createField(){
    var numberFields = inputCount.value;
    var r;
    var t;
    var newRow;
    var newCell;
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
    }


  }
//  Функция анализа кликов по игровому полю
  function clicker(event) {
    var winner;
    // console.log(event.target.classList);
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
          gameField.removeEventListener('click', clicker);
        }
      }
    }
  }

  buttonGenField.addEventListener('click', createField);
  gameField.addEventListener('click', clicker);

  //Ваш код будет здесь
});