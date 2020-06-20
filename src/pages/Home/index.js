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
  const [searchCity, setSearchCity] = useState(`Seattle`); // search city input state
  const [selectedCountry, setSelectedCountry] = useState(`US`); // country state to track selected country
  const [selectedCoord, setSelectedCoord] = useState({ lat: 47.61, lon: -122.33 });
  const [recentCities, setRecentCities] = useState([]);
  const [showSearchButton, setShowSearchButton] = useState(false); // use to toggle search/locate button
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();

  const unitContext = useContext(UnitContext);
  const themeContext = useContext(ThemeContext);

  const localStorageKey = `recent-cities`;
  const hourlyForecastNumber = 24;

  // init useEffect
  useEffect(() => {
    // check recent cities in local storage
    const recentCitiesArr = LocalStorage.checkLocalStorage(localStorageKey);
    console.log(recentCitiesArr);
    if (recentCitiesArr.length > 0) {
      console.log(`non-empty recent cities array found in local storage, updating recentCities state...`)
      setRecentCities(recentCitiesArr);
      console.log(`getting weather for ${recentCitiesArr[0].city} with coord: lat: ${recentCitiesArr[0].lat} lon: ${recentCitiesArr[0].lon}`);
      setSearchCity(recentCitiesArr[0].city);
      setSelectedCountry(recentCitiesArr[0].country);
      // API.currentWeatherByCity({ units: unitContext.unitType, city: recentCitiesArr[0].city, country: recentCitiesArr[0].country })
      //   .then(res => {
      //     console.log(res.data);
      //     setCurrentWeather(res.data)
      //   });
      // getForecastByCoord({ units: unitContext.unitType, lat: recentCitiesArr[0].lat, lon: recentCitiesArr[0].lon });
    } else {
      console.log(`no existing recent city in local storage, getting default city weather...`)
      API.currentWeatherByCity({ units: unitContext.unitType, city: searchCity, country: selectedCountry })
    }
  }, []);

  // unit change effect
  useEffect(() => {
    console.log(`unit changed, updating weather in searchCity and selectedCountry...`)
    API.currentWeatherByCity({ units: unitContext.unitType, city: searchCity, country: selectedCountry })
      .then(res => {
        setCurrentWeather(res.data);
        getForecastByCoord({ units: unitContext.unitType, lat: res.data.coord.lat, lon: res.data.coord.lon });
      })
  }, [unitContext]);

  // city change effect
  useEffect(() => {
    console.log(`searchCity changed, updating current weather...`);
    // searchButtonPressed();
  }, [searchCity]);

  // selected coord change effect
  useEffect(() => {
    console.log(`selectedCoord changed, updating forecast...`);
  }, [selectedCoord]);


  // update selectedCountry state
  const updateSelectedCountryState = event => {
    const country = event.target.value;
    console.log(`selected ${country}`);
    setSelectedCountry(country);
  };

  // function that validates input and switch between search and locate me buttons
  const validateSearchField = event => (event.target.value.trim()) ? setShowSearchButton(true) : setShowSearchButton(false);

  const updateRecentCities = newCityObj => {
    const existingCity = recentCities.find(city => {
      return (city.city === newCityObj.city && city.country === newCityObj.country);
    });
    if (existingCity) return;
    const currentRecentCitiesArr = recentCities;
    if (currentRecentCitiesArr.length > 2) { currentRecentCitiesArr.splice(0, 1) };
    currentRecentCitiesArr.push(newCityObj);
    setRecentCities(currentRecentCitiesArr);
    console.log(`adding ${newCityObj.city} to list`)
    LocalStorage.saveLocalStorage(localStorageKey, currentRecentCitiesArr);
  }

  // check for enter key and update city state
  const keyPressed = event => {
    if (event.keyCode === 13) {
      const input = event.target.value;
      console.log(`enter key pressed, input value is '${input}', updating city state...`);
      setSearchCity(input);
    }
  }

  // api call functions
  const searchButtonPressed = () => {
    console.log(`getting current weather by city and country...`);
    API.currentWeatherByCity({ units: unitContext.unitType, city: searchCity, country: selectedCountry })
      .then(res => {
        // pass raw data to currentWeather state
        console.log(`setting currentWeather state...`)
        setCurrentWeather(res.data);
        // console.log(parseCityObj(res.data))
        console.log(res.data)
        console.log(`passing coord to selectedCoord state...`);
        setSelectedCoord({ lat: res.data.coord.lat, lon: res.data.coord.lon });
        // getForecastByCoord({ units: unitContext.unitType, lat: res.data.coord.lat, lon: res.data.coord.lon }); // another API call to get forecast data
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

  const getForecast = () => {
    console.log(`getting forecast using selectedCoord state...`);
    API.oneCallWeatherByCoord({ units: unitContext.unitType, lat: selectedCoord.lat, lon: selectedCoord.lon })
      .then(res => {
        console.log(`received forecast data from oneCall, setting forecast state...`);
        setForecast(res.data);
      })
  }

  const getForecastByCoord = ({ units, lat, lon }) => {
    console.log(lat, lon)
    API.oneCallWeatherByCoord({ units, lat, lon })
      .then(res => {
        console.log(`oneCallData`, res.data)
        setForecast(res.data);
      })
  };

  const locateMeButtonPressed = () => {
    const success = browserPosition => {
      API.currentWeatherByCoord({
        units: unitContext.unitType,
        lat: browserPosition.coords.latitude,
        lon: browserPosition.coords.longitude
      })
        .then(res => {
          setCurrentWeather(res.data);
          updateRecentCities(parseCityObj(res.data));
        });
      getForecastByCoord({
        units: unitContext.unitType,
        lat: browserPosition.coords.latitude,
        lon: browserPosition.coords.longitude
      });
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
    // API.currentWeatherByCity({ units: unitContext.unitType, city: city, country: country })
    //   .then(res => {
    //     // pass weather data to currentWeather state
    //     setCurrentWeather(res.data);
    //     getForecastByCoord({ units: unitContext.unitType, lat: res.data.coord.lat, lon: res.data.coord.lon })
    //   })
  };

  const removeCityButtonPressed = key => {
    const recentCitiesArr = recentCities;
    const index = recentCitiesArr.findIndex(city => city.key === key);
    recentCitiesArr.splice(index, 1);
    setRecentCities(recentCitiesArr);
    LocalStorage.saveLocalStorage(localStorageKey, recentCitiesArr);
  }

  // dev log functions
  const consoleRecentCities = () => console.log(recentCities);
  const consoleSelectedCountry = () => console.log(selectedCountry);
  const consoleSearchCity = () => console.log(searchCity);
  const consoleSelectedCoord = () => console.log(selectedCoord);

  const homeStyle = {
    minHeight: `1150px`
  }

  return (

    <Container fluid="true" className={`vh-100 bg-${themeContext.backgroundColor}`}>
      <Col size="12" className={`mh-100 mx-0 px-0 bg-${themeContext.backgroundColor}`} style={homeStyle}>
        <Row className={`bg-${themeContext.backgroundColor}`}>
          <Col size="12 sm-12 md-4 lg-3 xl-3" className="">
            <SearchGroup
              onChange={validateSearchField}
              // onChange={searchCityInput}
              keyPressed={keyPressed}
              showSearchButton={showSearchButton}
              locateMeButtonPressed={locateMeButtonPressed}
              searchButtonPressed={searchButtonPressed} />
            <CountryDropdown
              countryArr={countryArr}
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
