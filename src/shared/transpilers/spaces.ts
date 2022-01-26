import { ConfigInstance, defaultConfig } from '../config';
import { getDirections } from '../directions';
import { getEndValue, parseWarn } from '../utils';

import type { StyleResult } from '../types';
export const spacesToStyleResult = (
  stringStyle: string,
  config?: ConfigInstance
): StyleResult[] => {
  const _config = config || defaultConfig;

  const typeRegex = [
    { type: 'padding', regex: /^pd-/ },
    { type: 'margin', regex: /^mg-/ },
  ];

  const type = typeRegex.find(({ regex }) => {
    return regex.exec(stringStyle);
  })?.type;

  if (!type) return parseWarn(stringStyle);

  const value = getEndValue(stringStyle, _config);
  if (typeof value !== 'number') {
    return parseWarn(stringStyle);
  }

  const directionRegex = /-([a-z]+)-/;
  const directionMatches = stringStyle.match(directionRegex);

  const directionsString =
    directionMatches?.length === 2 ? directionMatches[1] : '';

  const directions = getDirections(directionsString);

  const resultArray = directions.map((direction) => {
    const propertyName = `${type}${direction}`;
    return { propertyName, value, relativePixel: true };
  });

  return resultArray;
};
