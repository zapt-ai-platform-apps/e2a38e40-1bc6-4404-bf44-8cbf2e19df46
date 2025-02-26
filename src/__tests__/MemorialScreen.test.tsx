import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MemorialScreen from '../screens/Memorial';
import { useMemorial } from '../hooks/useMemorial';

// Mock the useMemorial hook
vi.mock('../hooks/useMemorial');

// Sample deceased data for testing
const mockDeceasedData = [
  {
    id: 1,
    name: 'John Doe',
    dateOfDeath: '2020-01-15T00:00:00.000Z',
    description: 'Beloved father and husband',
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    dateOfDeath: '2021-03-22T00:00:00.000Z',
    description: 'Caring mother and friend',
    createdAt: '2023-01-02T00:00:00.000Z'
  }
];

describe('MemorialScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state when data is being fetched', () => {
    // Mock the hook to return loading state
    vi.mocked(useMemorial).mockReturnValue({
      deceased: [],
      loading: true,
      error: null
    });

    render(
      <BrowserRouter>
        <MemorialScreen />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading memorial...')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    // Mock the hook to return an error
    vi.mocked(useMemorial).mockReturnValue({
      deceased: [],
      loading: false,
      error: 'Failed to load data'
    });

    render(
      <BrowserRouter>
        <MemorialScreen />
      </BrowserRouter>
    );

    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('renders the memorial list and candle when data is loaded', async () => {
    // Mock the hook to return successful data
    vi.mocked(useMemorial).mockReturnValue({
      deceased: mockDeceasedData,
      loading: false,
      error: null
    });

    render(
      <BrowserRouter>
        <MemorialScreen />
      </BrowserRouter>
    );

    // Check for the heading
    expect(screen.getByText('Memorial Page')).toBeInTheDocument();
    
    // Check for "In Loving Memory" heading in the memorial list
    expect(screen.getByText('In Loving Memory')).toBeInTheDocument();
    
    // Check for deceased people's names
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Check for "Made on ZAPT" footer link
    expect(screen.getByText('Made on ZAPT')).toBeInTheDocument();
  });
});