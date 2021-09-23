class Board {
    constructor(){
        this.gridSize = 3;
        this.score = 0;
        this.highScore = 0;
        this.isGameWon = false;
    }
    generateGrid() {
        let board = document.getElementsByClassName("board")[0];
        let totalCells = this.gridSize * this.gridSize;
        for (let i = 0; i < totalCells; i++) {
            console.log(i, "I");
            let tile = document.createElement("div");
            tile.className = "tile";
            console.log(tile, "TILE");
            board.appendChild(tile);
        }
    }
    generateRandomNumber() {
        let elements = document.getElementsByClassName("tile");
        let missingItems = [];
        for (let i = 0; i < elements.length; i++) {
            if (!elements[i].innerHTML) {
                missingItems.push(i);
            }
        }
        if (missingItems.length) {
            const random = missingItems[Math.floor(Math.random() * missingItems.length)];
            const number = ["2", "4"][Math.floor(Math.random() * 2)]
            elements[random].innerHTML = number;
            elements[random].setAttribute("style", "border-radius: 3px;background: #eee4da;box-shadow: 0 0 30px 10px rgb(243 215 116 / 0%), inset 0 0 0 1px rgb(255 255 255 / 0%);text-align: center;font-weight: bold;z-index: 10;font-size: 55px;color: #776e65;font-family: Clear Sans, Helvetica Neue, Arial, sans-serif;")
        }
    }
    isPlayable() {
        let elements = document.getElementsByClassName("tile");
        let totalCells = this.gridSize * this.gridSize;
        let missingItemsCount = 0;
        for (let i = 0; i < totalCells; i++) {
            if ((i + 1) % 3 != 0 && elements[i].innerHTML === elements[i + 1].innerHTML) {
                return true;
            }
            if (i + this.gridSize < totalCells && elements[i].innerHTML === elements[i + this.gridSize].innerHTML) {
                return true;
            }
            if (!elements[i].innerHTML) {
                missingItemsCount += 1;
            }
        }
        if (missingItemsCount) {
            return true;
        }
        let gameMessage = document.getElementsByClassName("game-message")[0];
        gameMessage.innerHTML = "Game Over!!";
        gameMessage.className = "game-message game-over"
        return false
    }
    cascade(direction) {
        for (let row = 0; row < this.gridSize; row++) {
            let initialCell, offset, currentRowElements = [], currentRowIndices = [];
            let elements = document.getElementsByClassName("tile");
            if (direction === "LEFT") {
                initialCell = row * this.gridSize;
                offset = 1;
            } else if (direction === "UP") {
                initialCell = row;
                offset = this.gridSize;
            } else if (direction === "RIGHT") {
                initialCell = (row + 1) * this.gridSize - 1;
                offset = -1;
            } else if (direction === "DOWN") {
                initialCell = this.gridSize * this.gridSize - (this.gridSize - row);
                offset = -this.gridSize;
            }

            for (let i = 0; i < this.gridSize; i++) {
                currentRowIndices.push(initialCell + (i * offset));
                let currentElement = elements[initialCell + (i * offset)].innerHTML;
                if (currentElement) {
                    currentRowElements.push(parseInt(currentElement));
                }
            }

            for (let i = 0; i < currentRowIndices.length; i++) {
                if (currentRowElements[i + 1] && currentRowElements[i] === currentRowElements[i + 1]) {
                    elements[currentRowIndices[i]].innerHTML = currentRowElements[i] * 2;
                    currentRowElements.splice(i + 1, 1);
                    elements[currentRowIndices[i]].setAttribute("style", "border-radius: 3px;background: #eee4da;box-shadow: 0 0 30px 10px rgb(243 215 116 / 0%), inset 0 0 0 1px rgb(255 255 255 / 0%);text-align: center;font-weight: bold;z-index: 10;font-size: 55px;color: #776e65;font-family: Clear Sans, Helvetica Neue, Arial, sans-serif;")
                    if (currentRowElements[i] * 2 === 128) {
                        this.isGameWon = true;
                    }
                    this.score += currentRowElements[i] * 2;
                    document.getElementsByClassName("score")[0].innerHTML = this.score;
                    if (this.score > this.highScore) {
                        this.highScore = this.score;
                        document.getElementsByClassName("high-score")[0].innerHTML = this.highScore;
                    }
                }
                else if (currentRowElements[i]) {
                    elements[currentRowIndices[i]].innerHTML = currentRowElements[i];
                    elements[currentRowIndices[i]].setAttribute("style", "border-radius: 3px;background: #eee4da;box-shadow: 0 0 30px 10px rgb(243 215 116 / 0%), inset 0 0 0 1px rgb(255 255 255 / 0%);text-align: center;font-weight: bold;z-index: 10;font-size: 55px;color: #776e65;font-family: Clear Sans, Helvetica Neue, Arial, sans-serif;")
                } else {
                    elements[currentRowIndices[i]].innerHTML = "";
                    elements[currentRowIndices[i]].setAttribute("style", "background: rgba(238, 228, 218, 0.35);")
                }
            }
        }
        if (this.isGameWon) {
            let gameMessage = document.getElementsByClassName("game-message")[0];
            gameMessage.innerHTML = "Congratulations!! You Won";
            gameMessage.className = "game-message game-over"
        }
    }
    restart() {
        let elements = document.getElementsByClassName("tile");
        for (let element of elements) {
            element.innerHTML = "";
            element.setAttribute("style", "background: rgba(238, 228, 218, 0.35);")
        }
        document.getElementsByClassName("score")[0].innerHTML = 0;
        let gameMessage = document.getElementsByClassName("game-message")[0];
        gameMessage.innerHTML = "";
        gameMessage.className = "game-message";
        this.isGameWon = false;
    }
}
const board = new Board();

const restart = () => {
    board.restart();
    board.generateRandomNumber();
    board.generateRandomNumber();
}

document.addEventListener('DOMContentLoaded', function () {
    board.generateGrid();
    board.generateRandomNumber();
    board.generateRandomNumber();
})

document.addEventListener("keyup", function (e) {
    let direction;
    if (e.keyCode === 37) {
        direction = "LEFT";
    } else if (e.keyCode === 38) {
        direction = "UP";
    } else if (e.keyCode === 39) {
        direction = "RIGHT";
    } else if (e.keyCode === 40) {
        direction = "DOWN";
    }

    if (direction) {
        board.cascade(direction);
        board.generateRandomNumber();
        board.isPlayable();
    }
})