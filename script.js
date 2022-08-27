// @ts-check


//// МОДЕЛЬ ИГРЫ
// Создаём Игру
function createNewGrid() {
    return [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
}

//// ВИЗУАЛЬ ИГРЫ
function startGame() {
    let app = document.getElementById("app");

    let currentPlayer = "X";
    let gameGrid = createNewGrid();
    let winner = ""
    let grid = newDomGrid();

    let closer = document.getElementById("reset")
    closer.onclick = () => {
        while (app.firstChild) {
            app.removeChild(app.firstChild);
        }
        startGame()
    }

    function newDomGrid() {
        /// Создаём обший массив квадратиков
        return createNewGrid().map((row, rowIndex) => {
            return row.map((square, squareIndex) => {
                /// Создаём Новый Элемент/Квадратик
                let elem = document.createElement("div")
                elem.classList.add("square")

                /// Если нажимаем на этот квадратик...
                elem.onclick = () => {
                    if (winner != '') {
                        return
                    }

                    // Если Квадрат Пустой, можно ставит свой ход на него
                    if (elem.innerText == "") {
                        /// Ставим "О" или "Х"
                        gameGrid[rowIndex][squareIndex] = currentPlayer;
                        console.table(gameGrid)
                        elem.innerText = currentPlayer;
                        elem.setAttribute("ход", currentPlayer)
                            /// Теперь следущий игрок должнын быть или "Х" или "О"
                        currentPlayer = currentPlayer == "X" ? "O" : "X";

                        // Проверяем Горизонтальные
                        for (let i = 0; i < 3; i++) {
                            let row = gameGrid[i]
                            let isAll = row[0] == row[1] && row[1] == row[2];
                            if (isAll && row[0] != "") {

                                endGame(i, 0);
                                return;

                            }
                        }
                        // Проверяем Вертикальные
                        for (let i = 0; i < 3; i++) {
                            let isAll = (gameGrid[0][i] == gameGrid[1][i]) && (gameGrid[1][i] == gameGrid[2][i]);
                            if (isAll && gameGrid[0][i] != "") {

                                endGame(0, i);
                                return;

                            }
                        }

                        // Проверяем Диагонали

                        let isAll = gameGrid[0][0] == gameGrid[1][1] && gameGrid[1][1] == gameGrid[2][2];
                        let isAll2 = gameGrid[0][2] == gameGrid[1][1] && gameGrid[1][1] == gameGrid[2][0];
                        if ((isAll || isAll2) && gameGrid[1][1] != "") {


                            endGame(1, 1);
                            return;
                        }


                        // Проверить если Ничья


                        let result = true;
                        for (let i = 0; i < 3; i++) {
                            for (let j = 0; j < 3; j++) {
                                result = result && (gameGrid[i][j] != '')
                            }
                        }
                        if (result) {
                            let p = document.createElement("p")
                            p.innerText = "Draw";
                            app.appendChild(p);
                            return;
                        }

                    }

                }
                return elem;
            })
        })
    }

    function endGame(k, j) {
        winner = gameGrid[k][j]
        let p = document.createElement("p")
        p.innerText = "Winner is: " + winner;
        app.appendChild(p)
        return;
    }

    /// Вставляем в HTML
    grid.forEach(row => {
        row.forEach(square => {
            app.appendChild(square)
        })
    })



}

startGame();