import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('should render with the correct text', () => {
    const buttonText = 'Click me!';
    render(<Button>{buttonText}</Button>);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  test('should render with the correct data-testid attribute', () => {
    const buttonTestId = 'test-button';
    render(<Button dataTestId={buttonTestId}>Click me!</Button>);
    expect(screen.getByTestId(buttonTestId)).toBeInTheDocument();
  });

  test('should call the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button clicked={onClickMock}>Click me!</Button>);
    fireEvent.click(screen.getByText('Click me!'));
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
