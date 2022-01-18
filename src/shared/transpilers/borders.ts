import { ConfigType, defaultConfig } from '../config';
import { getDirections } from '../directions';
import { getEndValue, parseWarn } from '../utils';

import type { StyleResult } from '../types';
export const borderToStyleResult = (
  stringStyle: string,
  config?: ConfigType
): StyleResult[] => {
  const _config = config || defaultConfig;
  const propRegex = /-([a-z]+)-/;
  const propMatches = stringStyle.match(propRegex);

  const directionRegex = /bd-[a-z]+-([a-z]+)-/;
  const directionMatches = stringStyle.match(directionRegex);
  const directionsString =
    directionMatches?.length === 2 ? directionMatches[1] : '';

  let directions = getDirections(directionsString);

  let value = getEndValue(stringStyle, _config);

  if (propMatches?.length !== 2) {
    return parseWarn(stringStyle);
  }

  const propString = propMatches[1];
  let propType = '';

  switch (propString) {
    case 'ra':
    case 'radius':
      propType = 'radius';
      directions = directions.map((d) => {
        const cleanDirection = d.replace(/-/g, '');
        const capitalized =
          cleanDirection.charAt(0).toUpperCase() + cleanDirection.slice(1);
        return capitalized;
      });
      directions = [directions.reduce((prev, curr) => prev + curr)];
      const propertyName = `border${directions}-radius`;

      return [{ propertyName, value, relativePixel: true }];
    case 'w':
      propType = 'width';
      break;
    case 'c':
    case 'color':
      propType = 'color';
      value = _config.getColor(value as string) || value;
      break;
    default:
      propType = propString;
  }

  const resultArray = directions.map((direction) => {
    const propertyName = `border${direction}-${propType}`;
    return { propertyName, value };
  });

  return resultArray;
};
