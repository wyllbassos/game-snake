import Snake from './Snake';

export default class Frame {
  id: number;

  free: boolean;

  object?: Snake;

  constructor(id: number) {
    this.free = true;
    this.id = id;
  }
}
