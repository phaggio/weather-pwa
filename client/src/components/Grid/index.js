import PropTypes from 'prop-types';
import React from 'react';

export function Container({ fluid, children }) {
	return <div className={`container${fluid ? `-fluid` : ``}`}>{children}</div>;
}
Container.propTypes = {
	children: PropTypes.node,
	fluid: PropTypes.string
};

export function Row({ fluid, cols, children }) {
	return (
		<div className={`row${fluid ? `-fluid` : ``} `} className={cols ? `row-cols-${cols}` : ``} >
			{children}
		</div>
	);
}
Row.propTypes = {
	fluid: PropTypes.string,
	cols: PropTypes.string,
	children: PropTypes.node
};

export function Col({ size, children }) {
	return (
		<div
			className={size
				.split(` `)
				.map(size => `col-${size}`)
				.join(` `)}
		>
			{children}
		</div>
	);
}
Col.propTypes = {
	children: PropTypes.node,
	size: PropTypes.string
};
