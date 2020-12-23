import renderSnake from './RenderSnake.js';

export const getIdPixel = (x, y) => 'X' + x + 'Y' + y;

export default class Board {
    #height = 10;
    #width = 10;
    #pixelSize = 10;
    #color = 'black';
    #board = document.createElement('div');
    #snakes = [];
    #positionsOfBoard = [];

    constructor({ height, width, pixelSize, color } = {}) {
        if(height)
            this.#height = height;
        if(width)
            this.#width = width;
        if(pixelSize)    
            this.#pixelSize = pixelSize;
        if(color)    
            this.#color = color;

        this.#board.style.flexDirection = 'column';
        
        this.#createBoard();
    }

    drawBoard() {
        document.body.appendChild(this.#board);
    }

    getColor() {
        return this.#color;
    }

    #createPixel = (id) => {
        const pixel = document.createElement('div');
        pixel.style.height = this.#pixelSize+'px';
        pixel.style.width = this.#pixelSize+'px';
        pixel.style.backgroundColor = this.#color;
        pixel.id = id;
        return pixel;
    }

    #createBoard = () => {
        const maxY = this.#height - 1;
        const maxX = this.#width - 1;

        for (let y = 0; y <= maxY; y++) {
            const line = document.createElement('div');
            this.#positionsOfBoard.push([]);
            for (let x = 0; x <= maxX; x++) {
                this.#positionsOfBoard[y].push(0);
                const pixel = this.#createPixel(getIdPixel(x, maxY - y))
                line.appendChild(pixel)
            }
            this.#board.appendChild(line);
        }
    }

    getPositionsOfBoard() {
        return this.#positionsOfBoard;
    }

    registerSnake(snake) {
        this.#snakes.push(snake);
    }

    update() {
        this.#snakes.forEach(snake => {
            renderSnake({ board: this, snake})
        })
    }
}