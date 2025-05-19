import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Toolbar from './Toolbar';

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
    expect(screen.getByRole('button', { name: 'Toolbar menu' })).toBeInTheDocument();
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
    fireEvent.click(screen.getByRole('button', { name: 'Toolbar menu' }));
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
    fireEvent.mouseDown(screen.getByRole('banner'));
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
    fireEvent.click(screen.getByTestId('toolbarMenuSettings'));
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
    fireEvent.click(screen.getByTestId('toolbarMenuLogout'));
    expect(logoutSpy).toHaveBeenCalledTimes(1);
    expect(toggleMenuSpy).toHaveBeenCalledWith(false);
  });
});
