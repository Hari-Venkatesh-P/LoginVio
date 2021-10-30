export const getItemFromLocalStorage = (keyName: string) => {
  return localStorage.getItem(keyName);
};

export const setItemToLocalStorage = (keyName: string, value: string) => {
  localStorage.setItem(keyName, value);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
