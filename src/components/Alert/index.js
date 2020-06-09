import React from 'react';

const Alert = props =>
  <div role="alert"
    className={`alert alert-${props.type} alert-dismissible fade show`}
    style={{ width: `80%`, margin: `0 auto`, marginTop: 18, ...props.style }}>
    {props.children}
    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>;


export default Alert;