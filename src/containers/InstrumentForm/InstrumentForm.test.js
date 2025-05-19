import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InstrumentForm from './InstrumentForm';

describe('InstrumentForm component', () => {
  const submitInstrumentMock = jest.fn();
  const closeModalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements', () => {
    render(<InstrumentForm submitInstrument={submitInstrumentMock} closeModal={closeModalMock} />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeVisible();
    expect(screen.getByLabelText('Type')).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Description' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  test('populates form when rendered with instrument data', () => {
    const existingData = { type: 'guitar', name: 'My Guitar', description: 'cool one' };
    render(<InstrumentForm submitInstrument={submitInstrumentMock} closeModal={closeModalMock} instrument={existingData}/>);

    expect(screen.getByLabelText('Type')).toHaveValue('guitar');
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('My Guitar');
    expect(screen.getByRole('textbox', { name: 'Description' })).toHaveValue('cool one');
  });

  test('calls submitInstrument when form is submitted with valid inputs', () => {
    render(<InstrumentForm submitInstrument={submitInstrumentMock} closeModal={closeModalMock} />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'Test gear name' } });
    fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'guitar' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Description' }), { target: { value: 'Test description' } });

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(submitInstrumentMock).toHaveBeenCalledWith({
      name: 'Test gear name',
      type: 'guitar',
      description: 'Test description',
      price: '',
    });
  });

  test('calls modal closed when cancel button is clicked', () => {
    render(<InstrumentForm submitInstrument={submitInstrumentMock} closeModal={closeModalMock} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(closeModalMock).toHaveBeenCalled();
  });
});
