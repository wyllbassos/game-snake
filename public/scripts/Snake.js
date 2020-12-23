export default class Snake {
    #pixelToDelete = [];
    #positions = [{
        x: 0,
        y: 0,
    }]
    #color = 'red';
    #maxX = 0;
    #maxY = 0;
    #board = {};
    constructor({ positionX, positionY, color, maxX, maxY, board } = {}) {
        if(positionX)
            this.#positions[0].x = positionX;
        if(positionY)
            this.#positions[0].y = positionY;
        if(color)
            this.#color = color;
        if(maxX)
            this.#maxX = maxX;
        if(maxY)
            this.#maxY = maxY;
        if (board) {
            this.#board = board;
        }
    }

    getPositions = () => {
        return this.#positions;
    }

    getColor = () => {
        return this.#color;
    }

    getPixelToDelete() {
        return this.#pixelToDelete;
    }

    resetPixelToDelete() {
        this.#pixelToDelete = [];
    }

    #executeChangeOfPixel = ({ newHead, callback }) => {
        this.#positions.unshift(newHead);
        this.#pixelToDelete.push(this.#positions.pop());

        if(callback)
            callback();
    }

    moveRight = (callback) => {
        const head = this.#positions[0];
        let { x, y } = head;

        x += 1;

        if ( x > this.#maxX ) {
            x = 0
        }

        this.#executeChangeOfPixel({ newHead: { x, y }, callback });
    }

    moveLeft = (callback) => {
        const head = this.#positions[0];
        let { x, y } = head;

        x -= 1;

        if ( x < 0 ) {
            x = this.#maxX
        }

        this.#executeChangeOfPixel({ newHead: { x, y }, callback });
    }

    moveUp = (callback) => {
        const head = this.#positions[0];
        const positions = this.#board.getPositionsOfBoard();
        
        let { x, y } = head;

        y += 1;

        if(positions[y][x]){
            y -= 1
        }

        if ( y > this.#maxY ) {
            y = 0
        }
        

        this.#executeChangeOfPixel({ newHead: { x, y }, callback });
    }

    moveDown = (callback) => {
        const head = this.#positions[0];
        let { x, y } = head;

        y -= 1;

        if ( y < 0 ) {
            y = this.#maxY
        }

        this.#executeChangeOfPixel({ newHead: { x, y }, callback });
    }
}