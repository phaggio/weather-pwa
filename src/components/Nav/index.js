import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../utils/ThemeContext';

const Nav = () => {

  const themeContext = useContext(ThemeContext);

  return (
    <nav className={`navbar navbar-${themeContext.backgroundColor} bg-${themeContext.backgroundColor}`}>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <h1 className={`navbar-brand mb-0 h1 mx-auto text-${themeContext.textColor}`}>Simple Weather</h1>
    </nav>
  )
}

Nav.propTypes = {
  children: PropTypes.node
}

export default Nav;