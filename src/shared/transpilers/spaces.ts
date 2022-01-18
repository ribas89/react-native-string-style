import { ConfigType, defaultConfig } from '../config';
import { getDirections } from '../directions';
import { resolveFunction } from '../resolver';
import { getEndValue, parseWarn } from '../utils';

import type { StyleResult } from '../types';
export const spacesToStyleResult = (
  stringStyle: string,
  config?: ConfigType
): StyleResult[] => {
  const _config = config || defaultConfig;

  const regexFunction = resolveFunction(stringStyle);
  if (!regexFunction) return parseWarn(stringStyle);

  const value = getEndValue(stringStyle, _config);
  if (!value || typeof value !== 'number') {
    return parseWarn(stringStyle);
  }

  const directionRegex = /-([a-z]+)-/;
  const directionMatches = stringStyle.match(directionRegex);

  const directionsString =
    directionMatches?.length === 2 ? directionMatches[1] : '';

  const directions = getDirections(directionsString);

  const resultArray = directions.map((direction) => {
    const propertyName = `${regexFunction.name}${direction}`;
    return { propertyName, value, relativePixel: true };
  });

  return resultArray;
};
