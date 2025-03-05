import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from './App';

describe('<App />', () => {
  it('renders Home component on root path', () => {
    render(<App />);
    expect(screen.getByText(/Funny Movies/i)).toBeInTheDocument();
  });
});
