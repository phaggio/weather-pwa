import React from 'react';
import { Container, Col, Row } from './components/Grid';

function App() {
  return (
    <Container>
      <Row>
        <Col size="sm-12 md-2 lg-2">search column City Name and Country name</Col>
        <Col size="sm-12 md-10 lg-4">current weather Condition</Col>
        <Col size="sm-12 md-12 lg-6">days forecast 05/24/2020 05/25/2020 05/26/2020</Col>
      </Row>
    </Container>
  );
}

export default App;
