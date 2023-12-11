import {Level1} from './level1.mjs';
import {Level2} from './level2.mjs';
import {Level3} from './level3.mjs';

const userName = localStorage.getItem('userName');
const difficulty = +(localStorage.getItem('difficulty'));
const levels = [new Level1(difficulty), new Level2(difficulty), new Level3(difficulty)];
let currentLevelIndex = 0;
function nextLevel() {
    if (currentLevelIndex < levels.length) {
        document.getElementById('game').innerHTML = '';
        document.getElementById('score').textContent = '0 очков';
        document.getElementById('level-timer').textContent = '0 сек';
        levels[currentLevelIndex].display();
        currentLevelIndex++;
        // Здесь может быть код для перехода на следующий уровень после завершения текущего
    }
    else {
        let totalScore = 0;
        for (let i = 0; i < levels.length; ++i)
            totalScore += levels[i].score;
        // Получение текущих данных рейтинга или инициализация пустым массивом
        const rankingData = JSON.parse(localStorage.getItem('playerRanking')) || [];

         // Поиск существующего игрока с таким же именем
        const existingPlayerIndex = rankingData.findIndex(player => player.username === userName && +(player.difficulty) === difficulty);

        if (existingPlayerIndex !== -1) {
            // Если игрок уже существует, обновляем его счет, если он выше текущего
            if (rankingData[existingPlayerIndex].totalscore < totalScore) {
                rankingData[existingPlayerIndex].score1 = levels[0].score;
                rankingData[existingPlayerIndex].score2 = levels[1].score;
                rankingData[existingPlayerIndex].score3 = levels[2].score;
                rankingData[existingPlayerIndex].totalscore = totalScore;
            }
        } else {
            // Если игрока нет, создаем новый объект и добавляем его в массив
            const newPlayer = {
                username: userName,
                score1: levels[0].score,
                score2: levels[1].score,
                score3: levels[2].score,
                totalscore: totalScore,
                difficulty: difficulty
            };
            rankingData.push(newPlayer);
        }

        // Сохранение обновленного массива в localStorage
        localStorage.setItem('playerRanking', JSON.stringify(rankingData));
        window.location.href = './rating.html';
    }
}

//localStorage.setItem('playerRanking', []);

document.addEventListener('DOMContentLoaded', nextLevel);

document.addEventListener('nextLevel', nextLevel);