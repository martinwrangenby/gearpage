import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ToolbarMenu from './ToolbarMenu';

describe('ToolbarMenu', () => {
  test('should call handleMenuChoice with "settings" when settings option is clicked', () => {
    const handleMenuChoice = jest.fn();
    render(<ToolbarMenu handleMenuChoice={handleMenuChoice} />);
    const settingsOption = screen.getByTestId('toolbarMenuSettings');

    fireEvent.click(settingsOption);

    expect(handleMenuChoice).toHaveBeenCalledWith('settings');
  });

  test('should call handleMenuChoice with "logout" when sign out option is clicked', () => {
    const handleMenuChoice = jest.fn();
    render(<ToolbarMenu handleMenuChoice={handleMenuChoice} />);
    const logoutOption = screen.getByTestId('toolbarMenuLogout');

    fireEvent.click(logoutOption);

    expect(handleMenuChoice).toHaveBeenCalledWith('logout');
  });
});
