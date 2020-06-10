// takes pascal string and convert to inHg with unit in string
const pascalToInchMercury = pascal => {
  const inputInt = parseInt(pascal)
  return (`${(inputInt * 0.029529983071445).toFixed(1)} inHg`)
}

// takes wind direction in degrees (string) and convert to compass direction (string)
const degreeToDirection = degree => {
  const directions = [`N`, `NNE`, `NE`, `ENE`, `E`, `ESE`, `SE`, `SSE`, `S`, `SSW`, `SW`, `WSW`, `W`, `WNW`, `NW`, `NNW`];
  const padding = 11.25;
  const section = 22.5;
  if (parseInt(degree) > 360 || parseInt(degree) < 0) return undefined;
  const paddedDegree = parseInt(degree) + padding;
  return directions[Math.floor(paddedDegree / section)];
}


export { pascalToInchMercury, degreeToDirection }