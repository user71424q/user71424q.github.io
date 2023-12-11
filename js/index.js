
//Кнопка перехода к рейтингу
const viewRatingButton = document.getElementById('view-rating');
if (viewRatingButton) {
    viewRatingButton.addEventListener('click', () => {
        window.location.href = './html/rating.html'; // Путь к странице рейтинга
    });
}


//кнопка рейтинговой игры
document.addEventListener('DOMContentLoaded', () => {
    let selectedDifficulty = 0; // Устанавливаем по умолчанию
    const ratingMode = document.getElementById('rating-mode');

    // Функция для создания и отображения модального окна
    function openModal() {
        createAndAddModal(); // Функция для создания модального окна
        attachEventListeners(); // Навешиваем обработчики событий
    }

    // Функция для создания модального окна
    function createAndAddModal() {
        var modal = document.createElement('div');
        modal.setAttribute('id', 'username-modal');
        modal.setAttribute('class', 'modal');
        var modalContent = document.createElement('div');
        modalContent.setAttribute('class', 'modal-content');
        var closeButton = document.createElement('span');
        closeButton.setAttribute('class', 'close-button');
        closeButton.innerHTML = '&times;';
        var header = document.createElement('h2');
        header.textContent = 'Введите ваше имя для игры в рейтинговом режиме';
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'username-input');
        input.setAttribute('maxlength', '25');
        input.setAttribute('placeholder', 'Имя пользователя');
        var difficultySelection = document.createElement('div');
        difficultySelection.setAttribute('class', 'difficulty-selection');
        var difficulties = ['Простой', 'Средний', 'Сложный'];
        difficulties.forEach(function(difficulty, index) {
            var button = document.createElement('button');
            button.setAttribute('class', 'main-button difficulty-button' + (index === 0 ? ' active' : ''));
            button.setAttribute('data-difficulty', index);
            button.textContent = difficulty;
            difficultySelection.appendChild(button);
        });
        var startButton = document.createElement('button');
        startButton.setAttribute('id', 'start-rating-game');
        startButton.setAttribute('disabled', 'true');
        startButton.textContent = 'Начать игру';
        modalContent.appendChild(closeButton);
        modalContent.appendChild(header);
        modalContent.appendChild(input);
        modalContent.appendChild(difficultySelection);
        modalContent.appendChild(startButton);
        modal.appendChild(modalContent);
        var mainElement = document.querySelector('main');
        mainElement.appendChild(modal);
    }

    // Функция для навешивания обработчиков событий
    function attachEventListeners() {
        const modal = document.getElementById('username-modal');
        const closeButton = modal.querySelector('.close-button');
        const startGameButton = modal.querySelector('#start-rating-game');
        const usernameInput = modal.querySelector('#username-input');
        const difficultyButtons = modal.querySelectorAll('.difficulty-button');

        difficultyButtons.forEach(button => {
            button.addEventListener('click', () => {
                difficultyButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedDifficulty = button.getAttribute('data-difficulty');
            });
        });

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', event => {
            if (event.target === modal) {
                closeModal();
            }
        });

        usernameInput.addEventListener('input', () => {
            const name = usernameInput.value.trim();
            startGameButton.disabled = name.length === 0 || name.length > 25;
        });

        startGameButton.addEventListener('click', () => {
            const userName = usernameInput.value.trim();
            if (userName.length > 0 && userName.length <= 25) {
                startRatingGame(userName, selectedDifficulty); // Вызов функции startRatingGame
            }
        });
    }

    // Функция для закрытия и удаления модального окна
    function closeModal() {
        const modal = document.getElementById('username-modal');
        if (modal) {
            modal.parentNode.removeChild(modal);
        }
    }

    if (ratingMode) {
        ratingMode.addEventListener('click', openModal);
    }
});

function startRatingGame(userName, difficulty)
{
    localStorage.setItem('userName', userName);
    localStorage.setItem('difficulty', difficulty);
    window.location.href = './html/rating-game.html';
}

//РЕЖИМ ТРЕНИРОВКИ
document.addEventListener('DOMContentLoaded', () => {
    let selectedDifficulty = 0; // Устанавливаем по умолчанию
    let selectedLevel = '1'; // Устанавливаем по умолчанию
    const trainingMode = document.getElementById('training-mode');

    // Функция для создания и отображения модального окна
    function openModal() {
        createAndAddModal(); // Функция для создания модального окна
        attachEventListeners(); // Навешиваем обработчики событий
    }

    // Функция для закрытия и удаления модального окна
    function closeModal() {
        const modal = document.getElementById('training-modal');
        if (modal) {
            modal.parentNode.removeChild(modal);
        }
    }

    function createAndAddModal() {
        var modal = document.createElement('div');
        modal.setAttribute('id', 'training-modal');
        modal.setAttribute('class', 'modal');
        var modalContent = document.createElement('div');
        modalContent.setAttribute('class', 'modal-content');
        var closeButton = document.createElement('span');
        closeButton.setAttribute('class', 'close-button');
        closeButton.innerHTML = '&times;';
        var header = document.createElement('h2');
        header.textContent = 'Выберите уровень для тренировки';
        var levelSelection = document.createElement('div');
        levelSelection.setAttribute('class', 'level-selection');
        for (let i = 1; i <= 3; ++i)
        {
            var button = document.createElement('button');
            button.setAttribute('class', 'main-button level-button' + (i === 1 ? ' active' : ''));
            button.setAttribute('data', i+"");
            button.textContent = 'Уровень ' + i;
            levelSelection.appendChild(button);
        }
        var difficultySelection = document.createElement('div');
        difficultySelection.setAttribute('class', 'difficulty-selection');
        var difficulties = ['Простой', 'Средний', 'Сложный'];
        difficulties.forEach(function(difficulty, index) {
            var button = document.createElement('button');
            button.setAttribute('class', 'main-button difficulty-button' + (index === 0 ? ' active' : ''));
            button.setAttribute('data-difficulty', index);
            button.textContent = difficulty;
            difficultySelection.appendChild(button);
        });
        var startButton = document.createElement('button');
        startButton.setAttribute('id', 'start-training-game');
        startButton.textContent = 'Начать игру';
        modalContent.appendChild(closeButton);
        modalContent.appendChild(header);
        modalContent.appendChild(levelSelection);
        modalContent.appendChild(difficultySelection);
        modalContent.appendChild(startButton);
        modal.appendChild(modalContent);
        var mainElement = document.querySelector('main');
        mainElement.appendChild(modal);
    }
    // Функция для навешивания обработчиков событий
    function attachEventListeners() {
        const modal = document.getElementById('training-modal');
        const closeButton = modal.querySelector('.close-button');
        const startGameButton = modal.querySelector('#start-training-game');
        const levelButtons = modal.querySelectorAll('.level-button');
        const difficultyButtons = modal.querySelectorAll('.difficulty-button');

        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                levelButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedLevel = button.getAttribute('data');
            });
        });

        difficultyButtons.forEach(button => {
            button.addEventListener('click', () => {
                difficultyButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedDifficulty = button.getAttribute('data-difficulty');
            });
        });

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', event => {
            if (event.target === modal) {
                closeModal();
            }
        });


        startGameButton.addEventListener('click', () => {
            startTrainingGame(selectedLevel, selectedDifficulty); // Вызов функции startRatingGame
        });
    }

    if (trainingMode) {
        trainingMode.addEventListener('click', openModal);
    }
})

function startTrainingGame(selectedLevel, selectedDifficulty)
{
    localStorage.setItem('training-level', selectedLevel);
    localStorage.setItem('training-difficulty', selectedDifficulty);
    window.location.href = './html/training-game.html';
}