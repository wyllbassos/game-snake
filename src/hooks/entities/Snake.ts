import Frame from './Frame';

export interface CreateSnake {
  color: string;
  commands: Commands;
  position: number;
  maxPosition: number;
  setSnake(snake: Snake): void;
}

export interface Commands {
  down: string;
  right: string;
  left: string;
  up: string;
}

let numSnakesForId = 0;

interface KeyMap {
  [key: string]: (frames: Frame[]) => boolean;
}

export default class Snake {
  positions: number[];

  commands: Commands;

  color: string;

  id: string;

  maxPosition: number;

  setSnake: (snake: Snake) => void;

  private keyMap: KeyMap;

  constructor({
    color,
    commands,
    position,
    setSnake,
    maxPosition,
  }: CreateSnake) {
    this.color = color;
    this.commands = commands;
    this.id = `snake${numSnakesForId}`;
    numSnakesForId += 1;
    this.keyMap = {
      [commands.right]: this.moveRight,
    };
    this.positions = [position];
    this.setSnake = setSnake;
    this.maxPosition = maxPosition;
  }

  moveRight = (frames: Frame[]): boolean => {
    let index = this.positions[0];

    index += 1;

    if (frames[index] && !frames[index].free) {
      return false;
    }

    this.positions[0] = index;

    this.setSnake(this);

    return true;
  };

  moveLeft = (frames: Frame[]): boolean => {
    let index = this.positions[0];

    index -= 1;

    if (frames[index] && !frames[index].free) {
      return false;
    }

    this.positions[0] = index;

    this.setSnake(this);

    return true;
  };

  moveUp = (frames: Frame[]): boolean => {
    let index = this.positions[0];

    index += 1;

    if (frames[index] && !frames[index].free) {
      return false;
    }

    this.positions[0] = index;

    this.setSnake(this);

    return true;
  };

  moveDown = (frames: Frame[]): boolean => {
    let index = this.positions[0];

    index += 1;

    if (frames[index] && !frames[index].free) {
      return false;
    }

    this.positions[0] = index;

    this.setSnake(this);

    return true;
  };
}
