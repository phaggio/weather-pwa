// bool func that returns theme properties
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