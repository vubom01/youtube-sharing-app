import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SharePostModal from './SharePostModal';

// Mock Ant Design Modal to simplify testing
jest.mock('antd', () => {
  const actual = jest.requireActual('antd');
  return {
    ...actual,
    Modal: ({ open, onCancel, onOk, children }: any) =>
      open ? (
        <div data-testid="mock-modal">
          {children}
          <button onClick={onOk} data-testid="ok-button">
            OK
          </button>
          <button onClick={onCancel} data-testid="close-button">
            Close
          </button>
        </div>
      ) : null,
  };
});

// Mock the `createPost` function
const mockCreatePost = jest.fn(() => Promise.resolve(true));

jest.mock('hooks', () => ({
  postHooks: {
    useCreatePost: () => ({
      createPost: mockCreatePost,
    }),
  },
}));

describe('SharePostModal', () => {
  let setShowModal: jest.Mock;
  let messageApi: any;

  beforeEach(() => {
    setShowModal = jest.fn();
    messageApi = { error: jest.fn(), success: jest.fn() };
  });

  it('renders the modal when showModal is true', () => {
    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={messageApi}
      />
    );

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('https://www.youtube.com/watch?v=')
    ).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', () => {
    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={messageApi}
      />
    );

    fireEvent.click(screen.getByTestId('close-button'));

    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it('shows an error message when an invalid YouTube URL is entered', async () => {
    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={messageApi}
      />
    );

    const input = screen.getByPlaceholderText(
      'https://www.youtube.com/watch?v='
    );
    fireEvent.change(input, { target: { value: 'invalid-url' } });

    fireEvent.click(screen.getByTestId('ok-button')); // Simulating clicking OK

    await waitFor(() => {
      expect(messageApi.error).toHaveBeenCalledWith('YouTube URL is invalid');
    });
  });

  it('calls createPost when a valid YouTube URL is submitted and closes the modal', async () => {
    render(
      <SharePostModal
        showModal={true}
        setShowModal={setShowModal}
        messageApi={messageApi}
      />
    );

    const input = screen.getByPlaceholderText(
      'https://www.youtube.com/watch?v='
    );
    fireEvent.change(input, {
      target: { value: 'https://www.youtube.com/watch?v=abcd1234' },
    });

    fireEvent.click(screen.getByTestId('ok-button'));

    await waitFor(() => {
      expect(mockCreatePost).toHaveBeenCalledWith(
        'https://www.youtube.com/watch?v=abcd1234'
      );
      expect(setShowModal).toHaveBeenCalledWith(false);
    });
  });
});
