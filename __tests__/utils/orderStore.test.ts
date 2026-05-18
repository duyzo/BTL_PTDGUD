import { getOrders } from '@/utils/orderStore';

describe('orderStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial mock orders when localStorage is empty', () => {
    const orders = getOrders();
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThan(0);
  });
});
