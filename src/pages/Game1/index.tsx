import React from 'react';
import { Commands } from '../../hooks/entities/Snake';
import { useGame1 } from '../../hooks/game1';
import Board from '../Board';

import { Container } from './styles';

const commandsSnake1: Commands = {
  up: 'w',
  left: 'a',
  down: 's',
  right: 'd',
};

const commandsSnake2: Commands = {
  up: 'ArrowUp',
  left: 'ArrowLeft',
  down: 'ArrowDown',
  right: 'ArrowRight',
};

const Game1: React.FC = () => {
  const { createSnake } = useGame1();
  return (
    <Container>
      <Board />
      <button
        onClick={() => createSnake({ color: 'red', commands: commandsSnake1 })}
        type="button"
      >
        Add Snake
      </button>
    </Container>
  );
};

export default Game1;
