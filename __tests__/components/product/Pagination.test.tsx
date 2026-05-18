import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pagination } from '@/components/product/Pagination';

describe('Pagination Component', () => {
  it('renders nothing if totalPages is 1 or less', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />);
    expect(container.firstChild).toBeNull();
  });
});
