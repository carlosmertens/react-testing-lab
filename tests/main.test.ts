import { it, expect, describe } from 'vitest';

describe('environment setup', () => {
  it('should run test', async () => {
    const response = await fetch('/categories');
    const data = await response.json();
    console.log(data);
    expect(data).toHaveLength(3);
  });
});
