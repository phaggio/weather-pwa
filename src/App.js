import React, { useState } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DarkModeContext from './utils/DarkModeContext';
import UnitContext from './utils/UnitContext';
import ThemeContext from './utils/ThemeContext';

const App = () => {

  const [darkModeState, setDarkModeState] = useState({
    darkMode: false,
    toggleDarkMode: (bool) => setDarkModeState({ ...darkModeState, darkMode: bool })
  });

  const [unitState, setUnitState] = useState({
    unitType: `imperial`,
    units: `°F`,
    updateUnitType: (unitType, units) => {
      setUnitState({ ...unitState, unitType, units })
    }
  });

  const [themeState, setThemeState] = useState({
    backgroundColor: `light`,
    textColor: `black`,
    borderColor: `dark`,
    updateTheme: (bool) => {
      if (bool) {
        setThemeState({ ...themeState, backgroundColor: `dark`, textColor: `white`, borderColor: `light` })
      } else {
        setThemeState({ ...themeState, backgroundColor: `light`, textColor: `black`, borderColor: `dark` })
      }
    }
  })

  return (
    <Router>
      <UnitContext.Provider value={unitState}>
        <DarkModeContext.Provider value={darkModeState}>
          <ThemeContext.Provider value={themeState}>
            <div>
              <Navbar />
              <Route exact path="/" component={Home} />
              <Route exact path="/simple-weather" component={Home} />
            </div>
          </ThemeContext.Provider>
        </DarkModeContext.Provider>
      </UnitContext.Provider>
    </Router>
  )
}

export default App;
