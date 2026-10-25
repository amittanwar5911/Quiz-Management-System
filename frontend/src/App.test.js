import { render, screen } from '@testing-library/react';
import App from './App';

test('shows the sign-in page when no user is logged in', async () => {
  render(<App />);

  expect(
    await screen.findByRole('heading', { name: /sign in/i })
  ).toBeInTheDocument();
});