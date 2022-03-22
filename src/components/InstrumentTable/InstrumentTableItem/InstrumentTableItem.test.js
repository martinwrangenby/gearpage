import { render, screen, fireEvent } from '@testing-library/react';
import InstrumentTableItem from './InstrumentTableItem';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockedUsedNavigate,
}));

describe('InstrumentableItem', () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <InstrumentTableItem name={'Strata'} type={'guitar'} id={123456}/>
        </tbody>
      </table>
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });


  test('renders with name and type', () => {
    // Row has correct length
    const tableRow = screen.getAllByRole('cell');
    expect(tableRow).toHaveLength(2);

    // Row has correct content
    const tableCell = tableRow.map(cell => cell.textContent);
    expect(tableCell).toEqual(['Strata', 'guitar']);
  });

  test('clicking the row will push path and query for instrument to history', () => {
    const tableRow = screen.getByRole('row');
    fireEvent.click(tableRow);
    expect(mockedUsedNavigate).toBeCalledWith(
      {
        pathname: '/gearitem',
        search: '?id=123456',
      });
  });
});
