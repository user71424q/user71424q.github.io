function backToMenu()
{
    // Создаем окно подтверждения выхода
    const modal = document.createElement('div');
    
    modal.classList.add('modal');
    modal.style.display = 'block';
    // Создание контента модального окна
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = `<p>Вы уверены? Ваш прогресс будет сброшен!</p>`;
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Вернуться в меню';
    confirmButton.style.backgroundColor = 'red';
    modalContent.appendChild(confirmButton);
    const returnButton = document.createElement('button');
    returnButton.textContent = 'Отмена';
    modalContent.appendChild(returnButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    confirmButton.addEventListener('click', () => {window.location.href = '../index.html';}, {once: true});
    returnButton.addEventListener('click', () => {document.body.removeChild(modal);}, {once: true});
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    }, {once: true});
}
document.getElementById('back-to-menu').addEventListener('click', backToMenu);