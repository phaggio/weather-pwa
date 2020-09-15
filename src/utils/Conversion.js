import Moment from 'moment';

// takes pascal string and convert to inHg in string
const convertPressure = (pascal, newUnitType) => {
  const pascalToInchMercury = 0.029529983071445;
  if (newUnitType === `imperial`) return (`${(parseInt(pascal) * pascalToInchMercury).toFixed(1)}`);
  return pascal;
}

// takes wind direction in degrees (string) and convert to compass direction (string)
const convertDirection = (degree, newUnitType) => {
  if (parseInt(degree) > 360 || parseInt(degree) < 0) return undefined;
  if (newUnitType === ``) return degree;
  const directions = [`N`, `NNE`, `NE`, `ENE`, `E`, `ESE`, `SE`, `SSE`, `S`, `SSW`, `SW`, `WSW`, `W`, `WNW`, `NW`, `NNW`];
  const padding = 11.25;
  const section = 22.5;
  const paddedDegree = parseInt(degree) + padding;
  return directions[Math.floor(paddedDegree / section)];
}

// takes appContext.unitType and return respective unit
const returnSpeedUnit = type => type === `imperial` ? `mph` : `m/s`;
const returnPressureUnit = type => type === `imperial` ? `inHg` : `hPa`;
const returnDegreeUnit = type => type === `` ? `°` : ``;
const returnRoundedTemperature = temperature => (temperature) ? (temperature).toFixed() : undefined;
const returnRoundedWindSpeed = speed => (speed) ? (speed).toFixed(1) : undefined;

// takes unix timestamp, offset in seconds, and output format and return local time
const unixToLocalTime = (unix, secondsOffset, format) => {
  const hoursOffset = secondsOffset / 60;
  return Moment.unix(unix).utc().utcOffset(hoursOffset).format(format)
}


export {
  convertPressure,
  convertDirection,
  returnSpeedUnit,
  returnPressureUnit,
  returnDegreeUnit,
  returnRoundedTemperature,
  returnRoundedWindSpeed,
  unixToLocalTime
}