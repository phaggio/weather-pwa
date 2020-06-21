import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row } from '../../components/Grid';
import SearchGroup from '../../components/SearchGroup';
import CountryDropdown from '../../components/CountryDropdown';
import RecentCitiesDiv from '../../components/RecentCitiesDiv';
import CurrentWeatherDiv from '../../components/CurrentWeatherDiv';
import HourlyForecastDiv from '../../components/HourlyForecastDiv';
import DailyForecastDiv from '../../components/DailyForecast';
import API from '../../utils/API';
import parseCityObj from '../../utils/ParseFunctions';
import * as LocalStorage from '../../utils/LocalStorage';
import UnitContext from '../../utils/UnitContext';
import countryArr from '../../constant/countries.json';
import DebugTool from '../../components/DebugTool';
import ThemeContext from '../../utils/ThemeContext';

const Home = () => {
  const localStorageKey = `recent-cities`;
  const hourlyForecastNumber = 24;
  const maxRecentCities = 3;
  const recentCitiesArr = LocalStorage.checkLocalStorage(localStorageKey) ? LocalStorage.checkLocalStorage(localStorageKey) : [];

  const [searchCity, setSearchCity] = useState(recentCitiesArr.length > 0 ? recentCitiesArr[0].city : `Seattle`); // search city input state
  const [selectedCountry, setSelectedCountry] = useState(recentCitiesArr.length > 0 ? recentCitiesArr[0].country : `US`); // country state to track selected country
  const [selectedCoord, setSelectedCoord] = useState(recentCitiesArr.length > 0 ? { lat: recentCitiesArr[0].lat, lon: recentCitiesArr[0].lon } : { lat: 47.61, lon: -122.33 });
  const [recentCities, setRecentCities] = useState(recentCitiesArr.length > 0 ? recentCitiesArr : []);
  const [showSearchButton, setShowSearchButton] = useState(false); // use to toggle search/locate button
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();

  const unitContext = useContext(UnitContext);
  const themeContext = useContext(ThemeContext);

  // unit change effect
  useEffect(() => {
    console.log(`unit changed, updating weather in searchCity and selectedCountry...`);
    console.log(`getting weather for ${searchCity}`)
    API.currentWeatherByCity({ units: unitContext.unitType, city: searchCity, country: selectedCountry })
      .then(res => {
        setCurrentWeather(res.data);
        getForecastByCoord({ units: unitContext.unitType, lat: res.data.coord.lat, lon: res.data.coord.lon });
      })
  }, [unitContext]);

  // city change effect
  useEffect(() => {
    console.log(`searchCity changed, updating current weather...`);
    getCurrentWeather();
  }, [searchCity]);

  // selected coord change effect
  useEffect(() => {
    console.log(`selectedCoord changed, updating forecast...`);
    getForecast();
  }, [selectedCoord]);

  // update selectedCountry state
  const updateSelectedCountryState = event => {
    const country = event.target.value;
    console.log(`selected ${country}`);
    setSelectedCountry(country);
  };

  // function that validates input and switch between search and locate me buttons
  const validateSearchField = event => (event.target.value.trim()) ? setShowSearchButton(true) : setShowSearchButton(false);

  // update recent cities state
  const updateRecentCities = newCityObj => {
    const currentRecentCitiesArr = recentCities;
    const existingCity = currentRecentCitiesArr.find(city => {
      return (city.city === newCityObj.city && city.country === newCityObj.country);
    });
    if (existingCity) return;
    const newRecentCitiesArr = [newCityObj, ...currentRecentCitiesArr];
    if (newRecentCitiesArr.length > maxRecentCities) { newRecentCitiesArr.pop() };
    setRecentCities(newRecentCitiesArr);
    LocalStorage.saveLocalStorage(localStorageKey, newRecentCitiesArr);
  }

  // check for enter key and update city state
  const keyPressed = event => {
    if (event.keyCode === 13) {
      const input = event.target.value;
      console.log(`enter key pressed, input value is '${input}', updating city state...`);
      getCurrentWeatherByCity(input, selectedCountry);
    }
  };

  const searchButtonPressed = (ref) => {
    const city = ref.current.value;
    console.log(city);
    getCurrentWeatherByCity(city, selectedCountry);
  }

  // api call functions
  const getCurrentWeatherByCity = (city, country) => {
    console.log(`getting current weather by city and country...`);
    API.currentWeatherByCity({ units: unitContext.unitType, city: city, country: country })
      .then(res => {
        console.log(`setting currentWeather state...`)
        setCurrentWeather(res.data);
        console.log(`passing coord to selectedCoord state...`);
        setSelectedCoord({ lat: res.data.coord.lat, lon: res.data.coord.lon });
        updateRecentCities(parseCityObj(res.data));
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 404) {
            alert(`Cannot find that city`);
          }
          alert(`Something is wrong, cannot get weather at this time`);
        }
      })
  };

  // get current weather using city and country state
  const getCurrentWeather = () => {
    console.log(`getting current weather using states...`);
    API.currentWeatherByCity({ units: unitContext.unitType, city: searchCity, country: selectedCountry })
      .then(res => {
        console.log(`setting currentWeather state...`)
        setCurrentWeather(res.data);
      })
  };

  // get current weather by taking coord in param
  const getCurrentWeatherByCoord = ({ lat, lon }) => {
    API.currentWeatherByCoord({ units: unitContext.unitType, lat: lat, lon: lon })
      .then(res => {
        setCurrentWeather(res.data);
        console.log(`adding recent-cities...`);
        console.log(parseCityObj(res.data));
        updateRecentCities(parseCityObj(res.data));
      });
  }

  // get forecast using coord state
  const getForecast = () => {
    console.log(`getting forecast using selectedCoord state...`);
    API.oneCallWeatherByCoord({ units: unitContext.unitType, lat: selectedCoord.lat, lon: selectedCoord.lon })
      .then(res => {
        console.log(`received forecast data from oneCall, setting forecast state...`);
        setForecast(res.data);
      })
  }

  // get forecast by taking coord in param
  const getForecastByCoord = ({ lat, lon }) => {
    console.log(`getting forecast using coord in param...`);
    API.oneCallWeatherByCoord({ units: unitContext.unitType, lat: lat, lon: lon })
      .then(res => {
        console.log(`received forecast data from oneCall, setting forecast state...`);
        setForecast(res.data);
      })
  };

  const locateMeButtonPressed = () => {
    const success = browserPosition => {
      const currentCoord = browserPosition.coords;
      getCurrentWeatherByCoord({ lat: currentCoord.latitude, lon: currentCoord.longitude });
      getForecastByCoord({ lat: currentCoord.latitude, lon: currentCoord.longitude });
    }

    const error = () => {
      console.log(`Unable to retrieve your location ...`);
    };

    if (!navigator.geolocation) {
      console.log(`Geolocation is not supported by your browser ...`)
    } else {
      console.log(`Getting your location ...`)
      const options = { timeout: 20000 };
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };

  const recentCityButtonPressed = ({ city, country, lat, lon }) => {
    setSelectedCountry(country);
    setSearchCity(city);
    setSelectedCoord({ lat: lat, lon: lon });
  };

  const removeCityButtonPressed = key => {
    const recentCitiesArr = recentCities;
    const index = recentCitiesArr.findIndex(city => city.key === key);
    recentCitiesArr.splice(index, 1);
    setRecentCities([...recentCitiesArr]);
    LocalStorage.saveLocalStorage(localStorageKey, recentCitiesArr);
  }

  // dev log functions
  const consoleRecentCities = () => console.log(recentCities);
  const consoleSelectedCountry = () => console.log(selectedCountry);
  const consoleSearchCity = () => console.log(searchCity);
  const consoleSelectedCoord = () => console.log(selectedCoord);

  return (
    <Container fluid="true" className={`vh-100 bg-${themeContext.backgroundColor}`}>
      <Col size="12" className={`mh-100 mx-0 px-0 bg-${themeContext.backgroundColor}`}>
        <Row className={`bg-${themeContext.backgroundColor}`}>
          <Col size="12 sm-12 md-4 lg-3 xl-3" className="">
            <SearchGroup
              onChange={validateSearchField}
              keyPressed={keyPressed}
              showSearchButton={showSearchButton}
              locateMeButtonPressed={locateMeButtonPressed}
              searchButtonPressed={searchButtonPressed} />
            <CountryDropdown
              countryArr={countryArr}
              selectedCountry={selectedCountry}
              onChange={updateSelectedCountryState} />
            {recentCities.length > 0 ?
              <RecentCitiesDiv
                recentCities={recentCities}
                recentCityButtonPressed={recentCityButtonPressed}
                removeCityButtonPressed={removeCityButtonPressed} />
              :
              ``
            }
            <DebugTool
              consoleRecentCities={consoleRecentCities}
              consoleSearchCity={consoleSearchCity}
              consoleSelectedCountry={consoleSelectedCountry}
              consoleSelectedCoord={consoleSelectedCoord}
            />
          </Col>

          <Col size="sm-12 md-8 lg-9 xl-9">
            {currentWeather ? <CurrentWeatherDiv currentWeather={currentWeather} /> : ``}
            {forecast ?
              <HourlyForecastDiv
                hourly={forecast.hourly}
                hours={hourlyForecastNumber}
                timezone={forecast.timezone_offset}
              />
              :
              ``
            }
            {forecast ?
              <DailyForecastDiv daily={forecast.daily} timezone={forecast.timezone_offset} /> : ``
            }
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default Home;
