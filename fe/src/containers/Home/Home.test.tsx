import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Home from 'src/containers/Home/Home';
import { StoreContext } from 'src/contexts';
import { vi } from 'vitest';

const getMeMock = vi.fn(() => Promise.resolve({ id: 1, name: 'Test User' }));
vi.mock('src/hooks', () => ({
  userHooks: {
    useUser: vi.fn(() => ({
      loading: false,
      getMe: getMeMock,
    })),
  },
}));

vi.mock('src/components/AppHeader', () => ({
  default: vi.fn(() => <div data-testid="app-header-mock">AppHeader</div>),
}));

vi.mock('src/components/ListPosts', () => ({
  default: vi.fn(() => <div data-testid="list-posts-mock">ListPosts</div>),
}));

describe('<Home />', () => {
  it('renders component', async () => {
    render(<Home />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('displays spin when loading is true', () => {
    vi.mock('src/hooks', () => ({
      userHooks: {
        useUser: vi.fn(() => ({ loading: true, getMe: getMeMock })),
      },
    }));
    render(<Home />);
    expect(screen.getByTestId('spin')).toBeInTheDocument();
  });

  it('fetches user data on mount', async () => {
    render(
      <StoreContext.Provider
        value={{ currentUser: undefined, setCurrentUser: vi.fn() }}
      >
        <Home />
      </StoreContext.Provider>
    );
    await waitFor(() => {
      expect(getMeMock).toHaveBeenCalled();
    });
  });
});
