import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row } from '../../components/Grid';
import SearchGroup from '../../components/SearchGroup';
import CountryDropdown from '../../components/CountryDropdown';
import RecentCitiesDiv from '../../components/RecentCitiesDiv';
import CurrentWeatherDiv from '../../components/CurrentWeatherDiv';
import HourlyForecastDiv from '../../components/HourlyForecastDiv';
import DailyForecastDiv from '../../components/DailyForecast';
import API from '../../utils/API';
import UnitContext from '../../utils/UnitContext';
import countryArr from '../../constant/countries.json';
// import DebugTool from '../../components/DebugTool';
import ThemeContext from '../../utils/ThemeContext';

const Home = () => {
  const [searchCity, setSearchCity] = useState();
  const [selectedCountry, setSelectedCountry] = useState(`US`);
  const [recentCities, setRecentCities] = useState([]);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();

  const unitContext = useContext(UnitContext);
  const themeContext = useContext(ThemeContext);

  const localStorageKey = `recentCities`;
  const hourlyForecastNumber = 24;

  useEffect(() => {
    checkLocalStorage(`recentCities`);
    API.currentWeatherByCity({ units: unitContext.unitType, city: `Seattle`, country: `US` })
      .then(res => {
        setCurrentWeather(res.data);
        getForecastByCoord({ units: unitContext.unitType, lat: res.data.coord.lat, lon: res.data.coord.lon });
      })
  }, [unitContext]);

  // local storage functions
  const checkLocalStorage = key => setRecentCities(JSON.parse(localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : []);
  const saveLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));


  // state functions
  const updateSearchCityState = event => {
    const city = event.target.value.trim();
    if (city.length > 0) { setSearchCity(city) };
    validateSearchCity(city);
  };

  const updateSelectedCountryState = event => {
    const country = event.target.value;
    setSelectedCountry(country);
  };

  const validateSearchCity = input => (input.trim()) ? setShowSearchButton(true) : setShowSearchButton(false);

  const updateRecentCities = newCityObj => {
    const existingCity = recentCities.find(city => {
      return (city.city === newCityObj.city && city.country === newCityObj.country);
    });
    if (existingCity) {
      return;
    } else {
      setRecentCities([...recentCities, newCityObj]);
      saveLocalStorage(localStorageKey, [...recentCities, newCityObj]);
    }
  }

  useEffect(() => {
    saveLocalStorage(localStorageKey, recentCities);
  })

  const keyPressed = event => {
    if (event.keyCode === 13 && searchCity) {
      searchButtonPressed();
    }
  }

  // api call functions
  const searchButtonPressed = () => {
    API.currentWeatherByCity({ units: unitContext.unitType, city: searchCity, country: selectedCountry })
      .then(res => {
        setCurrentWeather(res.data);
        updateRecentCities({
          key: `${res.data.name}, ${res.data.sys.country}`,
          city: res.data.name,
          country: res.data.sys.country,
          lon: res.data.coord.lon,
          lat: res.data.coord.lat
        });
        getForecastByCoord(...res.data.coord, { units: unitContext.unitType }); // another API call to get forecast data
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

  const getForecastByCoord = ({ units, lat, lon }) => {
    API.oneCallWeatherByCoord({ units, lat, lon })
      .then(res => {
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
          updateRecentCities({
            key: `${res.data.name}, ${res.data.sys.country}`,
            city: res.data.name,
            country: res.data.sys.country,
            lon: res.data.coord.lon,
            lat: res.data.coord.lat
          });
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

  const recentCityButtonPressed = ({ city, country }) => {
    API.currentWeatherByCity({ units: unitContext.unitType, city: city, country: country })
      .then(res => {
        setCurrentWeather(res.data);
        getForecastByCoord({ units: unitContext.unitType, lat: res.data.coord.lat, lon: res.data.coord.lon })
      })
  };

  const removeCityButtonPressed = key => {
    const tempArr = [...recentCities];
    const index = tempArr.findIndex(city => city.key === key);
    tempArr.splice(index, 1);
    setRecentCities(tempArr)
  }

  // dev log functions
  const consoleRecentCities = () => console.log(recentCities);
  const consoleSelectedCountry = () => console.log(selectedCountry);
  const consoleSearchCity = () => console.log(searchCity);

  const homeStyle = {
    minHeight: `1150px`
  }

  return (

    <Container fluid="true" className={`vh-100 bg-${themeContext.backgroundColor}`}>
      <Col size="12" className={`mh-100 mx-0 px-0 bg-${themeContext.backgroundColor}`} style={homeStyle}>
        <Row className={`bg-${themeContext.backgroundColor}`}>
          <Col size="12 sm-12 md-4 lg-3 xl-3" className="">
            <SearchGroup
              onChange={updateSearchCityState}
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
            {/* <DebugTool
              consoleRecentCities={consoleRecentCities}
              consoleSearchCity={consoleSearchCity}
              consoleSelectedCountry={consoleSelectedCountry} /> */}
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
