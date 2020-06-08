import React from 'react';

const AppContext = React.createContext({
  darkMode: Boolean,
  unitType: String,
  units: String,
  updateDarkMode: () => undefined,
  updateUnit: () => undefined
});

export default AppContext;