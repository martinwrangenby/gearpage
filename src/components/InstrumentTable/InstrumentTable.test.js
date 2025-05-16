import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import InstrumentTable from './InstrumentTable';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockedUseSettings = jest.fn();
jest.mock('../../hoc/Context/SettingsContext', () => ({
  useSettings: () => mockedUseSettings(),
}));

// Mock props for the component
const mockProps = {
  instruments: [
    { id: 1, name: 'Guitar', type: 'String' },
    { id: 2, name: 'Drums', type: 'Percussion' },
    { id: 3, name: 'Piano', type: 'Keyboard' },
  ],
  sortOrder: { key: 'name', direction: 'asc' },
  filter: ['String'],
  sort: jest.fn(),
};

describe('InstrumentTable', () => {
  beforeEach(() => {
    // Reset mock function before each test
    mockProps.sort.mockClear();
  });

  test('renders correctly with props', () => {
    mockedUseSettings.mockReturnValue({ settings: { showPrice: false } });
    // Mock useNavigate to return a jest.fn()
    useNavigate.mockReturnValue(jest.fn());

    const { getByRole, queryByRole } = render(
      <MemoryRouter>
        <InstrumentTable {...mockProps} />
      </MemoryRouter>
    );

    const table = getByRole('table');

    // Assert that the table headers are rendered with correct text and classNames
    expect(getByRole('columnheader', { name: 'Name' })).toBeVisible();
    expect(getByRole('columnheader', { name: 'Type' })).toBeVisible();
    expect(getByRole('columnheader', { name: 'Name' })).toHaveClass('asc');
    expect(getByRole('columnheader', { name: 'Type' })).not.toHaveClass();

    // Assert that price header isn't rendered
    expect(queryByRole('columnheader', { name: 'Price' })).not.toBeInTheDocument();

    // Assert that the table rows are rendered with the correct content
    expect(within(table).getByText(/guitar/i)).toBeInTheDocument();
    expect(within(table).getByText(/string/i)).toBeInTheDocument();
    expect(within(table).queryByText(/drums/i)).toBeNull();
    expect(within(table).queryByText(/piano/i)).toBeNull();
  });

  test('Renders with price column if showPrice is true', () => {
    mockedUseSettings.mockReturnValue({ settings: { showPrice: true } });
    // Mock useNavigate to return a jest.fn()
    useNavigate.mockReturnValue(jest.fn());

    const { getByRole } = render(
      <MemoryRouter>
        <InstrumentTable {...mockProps} />
      </MemoryRouter>
    );

    expect(getByRole('columnheader', { name: 'Price' })).toBeVisible();
  });

  test('calls sort function with correct key when header is clicked', () => {
    mockedUseSettings.mockReturnValue({ settings: { showPrice: false } });
    // Mock useNavigate to return a jest.fn()
    useNavigate.mockReturnValue(jest.fn());

    const { getByRole } = render(
      <MemoryRouter>
        <InstrumentTable {...mockProps} />
      </MemoryRouter>
    );

    const table = getByRole('table');
    const nameHeader = within(table).getByText('Name');
    const typeHeader = within(table).getByText('Type');

    // Simulate click on the name header
    fireEvent.click(nameHeader);

    expect(mockProps.sort).toHaveBeenCalledWith('name');

    // Simulate click on the type header
    fireEvent.click(typeHeader);

    expect(mockProps.sort).toHaveBeenCalledWith('type');
  });
});
