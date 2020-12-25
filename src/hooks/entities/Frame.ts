import Snake from './Snake';

export default class Frame {
  id: number;

  free: boolean;

  x?: number;

  y?: number;

  idObject?: string;

  object?: Snake;

  constructor(id: number) {
    this.free = true;
    this.id = id;
  }
}
