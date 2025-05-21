import { render, screen, fireEvent } from '@testing-library/react';
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

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test@test.com' } });
    expect(screen.getByRole('button')).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass123' } });
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  test('calls login with correct email, password, and rememberMe', () => {
    const loginMock = jest.fn();
    renderWithAuth({ login: loginMock });

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginMock).toHaveBeenCalledWith('test@test.com', 'pass123', true);
  });

  test('toggles rememberMe when switch is clicked', () => {
    const loginMock = jest.fn();
    renderWithAuth({ login: loginMock });

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass123' } });

    fireEvent.click(screen.getByLabelText(/remember me/i));
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginMock).toHaveBeenCalledWith('test@test.com', 'pass123', false);
  });
});

