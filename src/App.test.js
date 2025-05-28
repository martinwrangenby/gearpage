import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

import { useAuth } from './hoc/Context/AuthContext';

jest.mock('./hoc/Context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('./components/Authentication/Login/Login', () => () => (
  <h1>Login</h1>
));
jest.mock('./containers/InstrumentList/InstrumentList', () => () => (
  <div>Instrument List</div>
));
jest.mock('./containers/InstrumentDetails/InstrumentDetails', () => () => (
  <div>Instrument Details</div>
));
jest.mock('./containers/Settings/Settings', () => () => (
  <div>Settings</div>
));
jest.mock('./components/UI/Spinner/Spinner', () => () => (
  <div role="status">Loading...</div>
));
jest.mock('./components/Navigation/ConfirmChoice/ConfirmChoice', () => ({ confirm, reject }) => (
  <div>
    <button onClick={confirm}>yes</button>
    <button onClick={reject}>no</button>
  </div>
));
const mockUseAuth = (value) => {
  useAuth.mockReturnValue(value);
};

const renderApp = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );

test('renders spinner when loading', () => {
  mockUseAuth({ loading: true });
  renderApp();
  expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
});

test('redirects to login if not authenticated', () => {
  mockUseAuth({ loading: false, user: null });
  renderApp('/some/protected/path');
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test('renders instrument list if authenticated', () => {
  mockUseAuth({ loading: false, user: { uid: '123' } });
  renderApp('/');
  expect(screen.getByRole('main')).toHaveTextContent(/instrument list/i);
});

test('renders instrument details page for authenticated users', () => {
  mockUseAuth({ loading: false, user: { uid: 'abc' } });
  renderApp('/gearitem');
  expect(screen.getByRole('main')).toHaveTextContent(/instrument details/i);
});

test('renders settings page if authenticated', () => {
  mockUseAuth({ loading: false, user: { uid: 'abc' } });
  renderApp('/settings');
  expect(screen.getByRole('main')).toHaveTextContent(/settings/i);
});

test('shows logout modal and allows cancel', async () => {
  const logout = jest.fn();
  mockUseAuth({ loading: false, user: { uid: 'abc' }, logout });

  renderApp('/');

  userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));

  userEvent.click(screen.getByRole('menuitem', { name: 'Sign out' }));

  // Assert modal title is shown
  expect(screen.getByRole('heading', { name: /logging out/i })).toBeInTheDocument();

  // Optionally test confirm/cancel buttons
  expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();
});
