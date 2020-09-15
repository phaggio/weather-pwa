import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => {
  return (
    <div role="alert"
      className={`alert alert-${props.type} alert-dismissible fade show`}
      style={{ width: `80%`, margin: `0 auto`, marginTop: 18, ...props.style }}>
      {props.children}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string
};

export default Alert;