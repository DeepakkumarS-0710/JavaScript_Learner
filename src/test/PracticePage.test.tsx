import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApiLab, ReactBasicsLab } from '../pages/PracticePage';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('React fundamentals practice', () => {
  it('renders the parent name and lets the child update parent state', async () => {
    const user = userEvent.setup();
    render(<ReactBasicsLab />);

    expect(screen.getByText(/Hello, Learner/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Child increments parent/ }));
    expect(screen.getByRole('button', { name: /Child increments parent: 1/ })).toBeInTheDocument();
  });

  it('adds a list item with a visible stable identifier', async () => {
    const user = userEvent.setup();
    render(<ReactBasicsLab />);
    await user.click(screen.getByRole('button', { name: /Add a keyed item/ }));
    expect(screen.getByText('New learner 3')).toBeInTheDocument();
  });
});

describe('API practice', () => {
  it('shows a user returned by the mocked API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: 'Test Learner', email: 'test@example.com' }],
    }));

    render(<ApiLab />);
    expect(await screen.findByText('Test Learner')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});
