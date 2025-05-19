import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InstrumentListActions from './InstrumentListActions';

describe('InstrumentListActions component', () => {
  const activeFilter = ['guitar'];
  const resetFilter = jest.fn();
  const addInstrument = jest.fn();
  const updateFilter = jest.fn();

  beforeEach(() => {
    render(
      <InstrumentListActions
        activeFilter={activeFilter}
        resetFilter={resetFilter}
        addInstrument={addInstrument}
        updateFilter={updateFilter}
      />
    );
  });

  test('renders the component', () => {
    expect(screen.getByTestId('instrumentListActions')).toBeInTheDocument();
  });

  test('clicking filter button shows filter dropdown', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    expect(screen.getByTestId('filterDropdown')).toBeInTheDocument();
  });

  test('clicking reset filters button calls resetFilter function', () => {
    fireEvent.click(screen.getByText('Reset Filters'));
    expect(resetFilter).toHaveBeenCalledTimes(1);
  });

  test('clicking add instrument button calls addInstrument function', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Add new instrument' }));
    expect(addInstrument).toHaveBeenCalledTimes(1);
  });

  test('clicking a filter switch calls updateFilter function', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'guitar-filter' }));
    expect(updateFilter).toHaveBeenCalledTimes(1);
    expect(updateFilter).toHaveBeenCalledWith('guitar');
  });
});
