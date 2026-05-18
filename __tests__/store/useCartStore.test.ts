import { renderHook } from '@testing-library/react';
import { useCartStore } from '@/store/useCartStore';

describe('useCartStore', () => {
  it('should have empty cart initially', () => {
    const { result } = renderHook(() => useCartStore());
    expect(result.current.cart).toEqual([]);
    expect(result.current.cartTotal).toBe(0);
  });
});
