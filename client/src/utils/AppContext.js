import React from 'react';

const AppContext = React.createContext({
  darkMode: Boolean,
  unitType: String,
  units: String,
  updateDarkMode: () => undefined,
  updateUnitType: () => undefined,
  updateUnits: () => undefined
});

export default AppContext;