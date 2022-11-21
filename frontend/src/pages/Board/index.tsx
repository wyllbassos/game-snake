import React, { useEffect } from 'react';

import { useGame1 } from '../../hooks/game1';

import { Container, Sqm } from './styles';

// const getIdPixel = (x: number, y: number): string => `X${x}Y${y}`;

const Board: React.FC = () => {
  const { pixelSize, color, map } = useGame1();

  // map.sqms.forEach(sqm => {
  //   console.log('sqm', sqm);
  //   console.log('content', sqm.content);
  // });

  // console.log(map);

  return (
    <Container
      height={map.height}
      width={map.width}
      pixelSize={pixelSize}
      color={color}
    >
      {map.sqms.map(({ id, content }) =>
        content ? (
          <Sqm
            key={id}
            posX={content.posX}
            posY={content.posY}
            pixelSize={pixelSize}
            color={content.color}
          />
        ) : null,
      )}
    </Container>
  );
};

export default Board;
