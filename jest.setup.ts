import "@testing-library/jest-dom";

// jest.setup.js
beforeAll(() => {
  const localStorageMock = (() => {
    let store: Record<string, unknown> = {};

    return {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value;
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  jest.spyOn(console, 'log').mockImplementation(() => {});
});
