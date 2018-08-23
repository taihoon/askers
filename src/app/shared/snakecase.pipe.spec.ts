import { SnakecasePipe } from './snakecase.pipe';

describe('SnakecasePipe', () => {
  it('create an instance', () => {
    const pipe = new SnakecasePipe();
    expect(pipe).toBeTruthy();
  });
});
