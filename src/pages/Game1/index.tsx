import React from 'react';
import Board from '../Board';

const props = {
  initHeight: 15,
  initWidth: 15,
  initPixelSize: 30,
  initColor: 'black',
};

// import { Container } from './styles';

const Game1: React.FC = () => {
  return <Board {...props} />;
};

export default Game1;
