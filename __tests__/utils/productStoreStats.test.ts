import { getStats } from '@/utils/productStore';

describe('getStats', () => {
  it('should return an object with total counts', () => {
    const stats = getStats();
    expect(stats).toHaveProperty('totalProducts');
    expect(stats).toHaveProperty('totalUsers');
    expect(stats).toHaveProperty('totalOrders');
  });
});
