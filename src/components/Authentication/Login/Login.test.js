import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../../hoc/Context/AuthContext';
import Login from './Login';

const renderWithAuth = (mockValues = {}) => {
  const defaults = {
    login: jest.fn(),
    loginError: '',
  };
  return render(
    <AuthContext.Provider value={{ ...defaults, ...mockValues }}>
      <Login />
    </AuthContext.Provider>
  );
};

describe('Login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('renders login form with inputs, switch and button', () => {
    renderWithAuth();

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/remember me/i)).toBeInTheDocument();
  });

  test('disables Sign in button if email or password is empty', () => {
    renderWithAuth();

    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();

    userEvent.type(screen.getByLabelText('Username'), 'test@test.com' );
    expect(screen.getByRole('button')).toBeDisabled();

    userEvent.type(screen.getByLabelText('Password'), 'pass123' );
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  test('calls login with correct email, password, and rememberMe', () => {
    const loginMock = jest.fn();
    renderWithAuth({ login: loginMock });

    userEvent.type(screen.getByLabelText('Username'), 'test@test.com' );
    userEvent.type(screen.getByLabelText('Password'), 'pass123' );
    userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginMock).toHaveBeenCalledWith('test@test.com', 'pass123', true);
  });

  test('toggles rememberMe when switch is clicked', () => {
    const loginMock = jest.fn();
    renderWithAuth({ login: loginMock });

    userEvent.type(screen.getByLabelText('Username'), 'test@test.com');
    userEvent.type(screen.getByLabelText('Password'), 'pass123' );

    userEvent.click(screen.getByLabelText(/remember me/i));
    userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginMock).toHaveBeenCalledWith('test@test.com', 'pass123', false);
  });
});

