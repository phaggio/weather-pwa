import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from './components/Grid';
import { SearchGroup } from './components/SearchGroup';
import { CountryDropdown } from './components/CountryDropdown';
import { CurrentWeatherDiv } from './components/CurrentWeatherDiv';
import { currentWeatherByCity } from './utils/API';

const countryArr = [
  { name: `United States`, code: `us` },
  { name: `Canada`, code: `ca` },
  { name: `United Kingdom`, code: `uk` },
  { name: `Costa Rica`, code: `cr` },
  { name: `Argentina`, code: `ar` },
  { name: `Philippines`, code: `ph` },
  { name: `Taiwan`, code: `tw` },
  { name: `South Korea`, code: `kr` },
  { name: `Japan`, code: `jp` },
  { name: `China`, code: `cn` }
]

function App() {
  const [searchInput, setSearchInput] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(`us`);
  const [showSearchButton, setShowSearchButton] = useState(false);

  useEffect(() => {
    currentWeatherByCity();
  }, []);

  const updateSearchInputState = event => {
    const inputText = event.target.value;
    console.log(inputText);
    setSearchInput(inputText);
    validateSearchInput(inputText);
  };

  const updateSelectedCountryState = event => {
    const selectedCountry = event.target.value;
    console.log(selectedCountry);
    setSelectedCountry(selectedCountry);
  };

  const validateSearchInput = input => {
    (input.trim()) ? setShowSearchButton(true) : setShowSearchButton(false);
  }

  return (
    <Container>
      <Row>
        <Col size="sm-12 md-4 lg-3 xl-2">
          Search a city:<SearchGroup onChange={updateSearchInputState} showSearchButton={showSearchButton} />
          <CountryDropdown countryArr={countryArr} onChange={updateSelectedCountryState} />
        </Col>
        <Col size="sm-12 md-8 lg-9 xl-7">
          <CurrentWeatherDiv />
        </Col>
        {/* <Col size="sm-12 md-12 lg-12 xl-3">days forecast 05/24/2020 05/25/2020 05/26/2020</Col> */}
      </Row>
    </Container>
  );
}

export default App;
