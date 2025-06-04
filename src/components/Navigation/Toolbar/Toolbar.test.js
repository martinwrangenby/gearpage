import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Toolbar from './Toolbar';
import userEvent from '@testing-library/user-event';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Toolbar', () => {
  let toggleMenuSpy;
  let logoutSpy;
  beforeEach(() => {
    toggleMenuSpy = jest.fn();
    logoutSpy = jest.fn();
  });

  test('should render without errors', () => {
    render(
      <BrowserRouter>
        <Toolbar
          showMenu={false}
          toggleMenu={toggleMenuSpy}
          logout={logoutSpy}
        />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toBeInTheDocument();
  });

  test('should toggle menu on button click', () => {
    render(
      <BrowserRouter>
        <Toolbar
          showMenu={false}
          toggleMenu={toggleMenuSpy}
          logout={logoutSpy}
        />
      </BrowserRouter>
    );
    userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
    expect(toggleMenuSpy).toHaveBeenCalledTimes(1);
  });

  test('should close menu on click outside of menu container', () => {
    render(
      <BrowserRouter>
        <Toolbar
          showMenu={true}
          toggleMenu={toggleMenuSpy}
          logout={logoutSpy}
        />
      </BrowserRouter>
    );
    userEvent.click(screen.getByRole('banner'));
    expect(toggleMenuSpy).toHaveBeenCalledWith(false);
  });

  test('should navigate to settings page on settings menu click', () => {
    render(
      <BrowserRouter>
        <Toolbar
          showMenu={true}
          toggleMenu={toggleMenuSpy}
          logout={logoutSpy}
        />
      </BrowserRouter>
    );
    userEvent.click(screen.getByRole('menuitem', { name: 'Settings' }));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/settings');
    expect(toggleMenuSpy).toHaveBeenCalledWith(false);
  });

  test('should call logout on sign out menu click', () => {
    render(
      <BrowserRouter>
        <Toolbar
          showMenu={true}
          toggleMenu={toggleMenuSpy}
          logout={logoutSpy}
        />
      </BrowserRouter>
    );
    userEvent.click(screen.getByRole('menuitem', { name: 'Sign out' }));
    expect(logoutSpy).toHaveBeenCalledTimes(1);
    expect(toggleMenuSpy).toHaveBeenCalledWith(false);
  });
});
