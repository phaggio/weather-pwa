import React from 'react';

const ConsoleLogButton = (props) => {

  return (
    <button className="btn btn-sm btn-danger" onClick={() => console.log(props.state)}>
      {props.name}
    </button>
  )
};

export default ConsoleLogButton;