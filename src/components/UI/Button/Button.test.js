import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button component', () => {
  test('should render with the correct text', () => {
    const buttonText = 'Click me!';
    render(<Button>{buttonText}</Button>);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  test('should call the onClick function when clicked', async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    render(<Button clicked={onClickMock}>Click me!</Button>);
    await user.click(screen.getByText('Click me!'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('should be disabled when the disabled prop is true', () => {
    render(<Button disabled>Click me!</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('should have the correct button type', () => {
    render(<Button type="submit">Click me!</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  test('should have the correct buttonType class', () => {
    render(<Button buttonType="primary">Click me!</Button>);
    expect(screen.getByRole('button')).toHaveClass('Button', 'primary');
  });
});
