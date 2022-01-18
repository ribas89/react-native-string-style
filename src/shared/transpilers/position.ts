import { ConfigType, defaultConfig } from '../config';
import { getDirections } from '../directions';
import { getEndValue, parseWarn } from '../utils';

import type { StyleResult } from '../types';
export const positionToStyleResult = (
  stringStyle: string,
  config?: ConfigType
): StyleResult[] => {
  const _config = config || defaultConfig;
  const propRegex = /^pos-([a-z]+)$/;
  const propMatches = stringStyle.match(propRegex);

  if (propMatches?.length === 2) {
    let value = '';
    const propString = propMatches[1];

    if (propString === 'abs') value = 'absolute';
    if (propString === 'rel') value = 'relative';

    if (value) {
      return [{ propertyName: 'position', value }];
    }

    return parseWarn(stringStyle);
  }

  const directionRegex = /^pos-([a-z]+)-[0-9]+$/;
  const directionMatches = stringStyle.match(directionRegex);
  if (!directionMatches) return parseWarn(stringStyle);

  const value = getEndValue(stringStyle, _config);

  const directions = getDirections(directionMatches[1]);

  const resultArray = directions.map((direction) => {
    const propertyName = direction.replace('-', '');

    return { propertyName, value, relativePixel: true };
  });

  return resultArray;
};
