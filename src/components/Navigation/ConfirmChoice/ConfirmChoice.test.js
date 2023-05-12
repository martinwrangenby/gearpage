import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ConfirmChoice from './ConfirmChoice';

describe('ConfirmChoice', () => {
  it('should render the title and confirmation message', () => {
    render(<ConfirmChoice title="Test Confirmation" />);
    expect(screen.getByText('Test Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should call the confirm function when "Yes" is clicked', () => {
    const confirmMock = jest.fn();
    render(<ConfirmChoice confirm={confirmMock} />);
    fireEvent.click(screen.getByTestId('confirm'));
    expect(confirmMock).toHaveBeenCalled();
  });

  it('should call the reject function when "No" is clicked', () => {
    const rejectMock = jest.fn();
    render(<ConfirmChoice reject={rejectMock} />);
    fireEvent.click(screen.getByTestId('reject'));
    expect(rejectMock).toHaveBeenCalled();
  });
});
