import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

const renderComponents = () => {
  const users = [
    { name: 'denis', email: 'denis@denis.ru' },
    { name: 'anna', email: 'anna@anna.ru' },
  ];

  render(<UserList users={users} />);

  return { users };
};

test('render one row per user', () => {
  // Render the component
  renderComponents();

  // Find all the rows in the table
  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  // const { container } = render(<UserList users={users} />);
  // const rows = container.querySelectorAll('tbody tr');

  // Assertions: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test('render the email and name of each user', () => {
  const { users } = renderComponents();

  // screen.logTestingPlaygroundURL();

  users.forEach((user) => {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
