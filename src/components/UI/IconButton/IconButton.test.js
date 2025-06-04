import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton from './IconButton';

describe('IconButton Component', () => {
  let clickHandler;

  beforeEach(() => {
    clickHandler = jest.fn();
  });

  test('renders an icon button with correct type class', () => {
    render(
      <IconButton
        type="fa fa-heart"
        label="icon-button"
        clicked={clickHandler}
      />
    );

    const iconButton = screen.getByRole('button', { name: 'icon-button' });
    expect(iconButton).toBeInTheDocument();
    expect(iconButton.querySelector('.fa.fa-heart')).toBeInTheDocument();
  });

  test('calls the clicked function when clicked', async () => {
    const user = userEvent.setup();
    render(
      <IconButton
        type="fa fa-heart"
        label="icon-button"
        clicked={clickHandler}
      />
    );

    const iconButton = screen.getByRole('button', { name: 'icon-button' });
    await user.click(iconButton);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test('has active class when active prop is true', () => {
    render(
      <IconButton
        type="fa fa-heart"
        label="icon-button"
        active={true}
        clicked={clickHandler}
      />
    );

    const iconButton = screen.getByRole('button', { name: 'icon-button' });
    expect(iconButton).toHaveClass('Active');
  });

  test('does not have active class when active prop is false', () => {
    render(
      <IconButton
        type="fa fa-heart"
        label="icon-button"
        active={false}
        clicked={clickHandler}
      />
    );

    const iconButton = screen.getByRole('button', { name: 'icon-button' });
    expect(iconButton).not.toHaveClass('Active');
  });
});
