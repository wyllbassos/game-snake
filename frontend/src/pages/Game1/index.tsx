import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Player, useGame1 } from '../../hooks/game1';
import api from '../../services/api';
import Board from '../Board';

import { Container } from './styles';

const socket = io('http://localhost:8080');

const Game1: React.FC = () => {
  const [color, setColor] = useState('#ff0000');
  // const [up, setUp] = useState('w');
  // const [left, setLeft] = useState('a');
  // const [down, setDown] = useState('s');
  // const [right, setRight] = useState('d');
  const [player, setPlayer] = useState<Player>();

  const {
    color: colorBoard,
    pixelSize,
    setPixelSize,
    setColor: setColorBoard,
    map,
    setMap,
  } = useGame1();

  useEffect(() => {
    socket.on('disconnect', reason => {
      console.log(socket.disconnected, reason); // true
      // setTimeout(socket.)
    });

    socket.on('map', a => {
      console.log('map', a);
      setMap(a);
    });

    // api
    //   .addPlayer({
    //     color,
    //     name: `nome_${color}`,
    //   })
    //   .then(newPlayer => {
    //     setPlayer(newPlayer);
    //   });

    return () => {
      socket.off('map');
    };
  }, [setMap, color]);

  return (
    <Container>
      <Board />
      <div>
        <span>height of Board</span>
        <input
          type="number"
          value={map.height}
          onChange={e => {
            api.setMapSize({
              height: Number(e.target.value),
              width: map.width,
            });
          }}
        />
      </div>
      <div>
        <span>width of Board</span>
        <input
          type="number"
          value={map.width}
          onChange={e => {
            api.setMapSize({
              height: map.height,
              width: Number(e.target.value),
            });
          }}
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
        <span>Color of Map</span>
        <input
          type="color"
          value={colorBoard}
          onChange={e => setColorBoard(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          socket.emit('addNewPlayer', {
            color,
            name: `nome_${color}`,
          });
          // api.addPlayer({
          //   color,
          //   name: `nome_${color}`,
          // });
        }}
        type="button"
      >
        Add Player
      </button>
      <div>
        <span>Color</span>
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
      </div>
      {/* <div>
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
      </div> */}
    </Container>
  );
};

export default Game1;
