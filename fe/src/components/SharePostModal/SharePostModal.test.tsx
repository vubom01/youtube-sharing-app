import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MessageInstance } from 'antd/es/message/interface';
import { postHooks } from 'src/hooks';
import { describe, expect, it, vi } from 'vitest';
import SharePostModal, { isValidYouTubeUrl } from './SharePostModal';

const mockMessageApi = { error: vi.fn() } as unknown as MessageInstance;
const setShowModal = vi.fn();

vi.mock('src/hooks', () => ({
  postHooks: {
    useCreatePost: vi.fn(() => ({
      createPost: vi.fn(() => Promise.resolve(true)),
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
      />
    );
    expect(screen.getByText('Youtube URL:')).toBeInTheDocument();
    expect(screen.getByTestId('youtubeInput')).toBeInTheDocument();
  });

  it('close modal', () => {
    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={mockMessageApi}
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
      />
    );

    const input = screen.getByTestId('youtubeInput');
    fireEvent.change(input, { target: { value: 'invalid-url' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() =>
      expect(mockMessageApi.error).toHaveBeenCalledWith(
        'YouTube URL is invalid'
      )
    );
  });

  it('createPost successfully', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(true));
    (postHooks.useCreatePost as unknown as any).mockReturnValue({
      createPost: createPostMock,
    });

    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={mockMessageApi}
      />
    );

    const input = screen.getByTestId('youtubeInput');
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
