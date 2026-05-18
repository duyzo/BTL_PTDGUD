import { getProducts } from '@/utils/productStore';

describe('productStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return products array', () => {
    const products = getProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });
});
