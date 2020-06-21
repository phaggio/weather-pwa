import React from 'react';
import PropTypes from 'prop-types';

const CollapsibleDiv = props => {

  return (
    <div>
      <button className="btn btn-primary" type="button"
        data-toggle="collapse"
        data-target={`#${props.id}`}>
        button
      </button>
      <label className="btn btn-primary" type="button"
        data-toggle="collapse"
        data-target={`#${props.id}`}>
        click here
      </label>
      <div className={`collapse ${props.defaultShow ? `show` : ``}`} id={`#${props.id}`}>
        {props.children}
      </div>
    </div>
  )
};

CollapsibleDiv.propTypes = {
  children: PropTypes.node
};

export default CollapsibleDiv