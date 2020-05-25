import React from 'react';
import { Container, Col, Row } from './components/Grid';
import { SearchGroup } from './components/SearchGroup';

function App() {
  return (
    <Container>
      <Row>
        <Col size="sm-12 md-4 lg-3 xl-2">search column City Name and Country name <SearchGroup /></Col>
        <Col size="sm-12 md-8 lg-9 xl-7">current weather Condition</Col>
        <Col size="sm-12 md-12 lg-12 xl-3">days forecast 05/24/2020 05/25/2020 05/26/2020</Col>
      </Row>
    </Container>
  );
}

export default App;
