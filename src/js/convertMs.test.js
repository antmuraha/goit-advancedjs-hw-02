import convertMs from './convertMs.js';
import assert from 'node:assert';
import { describe, it } from 'node:test';

describe('convertMs', () => {
  it('should convert 2000 ms to 0d 0h 0m 2s', () => {
    assert.deepStrictEqual(convertMs(2000), {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 2,
    });
  });

  it('should convert 140000 ms to 0d 0h 2m 20s', () => {
    assert.deepStrictEqual(convertMs(140000), {
      days: 0,
      hours: 0,
      minutes: 2,
      seconds: 20,
    });
  });

  it('should convert 24140000 ms to 0d 6h 42m 20s', () => {
    assert.deepStrictEqual(convertMs(24140000), {
      days: 0,
      hours: 6,
      minutes: 42,
      seconds: 20,
    });
  });
});
