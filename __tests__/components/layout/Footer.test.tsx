import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer Component', () => {
  it('renders footer text', () => {
    render(<Footer />);
    expect(screen.getAllByText(/TOYKINGDOM/i).length).toBeGreaterThan(0);
  });
});
