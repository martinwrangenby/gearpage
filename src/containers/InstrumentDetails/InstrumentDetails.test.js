import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InstrumentDetails from './InstrumentDetails';
import { onValue } from 'firebase/database';
jest.mock('firebase/database');

beforeEach(() => {
  const fakeData = {
    type: 'guitar',
    name: 'Rickenbacker',
    description: 'A nice guitar',
  };
  const snapshot = { val: () => fakeData };

  onValue.mockImplementation((ref, callback) => {
    callback(snapshot);
    return jest.fn();
  });
});

test('Instrument info renders', async () => {
  render(
    <MemoryRouter
      initialEntries={[{ pathname: '/gearitem', search: '?id=testId' }]}
      initialIndex={1}>
      <InstrumentDetails/>
    </MemoryRouter>
  );

  const header = await screen.findByRole('heading', { level: 1 });
  expect(header).toHaveTextContent('Rickenbacker');

  const description = await screen.findByTestId('gearDetailsDescription');
  expect(description).toHaveTextContent('A nice guitar');
});

