import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import CandleComponent from '../components/Memorial/CandleComponent';

// Mock Sentry
vi.mock('@sentry/browser', () => ({
  captureException: vi.fn()
}));

describe('CandleComponent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Mock the Image constructor for testing image loading
    const originalImage = window.Image;
    window.Image = class {
      onload: () => void = () => {};
      onerror: (e: Event) => void = () => {};
      src: string = '';
      constructor() {
        setTimeout(() => this.onload(), 100);
      }
    } as unknown as typeof Image;
    
    return () => {
      window.Image = originalImage;
    };
  });

  it('shows loading state initially', () => {
    render(<CandleComponent />);
    expect(screen.getByText('Lighting candle...')).toBeInTheDocument();
  });

  it('displays the static candle image after loading', async () => {
    const { container } = render(<CandleComponent />);
    
    await waitFor(() => {
      const image = container.querySelector('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt', 'Memorial candle');
      // Check that the image is visible (opacity-100)
      expect(image).toHaveClass('opacity-100');
    });
  });

  it('shows error message when image fails to load', async () => {
    // Override the mock to simulate an error
    window.Image = class {
      onload: () => void = () => {};
      onerror: (e: Event) => void = () => {};
      src: string = '';
      constructor() {
        setTimeout(() => this.onerror(new Event('error')), 100);
      }
    } as unknown as typeof Image;
    
    render(<CandleComponent />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load the memorial candle image')).toBeInTheDocument();
    });
  });
});