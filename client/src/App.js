import React from 'react';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  )
}

export default App;
