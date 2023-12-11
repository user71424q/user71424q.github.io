import {Level} from './level.mjs';

export class Level2 extends Level {
    display() {
        this.score = 0;
        // массив локальных путей к изображениям - игровым объектам уровня
        const objects = [
            '../images/level2_wrong/cactus.png',
            '../images/level2_wrong/cat.png',
            '../images/level2_correct/computer.png',
            '../images/level2_wrong/dog.png',
            '../images/level2_correct/hairdryer.png',
            '../images/level2_wrong/hamster.png',
            '../images/level2_correct/iron.png',
            '../images/level2_correct/kettle.png',
            '../images/level2_correct/lamp.png',
            '../images/level2_correct/microvawe_oven.png',
            '../images/level2_wrong/parrot.png',
            '../images/level2_wrong/soup.png',
            '../images/level2_correct/vacuum_cleaner.png',
            '../images/level2_wrong/water.png',
        ];

        // Описание уровня
        const description = `Ваша задача заключается в том, чтобы кликнуть курсором на объекты, являющиеся электроприборами, и затем активировать рубильник в правом нижнем углу для завершения уровня. Будьте внимательны: объекты двигаются` + `${this.difficulty === 0 ? '' : (this.difficulty === 1 ? ' быстро' : ' быстро, а также их частично закрывают облака')}` + `! Главное – действовать эффективно и аккуратно, ведь на выполнение уровня у Вас есть всего `  + `${this.difficulty === 0 ? '40' : (this.difficulty === 1 ? '35' : '30')}` + ` секунд. Игра закончится либо по истечении этого времени, либо при активации рубильника.<br><br>
        За каждый правильно выбранный электроприбор Вы получите 1 балл. Кроме того, за каждую сэкономленную секунду мы также начислим Вам дополнительный балл. Помните, время начнёт отсчитываться, как только Вы закроете это окно, так что будьте готовы к действию!<br><br>
        <strong>Управление:</strong><br>
        - Чтобы выбрать объект, кликните по нему левой кнопкой мыши.<br>
        - Если Вы хотите отменить выбор, кликните по объекту еще раз.<br>
        - Для завершения уровня активируйте рубильник, находящийся в правом нижнем углу.<br><br>
        Желаем удачи и приятной игры!`
        this.showDescription(description);
        // создаем дырку для розетки
        function createHole() {
            const hole = document.createElement('div');
            hole.classList.add("hole");
            return hole;
        }

        objects.forEach(path => {
            this.createPicElement(path);
        });
        // создаем рычаг-рубильник
        const power = document.createElement('img');
        power.classList.add('power-lever');
        power.id = 'power-lever';
        power.src = "../images/switch_off.png";
        // создаем удлиннитель
        const socketContainer = document.createElement('div');
        socketContainer.classList.add("electro-socket-container");
        for (let i = 0; i < objects.length; ++i)
        {
            // создаем розетку и 2 дырки
            const socket = document.createElement('div');
            socket.classList.add("electro-socket");
            socket.appendChild(createHole());
            socket.appendChild(createHole());
            socketContainer.appendChild(socket);
        }
        // размещаем удлиннитель и рычаг внизу игрового поля
        const socketPanel = document.createElement('div');
        socketPanel.classList.add("electro-socket-panel");
        socketPanel.appendChild(socketContainer);
        socketPanel.appendChild(power);
        document.getElementById("game").appendChild(socketPanel);
        document.getElementById("game").style.cssText = '';
        document.getElementById("game").style.justifyContent = "flex-end";
        if (this.difficulty === 2)
        {
            const container = document.getElementById('game');
            let pics = Array.from(document.querySelectorAll('.photo'));
            for (let i = 0; i < 4; ++i)
            {
                const cloud = document.createElement('img');
                cloud.src = '../images/cloud.png';
                cloud.classList.add('cloud');
                const randomIndex = Math.floor(Math.random() * pics.length);
                cloud.style.left = pics[randomIndex].getBoundingClientRect().left + 'px';
                cloud.style.top = pics[randomIndex].getBoundingClientRect().top + 'px';
                pics.splice(randomIndex, 1);
                cloud.style.animationDelay = i + 's';
                container.appendChild(cloud);
            }
        }
        this.addSwitchEventListener();
        window.addEventListener('resize', () => {this.handleResize();});
        this.addLevelCompleteHandler();
    }

    // Запускаем таймер на разное время в зависимости от уровня сложности
    startTimer()
    {
        if (this.difficulty === 0)
            this.runTimer(40);
        else if (this.difficulty === 1)
            this.runTimer(35);
        else
            this.runTimer(30);
    }

    // отображение игровых объектов уровня на странице в случайном месте и со случайной анимацией
    createPicElement(path)
    {
        const trajectoriesCount = 9;
        const container = document.getElementById('game');
        const rect = container.getBoundingClientRect();
        const containerWidth = rect.width;
        const containerHeight = rect.height;

        const photo = document.createElement('img');
        photo.src = path;
        photo.classList.add('photo');

        // Расчет случайной начальной позиции
        // Учитываем размеры экрана и фотографии
        const x = Math.random() * (containerWidth - 500) + 50;
        const y = Math.random() * (containerHeight - 500) + 100;

        photo.style.left = `${x}px`;
        photo.style.top = `${y}px`;

        // Присвоение случайного класса для анимации
        const pathClass = 'path' + Math.floor(Math.random() * trajectoriesCount + 1);
        photo.classList.add(pathClass);
        photo.style.animationDuration = (this.difficulty == 0 ? 2 : 1) + Math.random() * 2 + 's';
        container.appendChild(photo);
        photo.addEventListener('click', () => {
            if (photo.parentElement.id === "game") 
            {
                photo.parentElement.removeChild(photo);
                const sockets = document.querySelectorAll('.electro-socket');
                for (let i = 0; i < sockets.length; ++i)
                    if (sockets[i].children.length === 2)
                    {
                        sockets[i].appendChild(photo);
                        const rect = sockets[i].getBoundingClientRect();
                        photo.style.animationDuration = 0 + 's';
                        photo.style.left = rect.left + 'px';
                        photo.style.top = rect.top + 'px';
                        photo.classList.add('photo-selected');
                        break;
                    }
            }
            else
            {
                photo.parentElement.removeChild(photo);
                this.createPicElement(photo.src);
            }
        });
    }

    handleResize() {
        // Получаем размеры окна
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const picElements = document.querySelectorAll('.photo');

        // Перебираем все изображения
        picElements.forEach((picElement) => {
            // Получаем координаты и размеры изображения
            const picRect = picElement.getBoundingClientRect();
    
            // Проверяем, помещается ли изображение внутри окна
            if (!(
                picRect.left >= 0 &&
                picRect.top >= 0 &&
                picRect.right <= windowWidth &&
                picRect.bottom <= windowHeight)
            ) {
                // Если изображение не помещается, удаляем его и создаем новое
                
                this.createPicElement(picElement.src);
                picElement.remove();
            }
        });
    }

    addSwitchEventListener() {
        const power = document.getElementById('power-lever');
        power.addEventListener('click', () => {
            power.src = '../images/switch_on.png';
            document.dispatchEvent(new Event('levelCompleted'));
        });
        
    }

    addLevelCompleteHandler()
    {
        document.addEventListener('levelCompleted', () => {
            this.stopTimer();
            const powered = document.querySelectorAll('.photo-selected');
            powered.forEach(device =>{
                if (device.src.includes('level2_correct'))
                    this.score += 5;
                else 
                    this.score -= 10;
            });
            this.score += this.timeLeft;
            document.getElementById('score').textContent = this.score + ' очков';
            this.showScore();
        }, {once: true});
    }
}