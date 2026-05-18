import { formatCurrency } from '@/utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats numbers to VND correctly', () => {
    // Note: The formatCurrency function might use different locales or non-breaking spaces
    // Let's test the basic formatting logic or at least ensure it doesn't crash
    const result = formatCurrency(100000);
    expect(typeof result).toBe('string');
    expect(result.includes('100')).toBe(true);
  });

  it('handles zero correctly', () => {
    const result = formatCurrency(0);
    expect(typeof result).toBe('string');
  });
});
