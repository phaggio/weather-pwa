import React from 'react';

const AppContext = React.createContext({
  theme: String,
  units: String,
  updateTheme: () => undefined,
  updateUnits: () => undefined
});

export default AppContext;