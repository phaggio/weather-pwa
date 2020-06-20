// function that takes bool param, returns dark mode theme properties if true
const turnOnDarkTheme = bool => {
  if (bool) {
    return { backgroundColor: `dark`, textColor: `white`, borderColor: `light` };
  } else {
    return { backgroundColor: `light`, textColor: `black`, borderColor: `dark` };
  }
};

export {
  turnOnDarkTheme
}