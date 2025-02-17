export const localStorageHelper = {
  setItem: (key: string, value: any) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  getItem: (key: string) => {
    if (typeof localStorage !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  },
  getUserId: () => {
    if (typeof localStorage !== "undefined") {
      const item = localStorage.getItem("userId");
      return item ? JSON.parse(item) : null;
    }
  },
  getUserToken: () => {
    if (typeof localStorage !== "undefined") {
      const item = localStorage.getItem("token");
      return item ? JSON.parse(item) : null;
    }
  },
};
