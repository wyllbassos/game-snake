import axios from 'axios';
import { Map, Size } from '../../hooks/game1';

export interface NewPlayer {
  name: string;
  color: string;
}

class Api {
  private api = axios.create({
    baseURL: 'http://localhost:8080',
  });

  getMap = async (): Promise<Map> => {
    const { data } = await this.api.get<Map>('map');

    return data;
  };

  setMapSize = async (size: Size): Promise<void> => {
    await this.api.patch('map/size', size);
  };

  addPlayer = async (newPlayer: NewPlayer): Promise<void> => {
    await this.api.post('player', newPlayer);
  };
}

const api = new Api();

export default api;
