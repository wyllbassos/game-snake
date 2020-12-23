import { getIdPixel } from './Board.js'

export default function renderSnake({ snake, board }) {
    const paintPixel = (x, y, color) => {
        const pixel = document.querySelector('#' + getIdPixel(x, y));
        pixel.style.backgroundColor = color;
    }

    const pixelsToPaint = snake.getPositions();
    const { x, y } = pixelsToPaint[0];
    const colorSnake = snake.getColor();

    paintPixel(x, y, colorSnake);

    const pixelToDelete = snake.getPixelToDelete();
    if(pixelToDelete.length > 0) {
        const { x: xDelete, y: yDelete } = pixelToDelete[0];
        const colorBoard = board.getColor();
        paintPixel(xDelete, yDelete, colorBoard);
        snake.resetPixelToDelete();
    }
}