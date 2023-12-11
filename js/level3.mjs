import {Level} from './level.mjs';

export class Level3 extends Level {
    display() {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                // Получение случайного индекса от 0 до i
                const j = Math.floor(Math.random() * (i + 1));
                // Обмен элементов местами
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }


        const description = `Ваша задача заключается в том, чтобы собрать паззл, представляющий собой элекстрическую схему. Каждый фрагмент паззла представляет элемент схемы: кружок – лампочка, 12V – источник тока, R1, R2, R3 – резисторы.<br>` +  `${this.difficulty === 2 ? 'Для поворота фрагмента паззла используйте стрелки, появляющиеся при выборе. При этом обращаем ваше внимание, что надписи на элементах должны быть правильно ориентированы (читаемы слева направо).' : ''}
            <br><br>Главное – действовать быстро и аккуратно, ведь на выполнение уровня у Вас есть всего ` + `${this.difficulty === 0 ? '30' : (this.difficulty === 1 ? '45' : '80')}` + ` секунд.
            За каждую сэкономленную секунду вы получите дополнительный балл. Изначально у вас есть ` + `${this.difficulty === 2 ? '50' : '30'}` + `  очков, которые убывают на 1 за каждое перемещение ` + `${this.difficulty === 2 ? 'или поворот ' : ''}` + `фрагмента. Если вы исчерпаете свои очки, бонуса за время не будет.
            <br><br><strong>Управление:</strong><br>
            - Выберите фрагмент паззла, кликнув по нему левой кнопкой мыши.<br>
            - Разместите выбранный фрагмент на поле, кликнув на занятую или свободную клетку.<br>
            Желаем удачи и приятной игры!`;

        this.score = (this.difficulty === 2 ? 51 : 31);
        this.reduceScore();
        this.showDescription(description);

        // размер паззла зависит от уровня сложности
        const segmentCountX = 3;
        const segmentCountY = (this.difficulty == 0 ? 2 : 3);

        // разрезаем изображение на количество частей, соответствующее уровню
        const size = 200 / window.devicePixelRatio;
        const container = document.getElementById('game');
        document.getElementById("game").style.cssText = '';
        document.getElementById("game").style.justifyContent = "space-around";
        document.getElementById("game").style.flexDirection = "row";
        
        const arrow_size = size / 5;
        const arrow_left = document.createElement('img'); 
        arrow_left.style.width = arrow_size + 'px';
        arrow_left.style.height = arrow_size + 'px';
        arrow_left.style.display = 'none';
        const arrow_right = arrow_left.cloneNode(true);
        arrow_left.src = '../images/arrow_left.png';
        arrow_left.classList.add("arrow-left");
        arrow_left.addEventListener('click', (event) => {
            const arrow = event.target;
            const pic = arrow.elem;
            pic.rotation = ((pic.rotation - 90) % 360 + 360) % 360;
            pic.style.transform = `rotate(${pic.rotation}deg)`;
            this.reduceScore();
            this.checkCompletion();
        });
        arrow_right.src = '../images/arrow_right.png';
        arrow_right.classList.add("arrow-right");
        arrow_right.addEventListener('click', (event) => {
            const arrow = event.target;
            const pic = arrow.elem;
            pic.rotation = (pic.rotation + 90) % 360;
            pic.style.transform = `rotate(${pic.rotation}deg)`;
            this.reduceScore();
            this.checkCompletion();
        });
        container.appendChild(arrow_right);
        container.appendChild(arrow_left);



        const index = Math.floor(Math.random() * 5) + 1;
        const puzzlePath = `../images/level3_${segmentCountY}x${segmentCountX}/${index}.png`;
        const completePath = `../images/level3_${segmentCountY}x${segmentCountX}/${index}_done.png`;
        let pieces = this.createCuttedImages(puzzlePath)
        pieces = shuffleArray(pieces);


        pieces.forEach(segment => {
            segment.addEventListener('click', (event) => {
                    
                event.stopPropagation();
                const activeImg = document.querySelector('.img-active');
                if (activeImg)
                {
                    if (activeImg.parentElement.classList.contains("tile") || segment.parentElement.classList.contains("tile"))
                    {
                        // swap
                        if (activeImg.parentElement.classList.contains("tile"))
                        {
                            const parent = activeImg.parentElement;
                            segment.parentElement.insertBefore(activeImg, segment);
                            parent.appendChild(segment);
                        }
                        else 
                        {
                            const parent = segment.parentElement;
                            activeImg.parentElement.insertBefore(segment, activeImg);
                            parent.appendChild(activeImg);
                        }
                        activeImg.classList.remove('img-active');
                        if (activeImg != segment)
                            this.reduceScore();
                        this.checkCompletion();
                    }
                    else
                    {
                        segment.classList.toggle('img-active');
                        activeImg.classList.remove('img-active');
                        
                    }
                }
                else
                    segment.classList.toggle('img-active');
                //добавляем стрелки
                if (segment.classList.contains('img-active') && this.difficulty === 2)
                {
                    const rect = segment.getBoundingClientRect();
                    arrow_left.style.left = rect.left - arrow_size + 'px';
                    arrow_left.style.top = rect.top + size / 2 - arrow_size / 2 + 'px';
                    arrow_left.style.display = 'block';
                    arrow_left.elem = segment;
                    arrow_right.style.left = rect.left + size + 'px';
                    arrow_right.style.top = rect.top + size / 2 - arrow_size / 2 + 'px';
                    arrow_right.style.display = 'block';
                    arrow_right.elem = segment;
                }
                else
                {
                    arrow_left.style.display = 'none';
                    arrow_right.style.display = 'none';
                }
            });
        });

        // создаем две группы кусочков паззла
        const pieces1 = document.createElement('div');
        pieces1.classList.add("pieces");
        pieces1.style.height = `${size * segmentCountY + size * 0.5}px`;

        const pieces2 = pieces1.cloneNode();
        for (let i = 0; i < pieces.length; ++i)
        {
            if (i < pieces.length * 2 / 3)
                pieces1.appendChild(pieces[i]);
            else 
                pieces2.appendChild(pieces[i]);
        }

        // создаем поле для пазла
        const puzzleBox = document.createElement('div');
        puzzleBox.style.width = `${size * segmentCountX}px`;
        puzzleBox.style.height = `${size * segmentCountY}px`;
        puzzleBox.classList.add("puzzle-box");
        for (let i = 0; i < segmentCountY * segmentCountX; i++) {
            const tile = document.createElement('div');
            tile.style.width = size + 'px';
            tile.style.height = size + 'px';
            tile.classList.add("tile");
            tile.addEventListener('click', () => {
                var activeImg = document.querySelector('.img-active');
                if (tile.children.length === 0 && activeImg)
                {
                    activeImg.classList.remove("img-active");
                    arrow_left.style.display = 'none';
                    arrow_right.style.display = 'none';
                    tile.appendChild(activeImg);
                    this.reduceScore();
                    this.checkCompletion();
                }
            });
            puzzleBox.appendChild(tile);
        }

        // добавляем элементы на страницу
        container.appendChild(pieces1);
        container.appendChild(puzzleBox);
        container.appendChild(pieces2);

        document.addEventListener('showCompletedPuzzle', () =>
        {
            arrow_left.style.display = 'none';
            arrow_right.style.display = 'none';
            const elems = this.createCuttedImages(completePath, false);
            document.querySelectorAll('.tile').forEach((tile, index) =>{
                tile.children[0].remove();
                tile.appendChild(elems[index]);
            });
            this.stopTimer();
            setInterval(() => {document.dispatchEvent(new Event('levelCompleted'));}, 2000);
        }, {once: true});
        
        document.addEventListener('levelCompleted', () => {
            this.stopTimer();
            if (!(this.timeLeft === 0))
                this.score += this.timeLeft;
            else 
                this.score = 0;
            document.getElementById('score').textContent = this.score + ' очков';
            this.showScore();
        }, {once: true});
    }
    // запускаем таймер на разное время в зависимости от уровня сложности
    startTimer()
    {
        if (this.difficulty === 0)
            this.runTimer(30);
        else if (this.difficulty === 1)
            this.runTimer(45);
        else
            this.runTimer(80);
    }


    checkCompletion()
    {
        let completed = true;
        document.querySelectorAll('.tile').forEach((tile, index) => {
            if (tile.children.length === 0 || tile.children[0].count != index || tile.children[0].rotation != 0)
                completed = false;
        });
        if (completed)
            document.dispatchEvent(new Event('showCompletedPuzzle'));
           
    }

    createCuttedImages(puzzlePath, rotate=(this.difficulty === 2))
    {
        // размер паззла зависит от уровня сложности
        const segmentCountX = 3;
        const segmentCountY = (this.difficulty === 0 ? 2 : 3);

        // разрезаем изображение на количество частей, соответствующее уровню
        const size = 200 / window.devicePixelRatio;
        let count = 0;
        let pieces = [];
        for (let i = 0; i < segmentCountY; i++) {
            for (let j = 0; j < segmentCountX; j++) {
                const segment = document.createElement('img'); 
                
                segment.style.backgroundImage = `url(${puzzlePath})`;
                segment.style.backgroundSize = `${size * segmentCountX}px ${size * segmentCountY}px`;
                segment.style.backgroundPosition = `-${j * size}px -${i * size}px`;
                segment.style.width = size + 'px';
                segment.style.height = size + 'px';
                segment.count = count;
                const rotation = (rotate ? 90 * Math.floor(Math.random() * 4) : 0);
                segment.rotation = rotation;
                segment.style.transform = `rotate(${rotation}deg)`
                segment.classList.add('cutted-image');

                pieces.push(segment);
                ++count;
            }
        }
        return pieces;
    }

    reduceScore()
    {
        this.score = Math.max(0, this.score - 1);
        document.getElementById('score').textContent = this.score + ' очков';
        if (this.score === 0)
        {
            this.timeLeft = 0;
            document.dispatchEvent(new Event('levelCompleted'));
        }
            
    }
    
}