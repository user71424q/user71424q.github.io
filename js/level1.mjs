import {Level} from './level.mjs';

export class Level1 extends Level {
    display() {
        this.score = 0;
        this.addLevelCompleteHandler();
        const shapes = ['circle', 'square', 'rhombus', 'ellipse'];
        const colors = ['yellow', 'pink', 'green', 'red', 'lightBlue', 'purple', 'blue', 'orange'];
        const description = [`Ваша задача заключается в том, чтобы соединить проводами разъёмы одинакового цвета. Главное – действовать быстро и аккуратно, ведь на выполнение уровня у Вас есть всего 40 секунд. Игра закончится либо по истечении этого времени, либо когда все разъёмы будут использованы.<br><br>
        За каждое правильно выполненное соединение Вы получите 1 балл. Кроме того, за каждую сэкономленную секунду мы также начислим Вам дополнительный балл. Помните, время начнёт отсчитываться, как только Вы закроете это окно, так что будьте готовы к действию!<br><br>
        <strong>Управление:</strong><br>
        - Чтобы соединить разъёмы, нажмите на них правой кнопкой мыши и перетяните к разъёму того же цвета.<br>
        - Если Вы подключили провод не к тому разъёму, концы провода выйдут из строя.<br><br>
        Желаем удачи и приятной игры!`,
        `Ваша задача заключается в том, чтобы соединить проводами разъёмы одинакового цвета и формы. Главное – действовать быстро и аккуратно, ведь на выполнение уровня у Вас есть всего 35 секунд. Игра закончится либо по истечении этого времени, либо когда все разъёмы будут использованы.<br><br>
        За каждое правильно выполненное соединение Вы получите 1 балл. Кроме того, за каждую сэкономленную секунду мы также начислим Вам дополнительный балл. Помните, время начнёт отсчитываться, как только Вы закроете это окно, так что будьте готовы к действию!<br><br>
        <strong>Управление:</strong><br>
        - Чтобы соединить разъёмы, нажмите на них правой кнопкой мыши и перетяните к разъёму того же цвета.<br>
        - Если Вы подключили провод не к тому разъёму, концы провода выйдут из строя.<br><br>
        Желаем удачи и приятной игры!`,
        `Ваша задача заключается в том, чтобы соединить проводами разъёмы одинакового цвета и формы. Будьте внимательны: разъёмы будут периодически двигаться. Главное – действовать быстро и аккуратно, ведь на выполнение уровня у Вас есть всего 30 секунд. Игра закончится либо по истечении этого времени, либо когда все разъёмы будут использованы.<br><br>
        За каждое правильно выполненное соединение Вы получите 1 балл. Кроме того, за каждую сэкономленную секунду мы также начислим Вам дополнительный балл. Помните, время начнёт отсчитываться, как только Вы закроете это окно, так что будьте готовы к действию!<br><br>
        <strong>Управление:</strong><br>
        - Чтобы соединить разъёмы, нажмите на них правой кнопкой мыши и перетяните к разъёму того же цвета.<br>
        - Если Вы подключили провод не к тому разъёму, концы провода выйдут из строя.<br><br>
        Желаем удачи и приятной игры!`];
        // Функция для генерации уникальных пар цвет-форма
        function generateUniquePairs(n, color_array=colors, shape_array=shapes) {
            const pairs = [];
            const usedPairs = new Set();

            while (pairs.length < n) {
                const shape = shape_array[Math.floor(Math.random() * shape_array.length)];
                const color = color_array[Math.floor(Math.random() * color_array.length)];
                const pair = `${color} ${shape}`;

                if (!usedPairs.has(pair)) {
                    usedPairs.add(pair);
                    pairs.push(pair);
                }
            }

            return pairs;
        }

        this.showDescription(description[this.difficulty]);
        // Создаем выборку 
        let divPairs = [];
        if (this.difficulty === 0)
            divPairs = generateUniquePairs(8, colors, ['circle']);
        else
            divPairs = generateUniquePairs(10, colors, shapes);
        // Создание контейнера socketContainer
        const socketContainer = document.createElement('div');
        socketContainer.id = 'container1';
        socketContainer.classList.add('socket-container');
        // Создание второго контейнера
        const socketContainer2 = document.createElement('div');
        socketContainer2.id = 'container2';
        socketContainer2.classList.add('socket-container');
        // Добавление сгенерированных div в container1
        divPairs.forEach(div => {
            const child = document.createElement('div');
            const classes = div.split(' ');
            child.classList.add(...classes);
            child.classList.add('draggable');
            child.style.order = 0;
            socketContainer.appendChild(child);
        });

        const shuffledPairs = divPairs.sort(() => 0.5 - Math.random());
        shuffledPairs.forEach(div => {
            const child = document.createElement('div');
            const classes = div.split(' ');
            child.classList.add(...classes);
            child.classList.add('draggable');
            child.style.order = 0;
            socketContainer2.appendChild(child);
        });

        // Предполагается, что socketContainer будет добавлен в body или другой элемент DOM
        document.getElementById('game').appendChild(socketContainer);
        document.getElementById('game').appendChild(socketContainer2);
        document.getElementById("game").style.justifyContent = "space-around";
        window.addEventListener('resize', () => {this.updateAllWires();});
        this.addDragAndDropHandlers();

        if (this.difficulty === 2)
        {
            let count = 0;
            setInterval(() => {
                if (count % 2)
                {
                    const randomChild = socketContainer.children[Math.floor(Math.random() * socketContainer.children.length)];
                    randomChild.style.order++;
                }
                else
                {
                    const randomChild2 = socketContainer2.children[Math.floor(Math.random() * socketContainer2.children.length)];
                    randomChild2.style.order++;
                }
                count++;
                this.updateAllWires();
            }, 1500);
        }
    }

    startTimer()
    {
        if (this.difficulty === 0)
            this.runTimer(40);
        else if (this.difficulty === 1)
            this.runTimer(35);
        else
            this.runTimer(30);
    }

    addDragAndDropHandlers() {
        const draggables = document.querySelectorAll('.draggable');
        let currentWire = null;

        draggables.forEach(elem => {
            elem.addEventListener('dragstart', e => {
                if (!e.target.classList.contains("connected")) {
                    currentWire = this.createWireElement(e.target);
                    this.updateWirePosition(e.clientX, e.clientY, currentWire);
                }
            });

            elem.addEventListener('drag', e => {
                if (currentWire)
                    this.updateWirePosition(e.clientX, e.clientY, currentWire);
            });

            elem.addEventListener('dragend', e => {
                if (currentWire && !currentWire.origin.classList.contains('connected')) {
                    currentWire.remove(); // Удалить провод, если соединение не было установлено
                }
                currentWire = null;
            });

            elem.addEventListener('dragover', e => {
                e.preventDefault();
            });

            elem.addEventListener('drop', e => {
                if (currentWire && e.target !== currentWire.origin && !e.target.classList.contains('connected')) {
                    // Проверка правильности соединения
                    currentWire.end = e.target;
                    this.fixWirePosition(currentWire);
                    currentWire.end.classList.add("connected");
                    currentWire.origin.classList.add("connected");
                    if (currentWire.origin.className === currentWire.end.className) {
                        this.score++;
                        document.getElementById('score').textContent = this.score + ' очков';
                    } else {
                        currentWire.origin.classList.add('wrong-connection');
                        e.target.classList.add('wrong-connection');
                    }
                    this.checkConnections();
                }
            });
        });
    }

    createWireElement(originElem) {
        const wire = document.createElement('div');
        wire.className = 'wire';

        const originStyle = getComputedStyle(originElem);
        wire.style.backgroundColor = originStyle.borderColor;
        wire.origin = originElem; // Элемент, откуда началось перетаскивание
        wire.end = null;
        const rect = originElem.getBoundingClientRect();

        document.getElementById('game').appendChild(wire);
        return wire;
    }

    updateWirePosition(x, y, wire) {
        const rect = wire.origin.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        const deltaX = x - startX;
        const deltaY = y - startY;
        const wireLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX); 

        wire.style.width = `${wireLength}px`;
        wire.style.left = `${startX}px`;
        wire.style.top = `${startY}px`;
        wire.style.transform = `rotate(${angle}rad)`;
        wire.style.transformOrigin = '0 0';
    }

    fixWirePosition(wire) {
        const rect = wire.end.getBoundingClientRect();
        const endX = rect.left + rect.width / 2;
        const endY = rect.top + rect.height / 2;
        this.updateWirePosition(endX, endY, wire);
    }

    updateAllWires()
    {
        const wires = document.querySelectorAll('.wire');
        wires.forEach(wire => {
            if (wire.origin.classList.contains('connected'))
                this.fixWirePosition(wire);
        });
    }

    addLevelCompleteHandler() {
        document.addEventListener('levelCompleted', () => {
            this.stopTimer();
            this.score += this.timeLeft;
            document.getElementById('score').textContent = this.score + ' очков';
            this.showScore();
        }, {once: true});
    }

    checkConnections() {
        const draggables = document.querySelectorAll('.draggable');
        const connected = document.querySelectorAll('.connected');
        if (draggables.length === connected.length)
            document.dispatchEvent(new Event('levelCompleted'));
    }
}