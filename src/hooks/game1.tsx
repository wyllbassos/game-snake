import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';

interface Snake {
  positions: number[];
  color: string;
  id: string;
  maxPosition: number;
}

interface Frame {
  id: number;
  free: boolean;
  object?: Snake;
}
export interface Commands {
  down: string;
  right: string;
  left: string;
  up: string;
}

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

// const keyMap: { [key: string]: (frames: Frame[]) => boolean } = {};
interface KeyMap {
  key: string;
  command: string;
  snakeId: string;
}
const keyMap: KeyMap[] = [];

// const fakeApiGame = new FakeApiGame();

interface UpdateGame {
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setFrames: React.Dispatch<React.SetStateAction<Frame[]>>;
}

const updateGame = async (params: UpdateGame): Promise<void> => {
  const { setHeight, setWidth, setFrames } = params;
  const response = await api.get('/');
  const { height, width, frames } = response.body;
  setHeight(height);
  setWidth(width);
  // console.log(response);
  setFrames([...frames]);
  document.onkeydown = e => {
    const { key: keyPress } = e;
    console.log(keyPress);
    keyMap.map(async mapCommand => {
      const { command, key, snakeId } = mapCommand;
      if (key === keyPress) {
        api
          .post(`/snakes/${snakeId}`, { command, id: snakeId })
          .then(responseCommand => {
            console.log(responseCommand);
          });
      }
    });
  };
  // updateGame({ setHeight, setWidth, setFrames });
  setTimeout(() => updateGame({ setHeight, setWidth, setFrames }), 50);
};

export const Game1Provider: React.FC = ({ children }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [pixelSize, setPixelSize] = useState('40px');
  const [color, setColor] = useState('black');
  const [frames, setFrames] = useState<Frame[]>([]);

  useEffect(() => {
    updateGame({ setHeight, setWidth, setFrames });
  }, []);

  useEffect(() => {
    if (height > 0 && width > 0) {
      api.post('/frames', {
        height,
        width,
      }); /* .then(response => {
        const { frames: newFrames } = response.body;
        setFrames([...newFrames]);
      }); */
    }
  }, [height, width]);

  const createSnake = useCallback(
    ({ color: colorSnake, commands }: InsertSnake) => {
      // localStorage.removeItem('@GoBarber:token');
      // localStorage.removeItem('@GoBarber:user');
      api.post('/snakes', colorSnake).then(response => {
        const { snake, frames: newFrames } = response.body;
        if (!snake) {
          throw new Error('No Have free space in Board');
        }
        const { down, left, right, up } = commands;
        keyMap.push({ key: down, command: 'down', snakeId: snake.id });
        keyMap.push({ key: left, command: 'left', snakeId: snake.id });
        keyMap.push({ key: right, command: 'right', snakeId: snake.id });
        keyMap.push({ key: up, command: 'up', snakeId: snake.id });
        // console.log(newFrames);
        // setFrames([...newFrames]);
      });
    },
    [],
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
