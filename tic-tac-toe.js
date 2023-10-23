document.addEventListener('DOMContentLoaded', function() {
    var board = document.getElementById('board');
    var squares = board.getElementsByTagName('div');

    for (var i = 0; i < squares.length; i++) {
        squares[i].classList.add('square');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var squares = document.querySelectorAll('#board div');
    var currentPlayer = 'X';
    var gameState = ['', '', '', '', '', '', '', '', ''];

    squares.forEach(function(square) {
        square.addEventListener('mouseenter', handleHover);
        square.addEventListener('mouseleave', handleHover);

        function handleHover() {
            if (gameState[this.dataset.index] === '') {
                this.classList.toggle('hover'); // Toggle hover class for styling
            }
        }

        square.addEventListener('click', function() {
            if (gameState[this.dataset.index] === '') {
                gameState[this.dataset.index] = currentPlayer;
                this.classList.remove('hover'); // Remove hover class when square is clicked
                this.classList.add(currentPlayer);
                this.innerHTML = currentPlayer;

                var winner = checkforWinner();
                if (winner) {
                    var status = document.getElementById('status');
                    status.classList.add('you-won');
                    status.innerHTML = (winner != 'Draw') ? `Congratulations! ${winner} is the Winner!` : `Congratulations it's  a ${winner} `;
                }

                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            }
        });

        square.dataset.index = Array.from(squares).indexOf(square);
    });

    function checkforWinner() {
        var winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        let i = 0;
        while (i < winningCombos.length) {
            const [a, b, c] = winningCombos[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
            i++;
        }

        return gameState.includes('') ? null : 'Draw';
    }
    
    var newGameButton = document.querySelector('.btn');
    newGameButton.addEventListener('click', function() {
        // Reset game state
        squares.forEach(function(square) {
            square.classList.remove('X', 'O');
            square.textContent = '';
        });

        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';

        var status = document.getElementById('status');
        status.classList.remove('you-won');
        status.innerHTML = 'Move your mouse over a square and click to play an X or an O.';
    });
});
