import React, { useState } from 'react';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContext from './utils/AppContext';
import Alert from './components/Alert';

const App = () => {
  const [appState, setAppState] = useState({
    darkMode: false,
    unit: `Fahrenheit (°F)`,
    updateDarkMode: darkMode => {
      setAppState({ ...appState, darkMode })
    },
    updateUnit: unit => {
      setAppState({ ...appState, unit })
    }
  });

  return (
    <Router>
      <div>
        <AppContext.Provider value={appState}>
          <Alert type="danger" children="Something is wrong!" />
          <Navbar />
          <Route exact path="/" component={Home} />
        </AppContext.Provider>
      </div>
    </Router>
  )
}

export default App;
