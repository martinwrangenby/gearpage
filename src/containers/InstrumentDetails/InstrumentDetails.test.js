import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InstrumentDetails from './InstrumentDetails';

describe('Instrument details component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: '/gearitem', search: '?id=testId' }]}
        initialIndex={1}>
        <InstrumentDetails/>
      </MemoryRouter>
    );
  });

  test('Instrument info renders', async () => {
    const header = await screen.findByRole('heading', { level: 1 });
    expect(header).toHaveTextContent('Rickenbacker');

    const description = await screen.findByTestId('gearDetailsDescription');
    expect(description).toHaveTextContent('A nice guitar');
  });
});
