import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MemorialList from '../components/Memorial/MemorialList';

// Mock timers for testing auto-rotation
vi.useFakeTimers();

// Create 40 sample deceased entries for testing (to create 2 slides of 20 each)
const generateMockDeceasedData = (count = 40) => {
  const data = [];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  for (let i = 1; i <= count; i++) {
    const day = Math.min(i, 28); // Ensure valid day for all months
    data.push({
      id: i,
      name: `Person ${i}`,
      dateOfDeath: new Date(currentYear, currentMonth, day).toISOString(),
      description: `Description for person ${i}`
    });
  }
  
  return data;
};

const mockDeceasedData = generateMockDeceasedData();

describe('MemorialList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders memorial plaques in groups of 20', () => {
    render(<MemorialList deceased={mockDeceasedData} />);
    
    // Check that the first person in the list is rendered
    expect(screen.getByText('Person 1')).toBeInTheDocument();
    
    // With 40 items and 20 per slide, we should have 2 slide groups
    const slider = screen.getByTestId('memorial-slider');
    const indicators = screen.getAllByRole('button', { name: /go to slide group/i });
    expect(indicators).toHaveLength(2);
  });

  it('shows the heading "In Loving Memory"', () => {
    render(<MemorialList deceased={mockDeceasedData} />);
    expect(screen.getByText('In Loving Memory')).toBeInTheDocument();
  });

  it('advances to the next slide group after 10 seconds', async () => {
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
    
    // Advance time by another 10 seconds - should wrap back to 0
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    
    // Now the currentIndex should be back to 0
    await waitFor(() => {
      expect(slider.getAttribute('data-current-index')).toBe('0');
    });
  });
  
  it('works correctly with fewer than one slide worth of items', () => {
    // Test with only 5 items which is less than one full slide
    const smallDataset = mockDeceasedData.slice(0, 5);
    render(<MemorialList deceased={smallDataset} />);
    
    // Should still show the slider with one slide
    const slider = screen.getByTestId('memorial-slider');
    expect(slider).toBeInTheDocument();
    expect(slider.getAttribute('data-current-index')).toBe('0');
    
    // Should have only one navigation indicator
    const indicators = screen.queryAllByRole('button', { name: /go to slide group/i });
    expect(indicators).toHaveLength(1);
  });
});