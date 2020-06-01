import React from 'react';

const Navbar = () => {
  return (
    <div className="">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-light p-4">
          <h5 className="text-white h4">Collapsed content</h5>
          <span className="text-muted">Toggleable via the navbar brand.</span>
        </div>
      </div>
      <nav className="navbar navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1 mx-auto">Simple Weather</span>
      </nav>
    </div>
  )
}

export default Navbar;