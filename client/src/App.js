import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from './components/Grid';
import { SearchGroup } from './components/SearchGroup';
import { CountryDropdown } from './components/CountryDropdown';

const countryArr = [
  { name: `United States`, code: `us` },
  { name: `Canada`, code: `ca` }
]

function App() {
  const [searchInput, setSearchInput] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(`us`);


  const updateSearchInputState = event => {
    const inputText = event.target.value;
    console.log(inputText);
    setSearchInput(inputText);
  };

  const updateSelectedCountryState = event => {
    const selectedCountry = event.target.value;
    console.log(selectedCountry);
    setSelectedCountry(selectedCountry);
  }

  return (
    <Container>
      <Row>
        <Col size="sm-12 md-4 lg-3 xl-2">
          Search a city:<SearchGroup onChange={updateSearchInputState} />
          <CountryDropdown countryArr={countryArr} onChange={updateSelectedCountryState} />
        </Col>
        {/* <Col size="sm-12 md-8 lg-9 xl-7">current weather Condition</Col>
        <Col size="sm-12 md-12 lg-12 xl-3">days forecast 05/24/2020 05/25/2020 05/26/2020</Col> */}
      </Row>
    </Container>
  );
}

export default App;
