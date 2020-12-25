import React, { createContext, useCallback, useContext, useState } from 'react';
import Snake, { CreateSnake } from './entities/Snake';
import Frame from './entities/Frame';

interface Game1ContextData {
  height: number;
  width: number;
  color: string;
  frames: Frame[];
  pixelSize: string;
  createSnake(data: CreateSnake): void;
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

export const Game1Provider: React.FC = ({ children }) => {
  const [height, setHeight] = useState(3);
  const [width, setWidth] = useState(3);
  const [pixelSize, setPixelSize] = useState('40px');
  const [color, setColor] = useState('black');
  const [frames, setFrames] = useState<Frame[]>((): Frame[] =>
    createBoardFrame(height * width),
  );
  const [snakes, setSnakes] = useState<Snake[]>([]);

  const createSnake = useCallback(
    ({ color: colorSnake, commands }: CreateSnake) => {
      // localStorage.removeItem('@GoBarber:token');
      // localStorage.removeItem('@GoBarber:user');
      const freeFrames = frames.filter(frame => frame.free);
      if (freeFrames.length) {
        const snake = new Snake({ color: colorSnake, commands });

        const newSnakes = [...snakes, snake];
        setSnakes(newSnakes);

        const freeFrame: Frame = new Frame(freeFrames[0].id); // { ...freeFrames[0] };
        freeFrame.free = false;
        freeFrame.idObject = snake.id;
        freeFrame.object = snake;

        const newFrames = [...frames];
        newFrames[freeFrame.id] = freeFrame;
        setFrames(newFrames);
        console.log(newFrames);
      } else {
        alert('No Have free space in Board');
      }
    },
    [snakes, frames],
  );

  const Game1ContextData: Game1ContextData = {
    height,
    width,
    color,
    frames,
    pixelSize,
    createSnake,
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
