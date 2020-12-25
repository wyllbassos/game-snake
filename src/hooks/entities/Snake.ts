export interface CreateSnake {
  color: string;
  commands: Commands;
}

export interface Commands {
  down: string;
  right: string;
  left: string;
  up: string;
}

let numSnakesForId = 0;

export default class Snake {
  commands: Commands;

  color: string;

  id: string;

  constructor({ color, commands }: CreateSnake) {
    this.color = color;
    this.commands = commands;
    this.id = `snake${numSnakesForId}`;
    numSnakesForId += 1;
  }
}
