import React from 'react';

const ThemeContext = React.createContext({
  backgroundColor: String,
  textColor: String,
  borderColor: String,
  darkMode: () => undefined
});

export default ThemeContext;