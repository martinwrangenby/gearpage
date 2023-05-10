import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  test('renders correctly with initial props', () => {
    // Render the Login component
    render(
      <Login
        setPassword={() => {}}
        setEmail={() => {}}
        handleSwitchClick={() => {}}
        handleSubmitButtonClick={() => {}}
        errorMsg=""
        formValid={false}
      />
    );

    // Assert that the Login component renders with the correct elements and attributes
    const loginHeading = screen.getByRole('heading', { name: 'Login plx' });
    const usernameInput = screen.getByTestId('loginUsername');
    const passwordInput = screen.getByTestId('loginPassword');
    const rememberMeSwitch = screen.getByTestId('rememberMe');
    const submitButton = screen.getByTestId('loginSubmit');

    expect(loginHeading).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(rememberMeSwitch).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('calls the appropriate functions with correct values on form submission', () => {
    // Mock callback functions
    const setPasswordMock = jest.fn();
    const setEmailMock = jest.fn();
    const handleSwitchClickMock = jest.fn();
    const handleSubmitButtonClickMock = jest.fn();

    // Render the Login component with mock callbacks
    render(
      <Login
        setPassword={setPasswordMock}
        setEmail={setEmailMock}
        handleSwitchClick={handleSwitchClickMock}
        handleSubmitButtonClick={handleSubmitButtonClickMock}
        errorMsg=""
        formValid={true}
      />
    );

    // Enter values in the username and password input fields
    const usernameInput = screen.getByTestId('loginUsername');
    const passwordInput = screen.getByTestId('loginPassword');
    fireEvent.change(usernameInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Click the submit button
    const submitButton = screen.getByTestId('loginSubmit');
    fireEvent.click(submitButton);

    // Assert that the appropriate functions are called with correct values
    expect(setEmailMock).toHaveBeenCalledWith('test@test.com');
    expect(setPasswordMock).toHaveBeenCalledWith('password123');
    expect(handleSwitchClickMock).not.toHaveBeenCalled();
    expect(handleSubmitButtonClickMock).toHaveBeenCalled();
  });

  test('displays error message when errorMsg prop is provided', () => {
    // Render the Login component with errorMsg prop
    const errorMsg = 'Invalid credentials';
    render(
      <Login
        setPassword={() => {}}
        setEmail={() => {}}
        handleSwitchClick={() => {}}
        handleSubmitButtonClick={() => {}}
        errorMsg={errorMsg}
        formValid={false}
      />
    );

    // Assert that the error message is displayed
    const errorElement = screen.getByTestId('loginError');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent).toBe(errorMsg);
  });
});
