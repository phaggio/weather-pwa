const checkLocalStorage = key => {
  const data = JSON.parse(localStorage.getItem(key));
  if (!data) return null;
  return data;
}

const saveLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export {
  checkLocalStorage,
  saveLocalStorage
}