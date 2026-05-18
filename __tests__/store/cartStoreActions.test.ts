import { renderHook, act } from '@testing-library/react';
import { useCartStore } from '@/store/useCartStore';

describe('useCartStore actions', () => {
  it('should allow clearing the cart', () => {
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.cart).toEqual([]);
  });
});
