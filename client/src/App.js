import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from './components/Grid';
import { SearchGroup } from './components/SearchGroup';
import { CountryDropdown } from './components/CountryDropdown';
import { CurrentWeatherDiv } from './components/CurrentWeatherDiv';
import { HourlyForecastDiv } from './components/HourlyForecastDiv';
import API from './utils/API';
import countryArr from './constant/countries.json';

const App = () => {
  const [searchCity, setSearchCity] = useState(`Lynnwood`);
  const [selectedCountry, setSelectedCountry] = useState(`us`);
  const [selectedCoord, setSelectedCoord] = useState();
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [currentWeather, setCurrentWeather] = useState();
  const [hourlyForecast, setHourlyForecast] = useState();

  useEffect(() => {
    API.currentWeatherByCity(searchCity, selectedCountry)
      .then(res => {
        setCurrentWeather(res.data);
        console.log(res.data);
      });
  }, []);

  const updateSearchCityState = event => {
    const inputText = event.target.value.trim();
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

  const getCurrentWeatherByCity = () => {
    API.currentWeatherByCity(searchCity, selectedCountry)
      .then(res => {
        console.log(res);
        setCurrentWeather(res.data);
      });
  }

  const locateMe = () => {
    const success = position => {
      setSelectedCoord({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      API.currentWeatherByCoord(position.coords.latitude, position.coords.longitude)
        .then(res => {
          console.log(res.data);
          setCurrentWeather(res.data);
        })
      API.oneCallWeatherByCoord(position.coords.latitude, position.coords.longitude)
        .then(res => {
          console.log(res.data.hourly);
          setHourlyForecast(res.data.hourly);
        })
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
        <Col size="sm-12 md-4 lg-3 xl-3">
          <SearchGroup
            onChange={updateSearchCityState}
            showSearchButton={showSearchButton}
            locateMe={locateMe}
            searchButtonPressed={getCurrentWeatherByCity} />
          <CountryDropdown countryArr={countryArr} onChange={updateSelectedCountryState} />
        </Col>
        <Col size="sm-12 md-8 lg-9 xl-9">
          {currentWeather ?
            <CurrentWeatherDiv currentWeather={currentWeather} />
            :
            ``}

        </Col>
        <Col size="sm-12">
          {hourlyForecast ? <HourlyForecastDiv hourlyForecast={hourlyForecast} /> : ``}
        </Col>
        {/* <Col size="sm-12 md-12 lg-12 xl-3">days forecast 05/24/2020 05/25/2020 05/26/2020</Col> */}
      </Row>
    </Container>
  );
}

export default App;
