document.addEventListener('DOMContentLoaded', function() {
    var board = document.getElementById('board');
    var squares = board.getElementsByTagName('div');

    for (var i = 0; i < squares.length; i++) {
        squares[i].classList.add('square');
    }
});

