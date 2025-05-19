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
    expect(screen.getByRole('heading', { name: 'Login plx' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Username' })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeDisabled();
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
    fireEvent.change(screen.getByRole('textbox', { name: 'Username' }), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

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
    expect(screen.getByText(errorMsg)).toBeVisible();
  });
});
