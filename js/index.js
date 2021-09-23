/*
CLASS FOR HANDLING ALL THE BOARD OPERATIONS
*/
class Board {
    /*
    DEFAULT CONSTRUCTOR WHICH INITIALISES BASIC VALUES/CONFIGURATIONS
    */
    constructor(){
        this.gridSize = 3; 
        this.score = 0; 
        this.highScore = 0;
        this.gameScore = 128;
        this.isGameWon = false;
    }
    /*
    METHOD FOR ADDING TILES BASED ON THE GRID SIZE
    */
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
    /*
    METHOD FOR GENERATING RANDOM NUMBER (2/4) IN THE EMPTY TILE
    */
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
    /*
    METHOD FOR CHECKING IF THERE ARE ANY PLAYABLE MOVES IN THE BOARD
    */
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
    /*
    METHOD FOR HANDLING USER ACTIONS UP/DOWN/RIGHT/LEFT KEYS
    */
    cascade(direction) {
        /*
        ITERATING OVER EACH ROW/COLUMS
        */
        for (let row = 0; row < this.gridSize; row++) {
            let initialCell, offset, currentRowElements = [], currentRowIndices = [];
            let elements = document.getElementsByClassName("tile");
            /*
            GENERATING INITIAL CELL AND THE OFFSET VALUES FOR GENERATING NEXT ROW/COLUMN ELEMENTS
            */
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
            
            /*
            GENERATING ROW/COLUMN ELEMENTS ALONG WITH IT'S INDICES BASED ON THE OFFSET VALUE
            */
            for (let i = 0; i < this.gridSize; i++) {
                currentRowIndices.push(initialCell + (i * offset));
                let currentElement = elements[initialCell + (i * offset)].innerHTML;
                if (currentElement) {
                    currentRowElements.push(parseInt(currentElement));
                }
            }
            
            /*
            CASCADING AND MERGING ELEMENTS IN A ROW/COLUMN, CALCULATING SCORE AND HIGHSCORE
            */
            for (let i = 0; i < currentRowIndices.length; i++) {
                /*
                CONDITION FOR ADDING IF THE CONSECUTIVE ELEMENTS IN ROW/COLUMN ARE SAME
                */
                if (currentRowElements[i + 1] && currentRowElements[i] === currentRowElements[i + 1]) {
                    elements[currentRowIndices[i]].innerHTML = currentRowElements[i] * 2;
                    currentRowElements.splice(i + 1, 1);
                    elements[currentRowIndices[i]].setAttribute("style", "border-radius: 3px;background: #eee4da;box-shadow: 0 0 30px 10px rgb(243 215 116 / 0%), inset 0 0 0 1px rgb(255 255 255 / 0%);text-align: center;font-weight: bold;z-index: 10;font-size: 55px;color: #776e65;font-family: Clear Sans, Helvetica Neue, Arial, sans-serif;")
                    /*
                    CHECKING GAME WON CONDITION, IF IT IS TRUE SETTING THE GAME WON FLAG TO TRUE
                    */
                    if (currentRowElements[i] * 2 === this.gameScore) {
                        this.isGameWon = true;
                    }
                    this.score += currentRowElements[i] * 2;
                    document.getElementsByClassName("score")[0].innerHTML = this.score;
                    /*
                    COMPARING HIGH SCORE AND GAME SCORE AND UPDATING HIGH SCORE IF IT IS LESS THAN GAME SCORE
                    */
                    if (this.score > this.highScore) {
                        this.highScore = this.score;
                        document.getElementsByClassName("high-score")[0].innerHTML = this.highScore;
                    }
                }
                /*
                CASCADING UNEQUAL ELEMENTS IN THE DIRECTION SELECTED BY USER
                */
                else if (currentRowElements[i]) {
                    elements[currentRowIndices[i]].innerHTML = currentRowElements[i];
                    elements[currentRowIndices[i]].setAttribute("style", "border-radius: 3px;background: #eee4da;box-shadow: 0 0 30px 10px rgb(243 215 116 / 0%), inset 0 0 0 1px rgb(255 255 255 / 0%);text-align: center;font-weight: bold;z-index: 10;font-size: 55px;color: #776e65;font-family: Clear Sans, Helvetica Neue, Arial, sans-serif;")
                }
                /*
                FILLING THE EMPTY SPACES WITH EMPTY VALUE
                */
                else {
                    elements[currentRowIndices[i]].innerHTML = "";
                    elements[currentRowIndices[i]].setAttribute("style", "background: rgba(238, 228, 218, 0.35);")
                }
            }
        }
        /*
        CHECKING GAME WON FLAG WHETHER AND SHOWING GAME WON TEXT TO USER
        */
        if (this.isGameWon) {
            let gameMessage = document.getElementsByClassName("game-message")[0];
            gameMessage.innerHTML = "Congratulations!! You Won";
            gameMessage.className = "game-message game-over"
        }
    }
    /*
    METHOD FOR RESETTING THE ENTIRE TILES, GAME SCORE, AND GAME WON FLAG
    */
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

/*
FUNCTION FOR HANDLING NEW GAME/RESTART GAME
*/
const restart = () => {
    /*
    RESTARTING THE ENTIRE TILES, GAME SCORE TO DEFAULT VALUES
    */
    board.restart();
    /*
    GENERATING TWO RANDOM NUMBERS IN THE RESTARTED BOARD
    */
    board.generateRandomNumber();
    board.generateRandomNumber();
}

/*
ONCE THE PAGE IS LOADED, INITIALIZING TILES, TWO RANDOM NUMBERS IN THE BOARD
*/
document.addEventListener('DOMContentLoaded', function () {
    /*
    GENERATING GRID BASED ON GRID SIZE
    */
    board.generateGrid();
    /*
    GENERATING TWO RANDOM NUMBERS IN THE RESTARTED BOARD
    */
    board.generateRandomNumber();
    board.generateRandomNumber();
})

/*
EVENT LISTENER FOR UP, DOWN, RIGHT, AND LEFT ARROW KEYS
*/
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
        /*
        CASCADING ALL TILES BASED ON THE DIRECTION
        */
        board.cascade(direction);
        /*
        GENRATING RANDOM NUMBER IN THE EMPTY TILES
        */
        board.generateRandomNumber();
        /*
        CHECKING IF WHETHER THERE ARE ANY PLAYABLE MOVES
        */
        board.isPlayable();
    }
})
