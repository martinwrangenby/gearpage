import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmChoice from './ConfirmChoice';

describe('ConfirmChoice', () => {
  it('should render the confirmation message', () => {
    render(<ConfirmChoice/>);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should call the confirm function when "Yes" is clicked', () => {
    const confirmMock = jest.fn();
    render(<ConfirmChoice confirm={confirmMock} />);
    userEvent.click(screen.getByRole('button', { name: 'Yes' }));
    expect(confirmMock).toHaveBeenCalled();
  });

  it('should call the reject function when "No" is clicked', () => {
    const rejectMock = jest.fn();
    render(<ConfirmChoice reject={rejectMock} />);
    userEvent.click(screen.getByRole('button', { name: 'No' }));
    expect(rejectMock).toHaveBeenCalled();
  });
});
