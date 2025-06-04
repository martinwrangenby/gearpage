import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToolbarMenu from './ToolbarMenu';
import { use } from 'react';

describe('ToolbarMenu', () => {
  test('should call handleMenuChoice with "settings" when settings option is clicked', () => {
    const handleMenuChoice = jest.fn();
    render(<ToolbarMenu handleMenuChoice={handleMenuChoice} />);
    const settingsOption = screen.getByRole('menuitem', { name: 'Settings' });

    userEvent.click(settingsOption);

    expect(handleMenuChoice).toHaveBeenCalledWith('settings');
  });

  test('should call handleMenuChoice with "logout" when sign out option is clicked', () => {
    const handleMenuChoice = jest.fn();
    render(<ToolbarMenu handleMenuChoice={handleMenuChoice} />);
    const logoutOption = screen.getByRole('menuitem', { name: 'Sign out' });

    userEvent.click(logoutOption);

    expect(handleMenuChoice).toHaveBeenCalledWith('logout');
  });
});
