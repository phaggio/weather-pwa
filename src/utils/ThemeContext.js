import React from 'react';

const ThemeContext = React.createContext({
  backgroundColor: String,
  textColor: String,
  borderColor: String,
  updateTheme: () => undefined
});

export default ThemeContext;