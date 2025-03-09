import { render, screen, waitFor } from '@testing-library/react';
import { notification } from 'antd';
import ListPosts from 'src/components/ListPosts';
import { StoreContext } from 'src/contexts';
import { postHooks } from 'src/hooks';
import { vi } from 'vitest';

const currentUser = { id: 1, email: 'test@example.com' };
const setCurrentUser = vi.fn();
const mockSetParams = vi.fn();
const mockSetPosts = vi.fn();
const mockSetTotal = vi.fn();

const defaultPosts = [
  {
    title: 'Test Video',
    description: 'Test Description',
    youtubeURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    userEmail: 'test@example.com',
    userId: 1,
  },
];

const newMessage: any = {
  data: JSON.stringify({
    title: 'New Video',
    description: 'New Description',
    youtubeURL: 'https://www.youtube.com/watch?v=test123',
    userEmail: 'new@example.com',
    userId: 2,
  }),
};

vi.mock('src/hooks', () => ({
  postHooks: {
    useListPosts: vi.fn(),
  },
}));

vi.mock('antd', async (importOriginal) => {
  const antd = await importOriginal<typeof import('antd')>();

  return {
    ...antd,
    notification: {
      useNotification: vi.fn(() => [
        { open: vi.fn() },
        <div key="notification" />,
      ]),
    },
  };
});

describe('<ListPosts />', () => {
  beforeEach(() => {
    (postHooks.useListPosts as any).mockReturnValue({
      loading: false,
      posts: defaultPosts,
      total: 1,
      params: { page: 1, pageSize: 10 },
      setParams: mockSetParams,
      setPosts: mockSetPosts,
      setTotal: mockSetTotal,
    });
  });

  it('renders the list of posts', () => {
    render(
      <StoreContext.Provider
        value={{
          currentUser: { id: 1, email: 'test@example.com' },
          setCurrentUser: setCurrentUser,
        }}
      >
        <ListPosts lastMessage={null} />
      </StoreContext.Provider>
    );
    expect(screen.getByTestId('list-posts')).toBeInTheDocument();
  });

  it('receives messages after update the list posts', async () => {
    render(
      <StoreContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <ListPosts lastMessage={newMessage} />
      </StoreContext.Provider>
    );

    await waitFor(() => {
      expect(mockSetPosts).toHaveBeenCalledWith([
        expect.objectContaining({ title: 'New Video' }),
        ...defaultPosts,
      ]);
      expect(mockSetTotal).toHaveBeenCalledWith(2);
    });
  });

  it('receives notification for new posts from other users', async () => {
    const newMessage: any = {
      data: JSON.stringify({
        title: 'New Video',
        description: 'New Description',
        youtubeURL: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
        userEmail: 'new@example.com',
        userId: 2,
      }),
    };

    const mockNotificationOpen = vi.fn();
    (notification.useNotification as any).mockReturnValue([
      { open: mockNotificationOpen },
      <div key="notification" />,
    ]);

    render(
      <StoreContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <ListPosts lastMessage={newMessage} />
      </StoreContext.Provider>
    );

    await waitFor(() => {
      expect(mockNotificationOpen).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.anything() })
      );
    });
  });
});
