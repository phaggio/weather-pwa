import React from 'react';
import PropTypes from 'prop-types';

const Nav = props => {

  if (props.darkMode)
    return (
      <nav className="navbar navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1 mx-auto text-white">Simple Weather</span>
      </nav>
    )
}

Nav.propTypes = {
  children: PropTypes.node
}

export default Nav;