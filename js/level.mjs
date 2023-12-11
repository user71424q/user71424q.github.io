
export class Level {
    constructor(difficulty) {
        this.difficulty = difficulty;
        this.score = 0; // Начальное количество баллов
        this.timeLeft = 0;
        if (this.constructor === Level) {
            throw new Error("Abstract class 'Level' cannot be instantiated directly");
        }
    }
    //
    runTimer(duration) {
        const timerElement = document.getElementById('level-timer');

        this.timeLeft = duration + 1;
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            timerElement.textContent = `${this.timeLeft} сек`;
            if (this.timeLeft <= 5) {
                timerElement.style.color = 'red';
            }
            if (this.timeLeft <= 0) {
                document.dispatchEvent(new Event('levelCompleted'));
            }
            
        }, 1000);
    }
    stopTimer() {
        clearInterval(this.timerInterval);
    }

    showScore() {
        function animateScore(endValue, scoreCounter, additionText) {
            let currentValue = 0;
        
            const interval = setInterval(() => {
                if (currentValue < endValue && endValue >= 0) {
                    currentValue++;
                    scoreCounter.textContent = additionText + ' ' + currentValue;
                }
                else if (currentValue > endValue && endValue < 0)
                {
                    currentValue--;
                    scoreCounter.textContent = additionText + ' ' + currentValue;
                }
                else {
                    clearInterval(interval);
                }
            }, 100); // Скорость анимации можно настроить
        };
        // Создание основного модального окна
        const modal = document.createElement('div');
        modal.classList.add('modal');

        // Создание контента модального окна
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.innerHTML = `
            <p id=score-counter>Ваш результат:${this.score-this.timeLeft}</p>
            <p id=bonus-counter>Бонус за время:${this.timeLeft}</p>
            <p id=total-counter>Итог:${this.score}</p>
            <button id="nextLevelButton">Продолжить</button>
        `;
        modal.appendChild(modalContent);
        

        // Добавление модального окна в DOM
        document.body.appendChild(modal);

        const scoreCounter = document.getElementById('score-counter');
        animateScore(this.score-this.timeLeft, scoreCounter, 'Ваш результат:');
        const bonusCounter = document.getElementById('bonus-counter');
        animateScore(this.timeLeft, bonusCounter, 'Бонус за время:');
        const totalCounter = document.getElementById('total-counter');
        animateScore(this.score, totalCounter, 'Итог:');
        // Закрытие модального окна при нажатии на кнопку "Продолжить"
        document.getElementById('nextLevelButton').addEventListener('click', () => {
            modal.remove();
            document.dispatchEvent(new Event('nextLevel'))
        }, {once: true});

        // Закрытие модального окна при клике вне контента
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.remove();
                document.dispatchEvent(new Event('nextLevel'))
            }
        }, {once: true});
    }

    showDescription(descriptionText) {
        // Создание основного модального окна
        const modal = document.createElement('div');
        modal.classList.add('modal');

        // Создание контента модального окна
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.innerHTML = `
            <p>${descriptionText}</p>
            <button id="continueButton">Продолжить</button>
        `;
        modal.appendChild(modalContent);

        // Добавление модального окна в DOM
        document.body.appendChild(modal);

        // Закрытие модального окна при нажатии на кнопку "Продолжить"
        document.getElementById('continueButton').addEventListener('click', () => {
            modal.remove();
            this.startTimer();
        }, {once: true});

        // Закрытие модального окна при клике вне контента
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.remove();
                this.startTimer();
            }
        }, {once: true});
    }

    startTimer() {
        // Этот метод должен быть переопределен в подклассах
        throw new Error("Method 'startTimer' must be implemented");
    }

    display() {
        // Абстрактный метод, должен быть определен в дочерних классах
        throw new Error("Abstract method 'display' must be implemented");
    }
}
