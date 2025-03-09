import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { message } from 'antd';
import { StoreContext } from 'src/contexts';
import { userHooks } from 'src/hooks';
import { userServices } from 'src/services';
import { it, vi } from 'vitest';
import AppHeader from '../AppHeader';

const mockSendMessage = vi.fn();
const setCurrentUser = vi.fn();

const mockLogin = vi.fn(() => Promise.resolve(true));
(userHooks.useLogin as any).mockReturnValue({
  loading: false,
  login: mockLogin,
});

vi.mock('src/hooks', () => ({
  userHooks: {
    useLogin: vi.fn(() => ({
      loading: false,
      login: mockLogin,
    })),
  },
  postHooks: {
    useCreatePost: vi.fn(() => ({
      createPost: vi.fn(() => Promise.resolve(true)),
    })),
  },
}));

vi.mock('src/services', () => ({
  userServices: {
    logout: vi.fn(),
  },
}));

vi.mock('antd', async (importOriginal) => {
  const antd = await importOriginal<typeof import('antd')>();

  const mockMessageApi = {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  };

  return {
    ...antd,
    message: {
      ...antd.message,
      useMessage: vi.fn(() => [mockMessageApi, <></>]),
    },
  };
});

describe('<AppHeader />', () => {
  it('renders login form when user is not authenticated', () => {
    render(
      <StoreContext.Provider value={{ currentUser: undefined, setCurrentUser }}>
        <AppHeader sendMessage={mockSendMessage} />
      </StoreContext.Provider>
    );

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('allows user to login', async () => {
    render(
      <StoreContext.Provider value={{ currentUser: undefined, setCurrentUser }}>
        <AppHeader sendMessage={mockSendMessage} />
      </StoreContext.Provider>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('shows error message when email is empty', async () => {
    const [mockMessageApi] = message.useMessage();

    render(
      <StoreContext.Provider value={{ currentUser: undefined, setCurrentUser }}>
        <AppHeader sendMessage={mockSendMessage} />
      </StoreContext.Provider>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(mockMessageApi.error).toHaveBeenCalledWith(
        'Please enter password'
      );
    });
  });

  it('shows error message when password is empty', async () => {
    const [mockMessageApi] = message.useMessage();

    render(
      <StoreContext.Provider value={{ currentUser: undefined, setCurrentUser }}>
        <AppHeader sendMessage={mockSendMessage} />
      </StoreContext.Provider>
    );

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(mockMessageApi.error).toHaveBeenCalledWith('Please enter email');
    });
  });

  it('renders current user when user is authenticated', () => {
    render(
      <StoreContext.Provider
        value={{
          currentUser: { id: 1, email: 'test@example.com' },
          setCurrentUser,
        }}
      >
        <AppHeader sendMessage={mockSendMessage} />
      </StoreContext.Provider>
    );

    expect(screen.getByTestId('current-user-info')).toBeInTheDocument();
  });

  it('allows user to logout', () => {
    render(
      <StoreContext.Provider
        value={{
          currentUser: { id: 1, email: 'test@example.com' },
          setCurrentUser,
        }}
      >
        <AppHeader sendMessage={mockSendMessage} />
      </StoreContext.Provider>
    );

    fireEvent.click(screen.getByTestId('logout-button'));
    expect(userServices.logout).toHaveBeenCalled();
    expect(setCurrentUser).toHaveBeenCalledWith(undefined);
  });

  it('opens <SharePostModal /> when clicking "Share a Video" button', async () => {
    render(
      <StoreContext.Provider
        value={{
          currentUser: { id: 1, email: 'test@example.com' },
          setCurrentUser,
        }}
      >
        <AppHeader sendMessage={mockSendMessage} />
      </StoreContext.Provider>
    );

    const shareButton = screen.getByTestId('share-video-button');
    expect(shareButton).toBeInTheDocument();

    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('renders <Spin /> when loading', () => {
    (userHooks.useLogin as any).mockReturnValue({
      loading: true,
      login: vi.fn(),
    });

    render(
      <StoreContext.Provider value={{ currentUser: undefined, setCurrentUser }}>
        <AppHeader sendMessage={mockSendMessage} />
      </StoreContext.Provider>
    );

    expect(screen.getByTestId('spin')).toBeInTheDocument();
  });
});
