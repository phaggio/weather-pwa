import React from 'react';

const ThemeContext = React.createContext({
  backgroundColor: String,
  textColor: String,
  darkMode: () => undefined
});

export default ThemeContext;