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

/*
 YOUR 3 CHALLENGES
 Change the game to follow these rules:

 1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
 2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
 3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
 */

var scores, roundScore, activePlayer, gamePlaying, previousDice;

function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    // challenge 1
    // previousDice = 0;

    // Challenge 2
    document.querySelector('.final-score').value = '';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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
    var dice1, dice2;
    if (gamePlaying) {
        dice1 = Math.floor(Math.random() * 6 + 1);
        dice2 = Math.floor(Math.random() * 6 + 1);
        document.querySelector('.dice-1').style.display = 'block';
        document.querySelector('.dice-1').src = 'dice-' + dice1 + '.png';
        document.querySelector('.dice-2').style.display = 'block';
        document.querySelector('.dice-2').src = 'dice-' + dice2 + '.png';

        // Challenge 1
        /*
         if (previousDice === 6 && dice === 6) {
         scores[activePlayer] = 0;
         document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
         nextPlayer();
         }
         */
        // When dice is not 1 increment round score.
        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            // previousDice = dice;
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
            document.querySelector('.dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
}

function nextPlayer() {
    // previousDice = 0;
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}
