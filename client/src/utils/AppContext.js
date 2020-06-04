import React from 'react';

const AppContext = React.createContext({
    theme: `default`,
    updateTheme: () => undefined
});

export default AppContext;