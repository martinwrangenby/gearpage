import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from './Settings';
import { useSettings } from '../../hoc/Context/SettingsContext';

// Mock useSettings hook
jest.mock('../../hoc/Context/SettingsContext');

const mockUpdateSettings = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<Settings />', () => {
  test('renders Settings page header', () => {
    useSettings.mockReturnValue({
      settings: { showPrice: false },
      updateSettings: mockUpdateSettings,
    });

    render(<Settings />);
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  });

  test('renders "Show sold gear" switch', () => {
    useSettings.mockReturnValue({
      settings: { showPrice: false },
      updateSettings: mockUpdateSettings,
    });

    render(<Settings />);
    const soldGearSwitch = screen.getByLabelText(/show sold gear/i);
    expect(soldGearSwitch).toBeInTheDocument();
  });

  test('renders "Display price in list" switch as checked when showPrice is true', () => {
    useSettings.mockReturnValue({
      settings: { showPrice: true },
      updateSettings: mockUpdateSettings,
    });

    render(<Settings />);
    const priceSwitch = screen.getByLabelText(/display price in list/i);
    expect(priceSwitch).toBeChecked();
  });

  test('renders "Display price in list" switch as unchecked when showPrice is false', () => {
    useSettings.mockReturnValue({
      settings: { showPrice: false },
      updateSettings: mockUpdateSettings,
    });

    render(<Settings />);
    const priceSwitch = screen.getByLabelText(/display price in list/i);
    expect(priceSwitch).not.toBeChecked();
  });

  test('clicking "Display price in list" calls updateSettings with toggled value', async () => {
    const user = userEvent.setup();
    useSettings.mockReturnValue({
      settings: { showPrice: true },
      updateSettings: mockUpdateSettings,
    });

    render(<Settings />);
    const priceSwitch = screen.getByLabelText(/display price in list/i);
    await user.click(priceSwitch);
    expect(mockUpdateSettings).toHaveBeenCalledWith({ showPrice: false });
  });
});
