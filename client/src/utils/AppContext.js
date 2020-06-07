import React from 'react';

const AppContext = React.createContext({
  darkMode: Boolean,
  unit: String,
  updateDarkMode: () => undefined,
  updateUnit: () => undefined
});

export default AppContext;