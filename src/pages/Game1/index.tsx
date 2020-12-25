import React, { useState } from 'react';
import { Commands } from '../../hooks/entities/Snake';
import { useGame1 } from '../../hooks/game1';
import Board from '../Board';

import { Container } from './styles';

const Game1: React.FC = () => {
  const [color, setColor] = useState('red');
  const [up, setUp] = useState('w');
  const [left, setLeft] = useState('a');
  const [down, setDown] = useState('s');
  const [right, setRight] = useState('d');

  const {
    createSnake,
    color: colorBoard,
    pixelSize,
    setPixelSize,
    height,
    width,
    setHeight,
    setWidth,
    setColor: setColorBoard,
  } = useGame1();

  return (
    <Container>
      <Board />
      <div>
        <span>height of Board</span>
        <input
          type="number"
          value={height}
          onChange={e => setHeight(Number(e.target.value))}
        />
      </div>
      <div>
        <span>width of Board</span>
        <input
          type="number"
          value={width}
          onChange={e => setWidth(Number(e.target.value))}
        />
      </div>
      <div>
        <span>Size of Frame Board</span>
        <input
          type="text"
          value={pixelSize}
          onChange={e => setPixelSize(e.target.value)}
        />
      </div>
      <div>
        <span>Color of Board</span>
        <select
          onChange={e => setColorBoard(e.target.value)}
          value={colorBoard}
        >
          <option value="black">Black</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
          <option value="Gray">Gray</option>
          <option value="Violet">Violet</option>
        </select>
      </div>
      <button
        onClick={() => {
          createSnake({ color, commands: { down, left, right, up } });
        }}
        type="button"
      >
        Add Snake
      </button>
      <div>
        <span>Color</span>
        <input
          type="text"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
      </div>
      <div>
        <span>Up</span>
        <input
          type="text"
          value={up}
          onChange={e => {
            return e.target;
          }}
          onKeyUp={e => setUp(e.key)}
        />
      </div>
      <div>
        <span>Left</span>
        <input
          type="text"
          value={left}
          onChange={e => {
            return e.target;
          }}
          onKeyUp={e => setLeft(e.key)}
        />
      </div>
      <div>
        <span>Down</span>
        <input
          type="text"
          value={down}
          onChange={e => {
            return e.target;
          }}
          onKeyUp={e => setDown(e.key)}
        />
      </div>
      <div>
        <span>Right</span>
        <input
          type="text"
          value={right}
          onChange={e => {
            return e.target;
          }}
          onKeyUp={e => setRight(e.key)}
        />
      </div>
    </Container>
  );
};

export default Game1;
