import Board from './Board.js';
import Snake from './Snake.js';
import renderSnake from './RenderSnake.js';

const height = 20;
const width = 40;

const board = new Board({
    height,
    width,
    pixelSize: 15,
    color: 'black'
});

const snake1 = new Snake({
    positionX: 0,
    positionY: 0,
    color: 'red',
    maxX: width - 1,
    maxY: height - 1,
    board,
})

const snake2 = new Snake({
    positionX: 0,
    positionY: 1,
    color: 'green',
    maxX: width - 1,
    maxY: height - 1,
    board,
})

board.registerSnake(snake1)
board.registerSnake(snake2)

board.drawBoard();

board.update();

const keyMap = {
    'd': () => {
        snake1.moveRight(() => board.update());
    },
    'a': () => {
        snake1.moveLeft(() => board.update());
    },
    'w': () => {
        snake1.moveUp(() => board.update());
    },
    's': () => {
        snake1.moveDown(() => board.update());
    },
    'ArrowRight': () => {
        snake2.moveRight(() => board.update());
    },
    'ArrowLeft': () => {
        snake2.moveLeft(() => board.update());
    },
    'ArrowUp': () => {
        snake2.moveUp(() => board.update());
    },
    'ArrowDown': () => {
        snake2.moveDown(() => board.update());
    }
}

window.addEventListener('keyup', event => {
    const key = event.key;
    const command = keyMap[key];
    if (command){
        command();
    }
})
