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

export interface Size {
  width: number;
  height: number;
}

interface Game1ContextData {
  map: Map;
  color: string;
  pixelSize: string;
  setColor: Dispatch<SetStateAction<string>>;
  setPixelSize: Dispatch<SetStateAction<string>>;
}

const Game1Context = createContext<Game1ContextData>({} as Game1ContextData);

// const keyMap: { [key: string]: (frames: Frame[]) => boolean } = {};
interface KeyMap {
  key: string;
  command: string;
  snakeId: string;
}
const keyMap: KeyMap[] = [];

export interface Player {
  id: number;
  name: string;
  color: string;
  posX: number;
  posY: number;
}

export interface Sqm {
  id: number;
  posX: number;
  posY: number;
  content: Player;
}

export interface Map {
  id: number;
  width: number;
  height: number;
  sqms: Sqm[];
}
interface UpdateGame {
  setMap: React.Dispatch<React.SetStateAction<Map>>;
}

const updateGame = async ({ setMap }: UpdateGame): Promise<void> => {
  try {
    const map = await api.getMap();
    setMap(map);

    setTimeout(() => updateGame({ setMap }), 1000);
  } catch (error) {
    console.error(error);
    setTimeout(() => updateGame({ setMap }), 1000);
  }
};

export const Game1Provider: React.FC = ({ children }) => {
  const [map, setMap] = useState<Map>({
    id: 0,
    height: 0,
    width: 0,
    sqms: [],
  });
  const [pixelSize, setPixelSize] = useState('20px');
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    updateGame({ setMap });
  }, []);

  const Game1ContextData: Game1ContextData = {
    map,
    color,
    pixelSize,
    setColor,
    setPixelSize,
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
