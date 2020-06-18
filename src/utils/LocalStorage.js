
const checkLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : null
}

const saveLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export {
  checkLocalStorage,
  saveLocalStorage
}