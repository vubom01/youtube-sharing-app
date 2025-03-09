import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MessageInstance } from 'antd/es/message/interface';
import { postHooks } from 'src/hooks';
import { describe, expect, it, vi } from 'vitest';
import SharePostModal, { isValidYouTubeUrl } from './SharePostModal';

const mockMessageApi = { error: vi.fn() } as unknown as MessageInstance;
const setShowModal = vi.fn();
const sendMessage = vi.fn();

const createPostMock = vi.fn(() => Promise.resolve(true));
(postHooks.useCreatePost as unknown as any).mockReturnValue({
  createPost: createPostMock,
});

vi.mock('src/hooks', () => ({
  postHooks: {
    useCreatePost: vi.fn(() => ({
      createPost: createPostMock,
    })),
  },
}));

describe('<SharePostModal />', () => {
  it('render component', () => {
    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={mockMessageApi}
        sendMessage={sendMessage}
      />
    );
    expect(screen.getByText('Youtube URL:')).toBeInTheDocument();
    expect(screen.getByTestId('youtube-input')).toBeInTheDocument();
  });

  it('close modal', () => {
    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={mockMessageApi}
        sendMessage={sendMessage}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it('isValidYouTubeUrl correct', () => {
    expect(
      isValidYouTubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    ).toBe(true);
    expect(isValidYouTubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
    expect(isValidYouTubeUrl('https://invalid.com/video')).toBe(false);
  });

  it('Youtube URL is invalid', async () => {
    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={mockMessageApi}
        sendMessage={sendMessage}
      />
    );

    const input = screen.getByTestId('youtube-input');
    fireEvent.change(input, { target: { value: 'invalid-url' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() =>
      expect(mockMessageApi.error).toHaveBeenCalledWith(
        'YouTube URL is invalid'
      )
    );
  });

  it('createPost successfully', async () => {
    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={mockMessageApi}
        sendMessage={sendMessage}
      />
    );

    const input = screen.getByTestId('youtube-input');
    fireEvent.change(input, {
      target: { value: 'https://www.youtube.com/watch?v=999999' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() =>
      expect(createPostMock).toHaveBeenCalledWith(
        'https://www.youtube.com/watch?v=999999'
      )
    );
    await waitFor(() => expect(setShowModal).toHaveBeenCalledWith(false));
  });
});
