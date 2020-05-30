import React from 'react';
import { Container, Col, Row } from '../Grid';

const recentCitiesStyle = {
  overflowX: 'auto'
};

const hourStyle = {
  display: 'inline-block',
  padding: '5px'
}

const RecentCitiesDiv = props => {
  return (
    <div>
      <button className="btn btn-light w-100">Seattle, WA</button>
      <button className="btn btn-light w-100">Seattle, WA</button>
      <button className="btn btn-light w-100">Seattle, WA</button>
      <button className="btn btn-light w-100">Seattle, WA</button>
    </div>
  )
};

export { RecentCitiesDiv };