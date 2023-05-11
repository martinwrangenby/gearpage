import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IconButton from './IconButton';

describe('IconButton Component', () => {
  let clickHandler;

  beforeEach(() => {
    clickHandler = jest.fn();
  });

  test('renders an icon button with correct type class', () => {
    const { getByTestId } = render(
      <IconButton
        type="fa fa-heart"
        dataTestId="icon-button"
        clicked={clickHandler}
      />
    );

    const iconButton = getByTestId('icon-button');
    expect(iconButton).toBeInTheDocument();
    expect(iconButton.querySelector('.fa.fa-heart')).toBeInTheDocument();
  });

  test('calls the clicked function when clicked', () => {
    const { getByTestId } = render(
      <IconButton
        type="fa fa-heart"
        dataTestId="icon-button"
        clicked={clickHandler}
      />
    );

    const iconButton = getByTestId('icon-button');
    fireEvent.click(iconButton);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test('has active class when active prop is true', () => {
    const { getByTestId } = render(
      <IconButton
        type="fa fa-heart"
        dataTestId="icon-button"
        active={true}
        clicked={clickHandler}
      />
    );

    const iconButton = getByTestId('icon-button');
    expect(iconButton).toHaveClass('Active');
  });

  test('does not have active class when active prop is false', () => {
    const { getByTestId } = render(
      <IconButton
        type="fa fa-heart"
        dataTestId="icon-button"
        active={false}
        clicked={clickHandler}
      />
    );

    const iconButton = getByTestId('icon-button');
    expect(iconButton).not.toHaveClass('Active');
  });
});
