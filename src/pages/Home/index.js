import React, { useState, useEffect, useContext } from 'react';
import { SearchGroup, CountryDropdown, RecentCitiesDiv } from '../../components';
import CurrentWeatherDiv from '../../components/CurrentWeatherDiv';
import HourlyForecastDiv from '../../components/HourlyForecastDiv';
import DailyForecastDiv from '../../components/DailyForecastDiv';
import API from '../../utils/API';
import parseCityObj from '../../utils/ParseFunctions';
import * as LocalStorage from '../../utils/LocalStorage';
import UnitContext from '../../utils/UnitContext';
import countryArr from '../../constant/countries.json';
import ThemeContext from '../../utils/ThemeContext';

const Home = () => {
	console.log('rendering Home page ...')
	const [userInput, updateUserInput] = useState('');
	const [showSearchButton, updateShowSearchButton] = useState(false);


	const localStorageKey = `recent-cities`;
	const hourlyForecastNumber = 24;
	const maxRecentCities = 6;
	const savedCities = LocalStorage.checkLocalStorage(localStorageKey) ? LocalStorage.checkLocalStorage(localStorageKey) : [];


	const [searchCity, updateSearchCity] = useState(`Seattle`);
	const [selectedCountry, setSelectedCountry] = useState(savedCities.length > 0 ? savedCities[0].country : `US`);
	const [selectedCoord, setSelectedCoord] = useState(savedCities.length > 0 ? { lat: savedCities[0].lat, lon: savedCities[0].lon } : { lat: 47.61, lon: -122.33 });
	const [recentCities, setRecentCities] = useState(savedCities);

	const [currentWeather, setCurrentWeather] = useState();
	const [forecast, setForecast] = useState();

	const unitContext = useContext(UnitContext);
	const themeContext = useContext(ThemeContext);

	// unit change effect
	useEffect(() => {
		getCurrentWeatherByCoord(selectedCoord)
		getForecastByCoord(selectedCoord)
	}, [unitContext]);

	// get forecast when coord state updates
	useEffect(() => {
		getForecast();
	}, [selectedCoord]);

	// update selectedCountry
	const updateSelectedCountryState = event => {
		const country = event.target.value;
		setSelectedCountry(country);
	};

	// toggle search and locate me buttons
	useEffect(() => {
		if (userInput) {
			updateShowSearchButton(true);
		} else {
			updateShowSearchButton(false);
		}
	}, [userInput])

	// update recent cities state
	const updateRecentCities = newCityObj => {
		const recentCitiesArr = recentCities;
		const exist = recentCitiesArr.find(city => { return (city.city === newCityObj.city && city.country === newCityObj.country) });
		if (exist) return;
		console.log(`adding ${newCityObj.city} to recent cities...`)
		const newRecentCitiesArr = [newCityObj, ...recentCitiesArr];
		if (newRecentCitiesArr.length > maxRecentCities) { newRecentCitiesArr.pop() };
		setRecentCities(newRecentCitiesArr);
		LocalStorage.saveLocalStorage(localStorageKey, newRecentCitiesArr);
	}

	// check for enter key pressed
	const keyPressed = code => { if (code === 13) console.log('enter pressed ...') };

	// when search button is pressed
	const searchButtonPressed = () => {
		updateSearchCity(userInput);
		// getCurrentWeatherByCity(searchCity, selectedCountry);
	}

	// only called when searching a new city
	const getCurrentWeatherByCity = (city, country) => {
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
					if (err.response.status === 404) { alert(`Cannot find that city`) }
					else { alert(`Something is wrong, cannot get weather at this time`) }
				}
			});
	};

	// only call when user press locate me button
	const getCurrentWeatherByCoord = ({ lat, lon }) => {
		API.currentWeatherByCoord({ units: unitContext.unitType, lat: lat, lon: lon })
			.then(res => {
				console.log(`updating currentWeather state...`);
				setCurrentWeather(res.data);
				updateRecentCities(parseCityObj(res.data));
			});
	}

	// get forecast using coord state, useEffect
	const getForecast = () => {
		console.log(`getting forecast using selectedCoord state...`);
		API.oneCallWeatherByCoord({ units: unitContext.unitType, lat: selectedCoord.lat, lon: selectedCoord.lon })
			.then(res => {
				console.log(`received forecast data from oneCall, setting forecast state...`);
				setForecast(res.data);
			})
			.catch(err => {
				if (err.response) {
					if (err.response.status === 404) { alert(`Cannot find forecast for that city`) }
					else { alert(`Something is wrong, cannot get forecast at this time`) }
				}
			});
	}

	// get forecast by coord in arg, this is only called when unit changes
	const getForecastByCoord = ({ lat, lon }) => {
		API.oneCallWeatherByCoord({ units: unitContext.unitType, lat: lat, lon: lon })
			.then(res => { setForecast(res.data) })
	};

	const locateMeButtonPressed = () => {
		const success = browserPosition => {
			const coords = browserPosition.coords;
			console.log(`getting current weather by coord...`);
			console.log(browserPosition)
			getCurrentWeatherByCoord({ lat: coords.latitude, lon: coords.longitude });
			console.log(`updating selectedCoord state...`);
			setSelectedCoord({ lat: coords.latitude, lon: coords.longitude });
		}

		const error = err => {
			alert(`Unable to retrieve your location at this time`);
			console.log(err);
		};

		if (!navigator.geolocation) {
			console.log(`Geolocation is not supported by your browser ...`);
			alert(`Geolocation is not supported by your browser...`);
		} else {
			console.log(`Getting your location ...`)
			const options = { timeout: 12000 };
			navigator.geolocation.getCurrentPosition(success, error, options);
		}
	};

	const recentCityButtonPressed = ({ city, country }) => {
		setSelectedCountry(country);
		updateSearchCity(city);
		getCurrentWeatherByCity(city, country);
	};

	const removeCityButtonPressed = key => {
		const recentCitiesArr = recentCities;
		const index = recentCitiesArr.findIndex(city => city.key === key);
		recentCitiesArr.splice(index, 1);
		setRecentCities([...recentCitiesArr]);
		LocalStorage.saveLocalStorage(localStorageKey, recentCitiesArr);
	};


	return (
		<div className={`container-fluid bg-${themeContext.backgroundColor}`} style={{ height: '100vh', overflow: 'auto' }}>
			<div className="row">
				<div className="col-12 col-md-4 col-lg-3">

					<SearchGroup
						onChange={updateUserInput}
						keyPressed={keyPressed}
						showSearchButton={showSearchButton}
						locateMeButtonPressed={locateMeButtonPressed}
						searchButtonPressed={searchButtonPressed} />
					<CountryDropdown
						countryArr={countryArr}
						selectedCountry={selectedCountry} // selected country code
						onChange={updateSelectedCountryState} />
					{recentCities.length > 0 ?
						<RecentCitiesDiv
							recentCities={recentCities}
							recentCityButtonPressed={recentCityButtonPressed}
							removeCityButtonPressed={removeCityButtonPressed}
						/>
						:
						``
					}
				</div>

				<div className="col-12 col-md-8 col-lg-9">
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

				</div>
			</div>
		</div>
	);
}

export default Home;
