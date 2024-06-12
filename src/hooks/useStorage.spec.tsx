import { act, renderHook } from '@testing-library/react';
import { useStorage } from './useStorage.hook.tsx';

describe('useStorage Hook', () => {
  const testId = 'test-poll';
  const prefix = `POLL_${testId}`;
  const mockValue = { key: 'value' };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('setItem stores value in localStorage', () => {
    const { result } = renderHook(() => useStorage(testId));

    act(() => {
      result.current.setItem(mockValue);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(prefix, JSON.stringify(mockValue));
    expect(localStorage.getItem(prefix)).toEqual(JSON.stringify(mockValue));
  });

  test('getItem retrieves value from localStorage', () => {
    localStorage.setItem(prefix, JSON.stringify(mockValue));

    const { result } = renderHook(() => useStorage(testId));

    const retrievedValue = result.current.getItem();

    expect(retrievedValue).toEqual(mockValue);
  });

  test('getItem returns undefined if parsing fails', () => {
    localStorage.setItem(prefix, 'invalid JSON');

    const { result } = renderHook(() => useStorage(testId));

    const retrievedValue = result.current.getItem();

    expect(retrievedValue).toBeUndefined();
    expect(console.log).toHaveBeenCalledWith('Could not parse data', expect.any(SyntaxError));
  });
});
