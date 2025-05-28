import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  test('should render without errors', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

