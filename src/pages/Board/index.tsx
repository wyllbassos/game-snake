import React from 'react';
import { useGame1 } from '../../hooks/game1';

import { Container, Frame } from './styles';

// const getIdPixel = (x: number, y: number): string => `X${x}Y${y}`;

const Board: React.FC = () => {
  const { frames, pixelSize, color, height, width } = useGame1();

  return (
    <Container height={height} width={width}>
      {frames[0] ? (
        frames.map(frame => {
          return (
            <Frame
              key={frame.id}
              props={{
                size: pixelSize,
                color: frame.object ? frame.object.color : color,
              }}
            />
          );
        })
      ) : (
        <div>Carregando</div>
      )}
    </Container>
  );

  // const createPixel = (id: string) => {
  //   const pixel = document.createElement('div');
  //   pixel.style.height = `${pixelSize}px`;
  //   pixel.style.width = `${pixelSize}px`;
  //   pixel.style.backgroundColor = color;
  //   return pixel;
  // };

  // registerSnake(snake: Snake) {
  //   const maxX = width - 1;
  //   const maxY = height - 1;

  //   const filterPositionsFree = positionsOfBoard.filter(
  //     pixel => pixel.free,
  //   );

  //   if (!filterPositionsFree.length) {
  //     alert('Sem Espaço na Tela');
  //     throw Error('Board With out free space');
  //     return;
  //   }

  //   const { x, y } = filterPositionsFree[0];
  //   filterPositionsFree[0].free = false;

  //   snake.registerBoard({ board: this, x, y, maxX, maxY });

  //   snakes.push(snake);
  // }

  // update() {
  //   //resetPositions();
  //   snakes.forEach((snake, i) => {
  //     const positions = snake.getPositions()[0];
  //     const { x, y } = positions;
  //     const pixel = positionsOfBoard.filter(
  //       pixel => pixel.id === getIdPixel(x, y),
  //     );
  //     if (pixel.length) {
  //       pixel[0].free = false;
  //       pixel[0].id = 'snake' + i;
  //       pixel[0].x = x;
  //       pixel[0].y = y;
  //     }
  //     renderSnake({ board: this, snake });
  //   });
  // }
};

export default Board;
