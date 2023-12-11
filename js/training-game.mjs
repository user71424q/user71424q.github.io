import {Level1} from './level1.mjs';
import {Level2} from './level2.mjs';
import {Level3} from './level3.mjs';


const level = localStorage.getItem('training-level');
const difficulty = +(localStorage.getItem('training-difficulty'));

const levels = [new Level1(difficulty), new Level2(difficulty), new Level3(difficulty)];

levels[parseInt(level) - 1].display();


document.addEventListener('nextLevel', function () {
    window.location.href = '../index.html';
});