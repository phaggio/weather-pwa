// parsing res.data from OpenWeatherMap API res.data
const parseCityObj = data => {
  return ({
    key: `${data.name}, ${data.sys.country}`,
    city: data.name,
    country: data.sys.country,
    lon: data.coord.lon,
    lat: data.coord.lat
  })
}

export default parseCityObj;