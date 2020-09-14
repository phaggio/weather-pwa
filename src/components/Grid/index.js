import PropTypes from 'prop-types';
import React from 'react';

const Row = ({ fluid, cols, className, children }) => {
	return (
		<div className={`row${fluid ? `-fluid` : ``} ${cols ? `row-cols-${cols}` : ``} ${className}`} >
			{children}
		</div>
	);
}
Row.propTypes = {
	fluid: PropTypes.string,
	cols: PropTypes.string,
	children: PropTypes.node
};

const Col = ({ size, className, children }) => {
	return (
		<div
			className={`${size
				.split(` `)
				.map(size => `col-${size}`)
				.join(` `)}
				${className ? className : ``}`
			}
		>
			{children}
		</div>
	);
}
Col.propTypes = {
	children: PropTypes.node,
	size: PropTypes.string
};

export {
	// Container,
	Col,
	Row
}