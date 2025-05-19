import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Switch from './Switch';

describe('Switch', () => {
  test('renders correctly with initial props', () => {
    // Render the Switch component
    render(
      <Switch
        orientation=''
        centered={false}
        activated={false}
        label='testSwitch'
        clicked={() => {}}
      />
    );

    // Assert that the Switch component renders with the correct elements and attributes
    const switchInput = screen.getByRole('checkbox');
    const switchSlider = screen.getByLabelText('testSwitch');

    expect(switchInput).toBeInTheDocument();
    expect(switchInput.closest('label')).toBeInTheDocument();
    expect(switchSlider).toBeInTheDocument();
    expect(switchInput).not.toBeChecked();
  });

  test('calls the onClick callback function when clicked', () => {
    // Mock callback function
    const onClickMock = jest.fn();

    // Render the Switch component with mock callback
    render(
      <Switch
        orientation=''
        centered={false}
        activated={true}
        label='testSwitch'
        clicked={onClickMock}
      />
    );

    // Click the switch input
    const switchInput = screen.getByRole('checkbox');
    fireEvent.click(switchInput);

    // Assert that the onClick callback function is called
    expect(onClickMock).toHaveBeenCalled();
  });

  test('renders correctly with different orientation and centered props', () => {
    // Render the Switch component with different orientation and centered props
    render(
      <Switch
        orientation='horizontal'
        centered={true}
        activated={false}
        label='testSwitch'
        clicked={() => {}}
      />
    );

    // Assert that the Switch component renders with the correct classes and styles
    const switchLabel = screen.getByLabelText('testSwitch').closest('label');
    expect(switchLabel).toHaveClass('Switch horizontal');
    expect(switchLabel).toHaveStyle({ margin: 'auto' });
  });
});
