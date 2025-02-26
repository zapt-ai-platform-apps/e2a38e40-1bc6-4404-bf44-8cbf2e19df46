import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMemorial } from '../hooks/useMemorial';
import * as Sentry from '@sentry/browser';

// Mock fetch and Sentry
vi.mock('@sentry/browser', () => ({
  captureException: vi.fn()
}));

describe('useMemorial hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Mock global fetch
    global.fetch = vi.fn();
  });

  it('should fetch deceased data and update state', async () => {
    const mockData = [
      { id: 1, name: 'John Doe', dateOfDeath: '2022-01-01', description: 'Beloved father' },
      { id: 2, name: 'Jane Smith', dateOfDeath: '2022-02-15', description: 'Caring mother' }
    ];

    // Mock successful fetch response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    } as Response);

    // Render the hook
    const { result } = renderHook(() => useMemorial());

    // Initially should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.deceased).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check that data has been updated
    expect(result.current.deceased).toEqual(mockData);
    expect(result.current.error).toBe(null);

    // Verify fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith('/api/deceased');
  });

  it('should handle fetch error and log to Sentry', async () => {
    // Mock fetch error
    const fetchError = new Error('Network error');
    vi.mocked(global.fetch).mockRejectedValueOnce(fetchError);

    // Render the hook
    const { result } = renderHook(() => useMemorial());

    // Wait for error handling to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check error state
    expect(result.current.deceased).toEqual([]);
    expect(result.current.error).toBe('Failed to load memorial data. Please try again later.');

    // Verify Sentry was called with the error
    expect(Sentry.captureException).toHaveBeenCalledWith(fetchError);
  });

  it('should handle unsuccessful response', async () => {
    // Mock unsuccessful response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 500
    } as Response);

    // Render the hook
    const { result } = renderHook(() => useMemorial());

    // Wait for error handling to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check error state
    expect(result.current.deceased).toEqual([]);
    expect(result.current.error).toBe('Failed to load memorial data. Please try again later.');

    // Verify Sentry was called
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});