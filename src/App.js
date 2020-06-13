import React, { useState } from 'react';
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
    darkMode: bool => {
      if (bool) {
        setThemeState({ backgroundColor: `dark`, textColor: `white` })
      } else {
        setThemeState({ backgroundColor: `light`, textColor: `black` })
      }
    }
  })

  return (
    <Router>
      <div>
        <AppContext.Provider value={appState}>
          <ThemeContext.Provider value={themeState}>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/simple-weather" component={Home} />
          </ThemeContext.Provider>
        </AppContext.Provider>
      </div>
    </Router>
  )
}

export default App;
