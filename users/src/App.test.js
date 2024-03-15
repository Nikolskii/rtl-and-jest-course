import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('can receive a new user and show it on a list', async () => {
  render(<App />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /enter email/i });
  const button = screen.getByRole('button');

  await user.click(nameInput);
  await user.keyboard('denis');

  await user.click(emailInput);
  await user.keyboard('denis@denis.ru');

  await user.click(button);

  // screen.debug();

  const name = screen.getByRole('cell', { name: 'denis' });
  const email = screen.getByRole('cell', { name: 'denis@denis.ru' });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
