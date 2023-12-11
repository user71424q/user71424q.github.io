// Функция для фильтрации и отображения рейтинга по сложности
function filterByDifficulty(difficulty) {
    const rankingData = JSON.parse(localStorage.getItem('playerRanking')) || [];
    const filteredData = rankingData.filter(player => +(player.difficulty) === difficulty);

    // Сортировка данных по убыванию очков
    filteredData.sort((a, b) => b.totalscore - a.totalscore);

    updateRankingTable(filteredData);

    // Обновление стилей кнопок
    updateActiveTab(difficulty);
}

// Функция для обновления таблицы рейтинга
function updateRankingTable(data) {
    const tableBody = document.getElementById('rating-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach((player, index) => {
        const row = tableBody.insertRow();

        const placeCell = row.insertCell(0);
        placeCell.textContent = index + 1;

        const nameCell = row.insertCell(1);
        nameCell.textContent = player.username;

        const score1Cell = row.insertCell(2);
        score1Cell.textContent = player.score1;

        const score2Cell = row.insertCell(3);
        score2Cell.textContent = player.score2;

        const score3Cell = row.insertCell(4);
        score3Cell.textContent = player.score3;

        const scoreTotalCell = row.insertCell(5);
        scoreTotalCell.textContent = player.totalscore;
    });
}

// Функция для обновления активного стиля вкладок
function updateActiveTab(activeDifficulty) {
    const buttons = document.querySelectorAll('.tab-button');
    const difficulties = ['Простой', 'Средний', 'Сложный'];
    buttons.forEach(button => {
        if (button.textContent === difficulties[activeDifficulty]) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Вызываем функцию при загрузке страницы для уровня "Сложно"
window.onload = () => filterByDifficulty(2);
