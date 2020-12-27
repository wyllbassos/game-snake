export interface CreateSnake {
  color: string;
  position: number;
  maxPosition: number;
}

let numSnakesForId = 0;

interface KeyMap {
  [key: string]: () => boolean;
}

export default class Snake {
  positions: number[];

  color: string;

  id: number;

  maxPosition: number;

  constructor({ color, position, maxPosition }: CreateSnake) {
    this.color = color;
    this.id = numSnakesForId;
    numSnakesForId += 1;
    this.positions = [position];
    this.maxPosition = maxPosition;
  }

  moveRight = (): boolean => {
    let position = this.positions[0];

    position += 1;

    this.positions[0] = position;

    return true;
  };

  moveLeft = (): boolean => {
    let position = this.positions[0];

    position -= 1;

    this.positions[0] = position;

    return true;
  };

  moveUp = (): boolean => {
    let position = this.positions[0];

    position -= this.maxPosition;

    this.positions[0] = position;

    return true;
  };

  moveDown = (): boolean => {
    let position = this.positions[0];

    position += this.maxPosition;

    this.positions[0] = position;

    return true;
  };
}
