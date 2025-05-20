import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ConfirmChoice from './ConfirmChoice';

describe('ConfirmChoice', () => {
  it('should render the confirmation message', () => {
    render(<ConfirmChoice/>);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should call the confirm function when "Yes" is clicked', () => {
    const confirmMock = jest.fn();
    render(<ConfirmChoice confirm={confirmMock} />);
    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    expect(confirmMock).toHaveBeenCalled();
  });

  it('should call the reject function when "No" is clicked', () => {
    const rejectMock = jest.fn();
    render(<ConfirmChoice reject={rejectMock} />);
    fireEvent.click(screen.getByRole('button', { name: 'No' }));
    expect(rejectMock).toHaveBeenCalled();
  });
});
