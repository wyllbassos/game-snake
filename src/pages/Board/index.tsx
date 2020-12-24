import React, { useEffect, useState } from 'react';

import { Container, Line, Pixel } from './styles';

interface CreateBoard {
  initHeight: number;
  initWidth: number;
  initPixelSize: number;
  initColor: string;
}

interface Pixel {
  id: string;
  free: boolean;
  x: number;
  y: number;
  idObject: string;
}

interface Snake {
  o: '';
}

const getIdPixel = (x: number, y: number): string => `X${x}Y${y}`;

const Board: React.FC<CreateBoard> = ({
  initHeight,
  initWidth,
  initPixelSize,
  initColor,
}) => {
  const [height, setHeight] = useState(initHeight);
  const [width, setWidth] = useState(initWidth);
  const [pixelSize, setPixelSize] = useState(initPixelSize);
  const [color, setColor] = useState(initColor);
  const [board, setBoard] = useState(document.createElement('div'));
  const [snakes, setSnakes] = useState<Snake[]>([]);
  const [positionsOfBoard, setPositionsOfBoard] = useState<Pixel[][]>([[]]);

  useEffect(() => {
    const newPositionsOfBoard: Pixel[][] = [];
    const maxY = height - 1;
    const maxX = width - 1;
    for (let y = 0; y <= maxY; y += 1) {
      newPositionsOfBoard.push([]);
      for (let x = 0; x <= maxX; x += 1) {
        newPositionsOfBoard[y].push({
          id: getIdPixel(x, y),
          free: true,
          idObject: '',
          x,
          y,
        });
      }
    }
    setPositionsOfBoard(newPositionsOfBoard);
  }, [height, width]);

  return (
    <Container>
      {positionsOfBoard[0].length ? (
        positionsOfBoard.map((line, l) => {
          return (
            <Line key={`line${line[0].y}`}>
              {line.map(pixel => {
                return (
                  <Pixel key={pixel.id} props={{ height, width, color }} />
                );
              })}
            </Line>
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
