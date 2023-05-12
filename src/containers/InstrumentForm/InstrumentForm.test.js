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

    expect(screen.getByTestId('formGearName')).toBeInTheDocument();
    expect(screen.getByTestId('formGearType')).toBeInTheDocument();
    expect(screen.getByTestId('formGearDescription')).toBeInTheDocument();
    expect(screen.getByTestId('submitGearFormButton')).toBeDisabled();
  });

  test('populates form when rendered with instrument data', () => {
    const existingData = { type: 'guitar', name: 'My Guitar', description: 'cool one' };
    render(<InstrumentForm submitInstrument={submitInstrumentMock} closeModal={closeModalMock} instrument={existingData}/>);

    expect(screen.getByTestId('formGearType')).toHaveValue('guitar');
    expect(screen.getByTestId('formGearName')).toHaveValue('My Guitar');
    expect(screen.getByTestId('formGearDescription')).toHaveValue('cool one');
  });

  test('calls submitInstrument when form is submitted with valid inputs', () => {
    render(<InstrumentForm submitInstrument={submitInstrumentMock} closeModal={closeModalMock} />);

    fireEvent.change(screen.getByTestId('formGearName'), { target: { value: 'Test gear name' } });
    fireEvent.change(screen.getByTestId('formGearType'), { target: { value: 'guitar' } });
    fireEvent.change(screen.getByTestId('formGearDescription'), { target: { value: 'Test description' } });

    fireEvent.click(screen.getByTestId('submitGearFormButton'));

    expect(submitInstrumentMock).toHaveBeenCalledWith({
      name: 'Test gear name',
      type: 'guitar',
      description: 'Test description',
    });
  });

  test('calls modal closed when cancel button is clicked', () => {
    render(<InstrumentForm submitInstrument={submitInstrumentMock} closeModal={closeModalMock} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(closeModalMock).toHaveBeenCalled();
  });
});
