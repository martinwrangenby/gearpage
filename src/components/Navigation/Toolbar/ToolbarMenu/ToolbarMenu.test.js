import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToolbarMenu from './ToolbarMenu';

describe('ToolbarMenu', () => {
  test('should call handleMenuChoice with "settings" when settings option is clicked', async () => {
    const user = userEvent.setup();
    const handleMenuChoice = jest.fn();
    render(<ToolbarMenu handleMenuChoice={handleMenuChoice} />);
    const settingsOption = screen.getByRole('menuitem', { name: 'Settings' });

    await user.click(settingsOption);

    expect(handleMenuChoice).toHaveBeenCalledWith('settings');
  });

  test('should call handleMenuChoice with "logout" when sign out option is clicked', async () => {
    const user = userEvent.setup();
    const handleMenuChoice = jest.fn();
    render(<ToolbarMenu handleMenuChoice={handleMenuChoice} />);
    const logoutOption = screen.getByRole('menuitem', { name: 'Sign out' });

    await user.click(logoutOption);

    expect(handleMenuChoice).toHaveBeenCalledWith('logout');
  });
});
