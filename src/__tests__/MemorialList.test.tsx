import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MemorialList from '../components/Memorial/MemorialList';

// Mock timers for testing auto-rotation
vi.useFakeTimers();

// Sample deceased data for testing
const mockDeceasedData = [
  {
    id: 1,
    name: 'John Doe',
    dateOfDeath: '2020-01-15T00:00:00.000Z',
    description: 'Beloved father and husband'
  },
  {
    id: 2,
    name: 'Jane Smith',
    dateOfDeath: '2021-03-22T00:00:00.000Z',
    description: 'Caring mother and friend'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    dateOfDeath: '2019-07-10T00:00:00.000Z',
    description: 'Devoted grandfather'
  }
];

describe('MemorialList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders all memorial plaques in the DOM', () => {
    render(<MemorialList deceased={mockDeceasedData} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Robert Johnson')).toBeInTheDocument();
  });

  it('shows the heading "In Loving Memory"', () => {
    render(<MemorialList deceased={mockDeceasedData} />);
    expect(screen.getByText('In Loving Memory')).toBeInTheDocument();
  });

  it('advances to the next slide after 10 seconds', async () => {
    render(<MemorialList deceased={mockDeceasedData} />);
    
    // Get the slider element
    const slider = screen.getByTestId('memorial-slider');
    
    // Initially the currentIndex should be 0
    expect(slider.getAttribute('data-current-index')).toBe('0');
    
    // Advance time by 10 seconds
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    
    // Now the currentIndex should be 1
    await waitFor(() => {
      expect(slider.getAttribute('data-current-index')).toBe('1');
    });
    
    // Advance time by another 10 seconds
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    
    // Now the currentIndex should be 2
    await waitFor(() => {
      expect(slider.getAttribute('data-current-index')).toBe('2');
    });
    
    // Advance time by another 10 seconds - should wrap back to 0
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    
    // Now the currentIndex should be back to 0
    await waitFor(() => {
      expect(slider.getAttribute('data-current-index')).toBe('0');
    });
  });
});