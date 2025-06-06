import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import InstrumentList from './InstrumentList';
import { onValue, push } from 'firebase/database';
import { SettingsProvider } from '../../hoc/Context/SettingsContext';

const renderWithProviders = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <SettingsProvider>
        {ui}
      </SettingsProvider>
    </MemoryRouter>
  );
};

jest.mock('firebase/database');
jest.mock('../../hoc/Context/AuthContext', () => ({
  useAuth: () => ({
    user: { uid: 'mocked-uid' },
  }),
}));

beforeEach(() => {
  localStorage.clear();
  push.mockClear();
  push.mockImplementation(() => Promise.resolve());
});

test('shows spinner while loading data', async () => {
  // do not call the callback immediately to simulate loading
  onValue.mockImplementation(() => {});

  renderWithProviders(<InstrumentList />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('displays instruments in table when data is loaded', async () => {
  const fakeSnapshot = {
    val: () => ({
      id1: { name: 'Gibson', type: 'guitar', description: 'Les Paul', price: 2000 },
    }),
  };

  onValue.mockImplementation((_, cb) => cb(fakeSnapshot));

  renderWithProviders(<InstrumentList />);

  expect(await screen.findByText('Gibson')).toBeInTheDocument();
});

test('shows empty state when no instruments are present', async () => {
  const emptySnapshot = { val: () => null };
  onValue.mockImplementation((_, cb) => cb(emptySnapshot));

  renderWithProviders(<InstrumentList />);
  expect(await screen.findByText(/no gear/i)).toBeInTheDocument();
});

test('shows error message on database read failure', async () => {
  onValue.mockImplementation((_, __, errCb) => errCb(new Error('DB error')));

  renderWithProviders(<InstrumentList />);
  expect(await screen.findByText('DB error')).toBeInTheDocument();
});

test('can open modal and add instrument', async () => {
  const user = userEvent.setup();
  const emptySnapshot = { val: () => null };
  onValue.mockImplementation((_, cb) => cb(emptySnapshot));

  renderWithProviders(<InstrumentList />);

  await user.click(await screen.findByRole('button', { name: /add/i }));

  await user.type(await screen.findByLabelText('Name'), 'bosse');
  await user.selectOptions(screen.getByRole('combobox', { name: /type/i }), 'guitar');

  await user.click(screen.getByRole('button', { name: 'Add' }));

  await waitFor(() => {
    expect(push).toHaveBeenCalled();
  });
});

test('toggles gear filter and stores it in localStorage', async () => {
  const user = userEvent.setup();
  const fakeSnapshot = {
    val: () => ({
      id1: { name: 'Fender', type: 'guitar' },
    }),
  };
  onValue.mockImplementation((_, cb) => cb(fakeSnapshot));

  renderWithProviders(<InstrumentList />);

  await user.click(screen.getByRole('button', { name: 'Toggle filter menu' }));
  await user.click(await screen.findByRole('checkbox', { name: 'guitar filter' }));

  // Check that 'guitar' was removed from localStorage filter
  const updatedFilter = JSON.parse(localStorage.getItem('gearTypesFilter'));
  expect(updatedFilter).not.toContain('guitar');
});
