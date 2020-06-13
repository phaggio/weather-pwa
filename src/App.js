import React, { useState, useContext } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContext from './utils/AppContext';
import ThemeContext from './utils/ThemeContext';

const App = () => {

  const [appState, setAppState] = useState({
    darkMode: false,
    unitType: `imperial`,
    units: `°F`,
    updateDarkMode: darkMode => {
      setAppState({ ...appState, darkMode })
    },
    updateUnitType: (unitType, units) => {
      setAppState({ ...appState, unitType, units })
    },
    updateUnits: units => {
      setAppState({ ...appState, units })
    }
  });

  const [themeState, setThemeState] = useState({
    backgroundColor: `light`,
    textColor: `black`,
    borderColor: `dark`,
    darkMode: bool => {
      if (bool) {
        setThemeState({ ...themeState, backgroundColor: `dark`, textColor: `white`, borderColor: `light` })
      } else {
        setThemeState({ ...themeState, backgroundColor: `light`, textColor: `black`, borderColor: `dark` })
      }
    }
  })

  return (
    <Router>
      <AppContext.Provider value={appState}>
        <ThemeContext.Provider value={themeState}>
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/simple-weather" component={Home} />
          </div>
        </ThemeContext.Provider>
      </AppContext.Provider>
    </Router>
  )
}

export default App;
