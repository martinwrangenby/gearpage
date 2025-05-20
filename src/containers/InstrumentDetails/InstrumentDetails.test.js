import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import InstrumentDetails from './InstrumentDetails';
import { onValue } from 'firebase/database';
jest.mock('firebase/database');

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  const fakeData = {
    type: 'guitar',
    name: 'Rickenbacker',
    description: 'A nice guitar',
    price: 4000,
  };
  const snapshot = { val: () => fakeData };

  onValue.mockImplementation((ref, callback) => {
    callback(snapshot);
    return jest.fn();
  });
  render(
    <MemoryRouter
      initialEntries={[{ pathname: '/gearitem', search: '?id=testId' }]}
      initialIndex={1}>
      <InstrumentDetails/>
    </MemoryRouter>
  );
});

test('Instrument info renders', async () => {
  expect(await screen.findByRole('heading', { name: 'Rickenbacker' })).toBeVisible();
  expect(screen.getByText('A nice guitar')).toBeVisible();
  expect(screen.getByText('Price: 4000 kr')).toBeVisible();
});

test('Clicking delete button activates instrument delete', async () => {
  userEvent.click(screen.getByRole('button', { name: 'Delete' }));
  expect(await screen.findByRole('heading', { name: 'Delete Rickenbacker' })).toBeVisible();
});

test('Clicking edit button activates instrument edit', async () => {
  userEvent.click(screen.getByRole('button', { name: 'Edit' }));
  expect(await screen.findByRole('heading', { name: 'Edit Rickenbacker' })).toBeVisible();
});

test('Clicking back button navigates user back', async () => {
  userEvent.click(screen.getByRole('button', { name: 'Back' }));
  expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
});
