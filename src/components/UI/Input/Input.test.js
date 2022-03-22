import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

describe('UI Component: Input', () => {

  beforeEach(() => {
    consoleSpy.mockClear();
  });

  test('render input element if elementType is not specified', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox', { type: 'input' });

    expect(inputElement).toBeTruthy();
  });

  test('render textarea element', () => {
    render(<Input elementType='textarea'/>);
    const textareaElement = screen.getByRole('textbox', { type: 'textarea' });

    expect(textareaElement).toBeTruthy();
  });

  test('render component with invalid content', () => {
    render(<Input
      elementType='input'
      inValid={true}
      touched={true}/>);
    const inputElement = screen.getByRole('textbox', { type: 'input' });
    expect(inputElement).toHaveClass('InputElement Invalid');
  });

  test('component logs an error when changed if no onChange handler was passed', () => {
    render(<Input elementType='input'/>);
    const inputElement = screen.getByRole('textbox', { type: 'input' });
    userEvent.type(inputElement, 'H');
    expect(consoleSpy).toHaveBeenCalledWith('no onChange handler function provided to input component');
  });

  test('render select element without pre-set value', () => {
    render(<Input
      elementType='select'
      elementConfig={
        {
          placeholder: 'placeholder text',
          options: ['one', 'two', 'three'] }
      }
    />);

    // Select element is rendered
    const selectElement = screen.getByRole('combobox', { type: 'select' });
    expect(selectElement).toBeTruthy();

    // Top option should be the disabled placeholder
    const placeHolderOption = screen.getAllByRole('option')[0];
    expect(placeHolderOption).toHaveTextContent('placeholder text');
    expect(placeHolderOption).toBeDisabled();
    expect(placeHolderOption).toHaveValue('');
  });

  test('render select element with pre-set value', () => {
    render(<Input
      elementType='select'
      value='two'
      elementConfig={
        {
          placeholder: 'placeholder text',
          options: ['one', 'two', 'three'],
        }
      }
    />);

    const option = screen.getByRole('option', { name: 'two' });
    expect(option.selected).toBeTruthy();
  });

  test('render select element without passing options returns null and error log', () => {
    const { container } = render(<Input
      elementType='select'
    />);

    expect(container.innerHTML).toBeFalsy();
    expect(consoleSpy).toHaveBeenCalledWith('Can not generate <select> element without passing options (elementConfig.options)');
  });
});
