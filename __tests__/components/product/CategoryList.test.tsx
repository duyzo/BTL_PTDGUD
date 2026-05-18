import React from 'react';
import { render, screen } from '@testing-library/react';
import { CategoryList } from '@/components/product/CategoryList';

describe('CategoryList', () => {
  it('renders title', () => {
    render(<CategoryList />);
    expect(screen.getByText('Danh mục nổi bật')).toBeInTheDocument();
  });
});
