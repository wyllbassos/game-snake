import Frame from './entities/Frame';
import Snake from './entities/Snake';

interface InsertSnake {
  color: string;
}

function createBoardFrame(size: number): Frame[] {
  const boardFrame: Frame[] = [];
  for (let index = 0; index < size; index += 1) {
    const frame: Frame = new Frame(index);
    boardFrame.push(frame);
  }
  return boardFrame;
}

export default class FakeApiGame {
  height = 3;

  width = 3;

  frames: Frame[] = createBoardFrame(this.height * this.width);

  snakes: Snake[] = [];

  createSnake = (colorSnake: string): Snake | undefined => {
    // localStorage.removeItem('@GoBarber:token');
    // localStorage.removeItem('@GoBarber:user');
    const freeFrames = this.frames.filter(frame => frame.free);
    if (freeFrames.length) {
      const snake = new Snake({
        color: colorSnake,
        maxPosition: this.height * this.width,
        position: freeFrames[0].id,
      });

      const freeFrame: Frame = new Frame(freeFrames[0].id); // { ...freeFrames[0] };
      freeFrame.free = false;
      freeFrame.object = snake;

      this.frames[freeFrame.id] = freeFrame;
      return snake;
      // console.log(newFrames);
    }
    return undefined;
  };

  getGame = (): FakeApiGame => {
    return this;
  };

  setFrame = (height: number, width: number): void => {
    this.height = height;
    this.width = width;
    this.frames = createBoardFrame(this.height * this.width);
  };
}
