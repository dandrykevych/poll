interface UseStorage {
  setItem: (value: unknown) => void;
  getItem: <T = unknown>() => T;
}

export const useStorage = (id: string): UseStorage => {
  const prefix = `POLL_${id}`;

  const setItem = (value: unknown): void => {
    localStorage.setItem(prefix, JSON.stringify(value));
  }

  const getItem = <T = unknown>(): T => {
    try {
      return JSON.parse(localStorage.getItem(prefix));
    } catch (error) {
      console.log('Could not parse data', error)
    }
  }


  return {
    getItem,
    setItem
  }
}
