import React from 'react';

const DarkModeContext = React.createContext({
  darkMode: Boolean,
  toggleDarkMode: () => undefined,
});

export default DarkModeContext;