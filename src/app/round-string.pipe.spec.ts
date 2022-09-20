import { RoundStringPipe } from './round-string.pipe';

describe('RoundStringPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundStringPipe();
    expect(pipe).toBeTruthy();
  });
});
