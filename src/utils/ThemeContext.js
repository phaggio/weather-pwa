import React from 'react';

const ThemeContext = React.createContext({
  backgroundColor: String,
  textColor: String,
  borderColor: String,
  toggleDarkMode: () => undefined
});

export default ThemeContext;