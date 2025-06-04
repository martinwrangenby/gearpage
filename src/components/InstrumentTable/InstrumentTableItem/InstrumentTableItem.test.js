import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstrumentTableItem from './InstrumentTableItem';

const mockedUsedNavigate = jest.fn();
const mockedUseSettings = jest.fn();

jest.mock('../../../hoc/Context/SettingsContext', () => ({
  useSettings: () => mockedUseSettings(),
}));

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockedUsedNavigate,
}));

describe('InstrumentableItem', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });


  test('renders with name and type', () => {
    mockedUseSettings.mockReturnValue({ settings: { showPrice: false } });
    render(
      <table>
        <tbody>
          <InstrumentTableItem name={'Strata'} type={'guitar'} id={123456}/>
        </tbody>
      </table>
    );
    // Row has correct length
    const tableRow = screen.getAllByRole('cell');
    expect(tableRow).toHaveLength(2);

    // Row has correct content
    const tableCell = tableRow.map(cell => cell.textContent);
    expect(tableCell).toEqual(['Strata', 'guitar']);
  });
  test('renders with name, type and price', () => {
    mockedUseSettings.mockReturnValue({ settings: { showPrice: true } });

    render(
      <table>
        <tbody>
          <InstrumentTableItem name={'Strata'} type={'guitar'} price={5000} id={123456}/>
        </tbody>
      </table>
    );
    // Row has correct length
    const tableRow = screen.getAllByRole('cell');
    expect(tableRow).toHaveLength(3);

    // Row has correct content
    const tableCell = tableRow.map(cell => cell.textContent);
    expect(tableCell).toEqual(['Strata', 'guitar', '5000 kr']);
  });

  test('renders with default values when name and type props are not provided', () => {
    mockedUseSettings.mockReturnValue({ settings: { showPrice: false } });
    render(
      <table>
        <tbody>
          <InstrumentTableItem id={123456} />
        </tbody>
      </table>
    );
    const tableRow = screen.getByRole('row');
    const tableCell = screen.getAllByRole('cell');
    expect(tableRow).toHaveAttribute('name', '');
    expect(tableCell[0]).toHaveTextContent('');
    expect(tableCell[1]).toHaveTextContent('');
  });

  test('clicking the row will push path and query for instrument to history', () => {
    mockedUseSettings.mockReturnValue({ settings: { showPrice: false } });
    render(
      <table>
        <tbody>
          <InstrumentTableItem name={'Strata'} type={'guitar'} id={123456}/>
        </tbody>
      </table>
    );
    const tableRow = screen.getByRole('row');
    userEvent.click(tableRow);
    expect(mockedUsedNavigate).toBeCalledWith(
      {
        pathname: '/gearitem',
        search: '?id=123456',
      });
  });
});
