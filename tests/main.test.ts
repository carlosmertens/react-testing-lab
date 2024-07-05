import { db } from './mocks/db';

describe('environment setup', () => {
  const product = db.product.create();
  // console.log(product);
  it('should run test', () => {
    expect(product.price).toBeGreaterThan(0);
  });
});
