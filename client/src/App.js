import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from './components/Grid';
import { SearchGroup } from './components/SearchGroup';
import { CountryDropdown } from './components/CountryDropdown';
import { CurrentWeatherDiv } from './components/CurrentWeatherDiv';
import API from './utils/API';
import countryArr from './constant/countries.json';

const App = () => {
  const [searchCity, setSearchCity] = useState(`Seattle`);
  const [selectedCountry, setSelectedCountry] = useState(`us`);
  const [showSearchButton, setShowSearchButton] = useState(false);

  useEffect(() => {
    API.currentWeatherByCity(searchCity, selectedCountry);
  }, []);

  const updateSearchCityState = event => {
    const inputText = event.target.value;
    console.log(inputText);
    setSearchCity(inputText);
    validateSearchCity(inputText);
  };

  const updateSelectedCountryState = event => {
    const selectedCountry = event.target.value;
    console.log(selectedCountry);
    setSelectedCountry(selectedCountry);
  };

  const validateSearchCity = input => {
    (input.trim()) ? setShowSearchButton(true) : setShowSearchButton(false);
  }

  const locateMe = () => {
    const success = position => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      // currentWeatherApiCall(null, null, latitude, longitude);
      console.log(`Lat: ${latitude}, Lon: ${longitude}`);
    };

    const error = () => {
      console.log(`Unable to retrieve your location ...`);
    };

    if (!navigator.geolocation) {
      console.log(`Geolocation is not supported by your browser ...`)
    } else {
      console.log(`Getting your location ...`)
      let options = { timeout: 20000 };
      navigator.geolocation.getCurrentPosition(success, error, options);
    };
  };

  return (
    <Container>
      <Row>
        <Col size="sm-12 md-4 lg-3 xl-2">
          Search a city:<SearchGroup onChange={updateSearchCityState} showSearchButton={showSearchButton} locateMe={locateMe} />
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
