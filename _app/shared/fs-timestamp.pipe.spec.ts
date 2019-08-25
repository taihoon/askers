import { FsTimestampPipe } from './fs-timestamp.pipe';

describe('FsTimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new FsTimestampPipe();
    expect(pipe).toBeTruthy();
  });
});
