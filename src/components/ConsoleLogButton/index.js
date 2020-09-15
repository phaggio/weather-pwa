import React from 'react';
import PropTypes from 'prop-types';

const ConsoleLogButton = (props) => {

  return (
    <button className="btn btn-sm btn-danger my-1 p-0 font-weight-light"
      style={{ width: '120px' }}
      onClick={() => console.log(props.state)}>
      {props.name}
    </button>
  )
};

ConsoleLogButton.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  state: PropTypes.any  
};

export default ConsoleLogButton;