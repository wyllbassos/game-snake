import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Snake, { Commands, CreateSnake } from './entities/Snake';
import Frame from './entities/Frame';

interface InsertSnake {
  color: string;
  commands: Commands;
}

interface Game1ContextData {
  height: number;
  width: number;
  color: string;
  frames: Frame[];
  pixelSize: string;
  createSnake(data: InsertSnake): void;
  setColor: Dispatch<SetStateAction<string>>;
  setPixelSize: Dispatch<SetStateAction<string>>;
  setHeight: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
}

const Game1Context = createContext<Game1ContextData>({} as Game1ContextData);

function createBoardFrame(size: number): Frame[] {
  const boardFrame: Frame[] = [];
  for (let index = 0; index < size; index += 1) {
    const frame: Frame = new Frame(index);
    boardFrame.push(frame);
  }
  return boardFrame;
}

const KeyMap: { [key: string]: (frames: Frame[]) => boolean } = {};

export const Game1Provider: React.FC = ({ children }) => {
  const [height, setHeight] = useState(3);
  const [width, setWidth] = useState(3);
  const [pixelSize, setPixelSize] = useState('40px');
  const [color, setColor] = useState('black');
  const [frames, setFrames] = useState<Frame[]>((): Frame[] =>
    createBoardFrame(height * width),
  );
  const [snakes, setSnakes] = useState<Snake[]>([]);

  useEffect(() => {
    const execCommand = (e: KeyboardEvent): void => {
      const { key } = e;
      const command = KeyMap[key];
      if (command) {
        command(frames);
      }
    };
    document.body.onkeyup = execCommand;
  }, [frames]);

  useEffect(() => {
    setFrames(createBoardFrame(height * width));
  }, [height, width]);

  const setSnake = useCallback(
    (snake: Snake) => {
      const newSnakes = [...snakes];
      const indexSnake = snakes.findIndex(
        snakeFind => snakeFind.id === snake.id,
      );
      console.log(frames, snake);
      if (snakes[indexSnake]) {
        newSnakes[indexSnake] = snakes[indexSnake];
        setSnakes(newSnakes);

        // setFrames(frames);
      }
    },
    [snakes, frames],
  );

  const createSnake = useCallback(
    ({ color: colorSnake, commands }: InsertSnake) => {
      // localStorage.removeItem('@GoBarber:token');
      // localStorage.removeItem('@GoBarber:user');
      const freeFrames = frames.filter(frame => frame.free);
      if (freeFrames.length) {
        const snake = new Snake({
          color: colorSnake,
          commands,
          setSnake,
          maxPosition: height * width,
          position: freeFrames[0].id,
        });
        Object.assign(KeyMap, {
          [commands.down]: snake.moveDown,
          [commands.up]: snake.moveUp,
          [commands.left]: snake.moveLeft,
          [commands.right]: snake.moveRight,
        });
        const newSnakes = [...snakes, snake];
        setSnakes(newSnakes);

        const freeFrame: Frame = new Frame(freeFrames[0].id); // { ...freeFrames[0] };
        freeFrame.free = false;
        freeFrame.object = snake;

        const newFrames = [...frames];
        newFrames[freeFrame.id] = freeFrame;
        setFrames(newFrames);
        // console.log(newFrames);
      } else {
        alert('No Have free space in Board');
      }
    },
    [snakes, frames, height, width, setSnake],
  );

  const Game1ContextData: Game1ContextData = {
    height,
    width,
    color,
    frames,
    pixelSize,
    createSnake,
    setColor,
    setPixelSize,
    setHeight,
    setWidth,
  };

  return (
    <Game1Context.Provider value={Game1ContextData}>
      {children}
    </Game1Context.Provider>
  );
};

export const useGame1 = (): Game1ContextData => {
  const context = useContext(Game1Context);

  if (!context) {
    throw new Error('useBoard must be used withn a Game1Provider');
  }

  return context;
};
