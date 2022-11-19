import FakeApiGame from './fakes/index';

class Api {
  private api: FakeApiGame;

  constructor() {
    this.api = new FakeApiGame();
  }

  get = async (route: string, params = undefined): Promise<any> => {
    if (route === '/') {
      return { body: this.api.getGame() };
    }
    return undefined;
  };

  post = async (route: string, params: any): Promise<any> => {
    if (route === '/snakes') {
      return {
        body: {
          snake: this.api.createSnake(params),
          frames: this.api.frames,
        },
      };
    }
    if (route === '/frames') {
      const { height, width } = params;
      this.api.setFrame(height, width);
      return { body: this.api.getGame() };
    }
    if (route.search('snakes') >= 0) {
      const { command, id } = params;
      console.log(this.api.snakes, id, params);
      if (command === 'down') {
        this.api.snakes[id].moveDown();
      }
    }
    return undefined;
  };
}
export default new Api();
