/**
 * Created by naveen on 26/9/17.
 */
/*
 GAME RULES:

 - The game has 2 players, playing in rounds
 - In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
 - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
 - The first player to reach 100 points on GLOBAL score wins the game

 */

var scores, roundScore, activePlayer, gamePlaying, previousDice;

function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.final-score').value = '';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

init();

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-roll').addEventListener('click', buttonRoll);
document.querySelector('.btn-hold').addEventListener('click', buttonHold);

function buttonRoll() {
    var dice;
    if (gamePlaying) {
        dice = Math.floor(Math.random() * 6 + 1);
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        // When dice is not 1 increment round score.
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        // If rolled one make round score as zero and change the player and hide the dice.
        else {
            nextPlayer();
        }
    }
}

function buttonHold() {
    // Add round score to global score and change player.
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var finalScore = document.querySelector('.final-score').value;
        finalScore === '' ? finalScore = 100 : finalScore;

        if (scores[activePlayer] >= finalScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
}

function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(('.player-' + activePlayer + '-panel')).classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';

}

function showRules() {
    // Get the modal
    console.log('Im called');
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
// Get the <span> element that closes the modal
    var span = document.querySelector('.close');

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}