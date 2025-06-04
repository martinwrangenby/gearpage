import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(screen.getByRole('button', { name: 'Toggle filter menu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add new instrument' })).toBeInTheDocument();
  });

  test('clicking filter button shows filter dropdown', () => {
    userEvent.click(screen.getByRole('button', { name: 'Toggle filter menu' }));
    expect(screen.getByRole('checkbox', { name: 'guitar filter' })).toBeInTheDocument();
  });

  test('clicking reset filters button calls resetFilter function', () => {
    userEvent.click(screen.getByRole('button', { name: 'Toggle filter menu' }));
    userEvent.click(screen.getByRole('button', { name: 'Reset Filters' }));
    expect(resetFilter).toHaveBeenCalledTimes(1);
  });

  test('clicking add instrument button calls addInstrument function', () => {
    userEvent.click(screen.getByRole('button', { name: 'Add new instrument' }));
    expect(addInstrument).toHaveBeenCalledTimes(1);
  });

  test('clicking a filter switch calls updateFilter function', () => {
    userEvent.click(screen.getByRole('button', { name: 'Toggle filter menu' }));
    userEvent.click(screen.getByRole('checkbox', { name: 'guitar filter' }));

    expect(updateFilter).toHaveBeenCalledTimes(1);
    expect(updateFilter).toHaveBeenCalledWith('guitar');
  });
});
