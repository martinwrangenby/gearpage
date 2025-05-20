import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Backdrop from './Backdrop';

describe('Backdrop', () => {
  test('renders correctly with show prop as true', () => {
    // Render the Backdrop component with show prop as true
    const { container } = render(<Backdrop show={true} clicked={() => {}} />);

    // Assert that the Backdrop component renders with the correct element and class
    const backdropElement = container.querySelector('.Backdrop');
    expect(backdropElement).toBeInTheDocument();
    expect(backdropElement).toHaveClass('Backdrop');
  });

  test('renders correctly with show prop as false', () => {
    // Render the Backdrop component with show prop as false
    const { container } = render(<Backdrop show={false} clicked={() => {}} />);

    // Assert that the Backdrop component does not render any element
    const backdropElement = container.querySelector('.Backdrop');
    expect(backdropElement).toBeNull();
  });

  test('calls the onClick callback function when clicked', () => {
    // Mock callback function
    const onClickMock = jest.fn();

    // Render the Backdrop component with mock callback
    const { container } = render(<Backdrop show={true} clicked={onClickMock} />);

    // Click the backdrop element
    const backdropElement = container.querySelector('.Backdrop');
    fireEvent.click(backdropElement);

    // Assert that the onClick callback function is called
    expect(onClickMock).toHaveBeenCalled();
  });
});
