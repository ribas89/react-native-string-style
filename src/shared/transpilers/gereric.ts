import { ConfigInstance, defaultConfig } from '../config';
import { parseWarn } from '../utils';

import type { StyleResult } from '../types';
export const genericToStyleResult = (
  stringStyle: string,
  config?: ConfigInstance
): StyleResult[] => {
  const _config = config || defaultConfig;

  const propRegex = /^([a-z\-]+)-([a-zA-Z0-9.#%:]+)$/;
  const propMatches = stringStyle.match(propRegex);

  if (propMatches?.length !== 3) return parseWarn(stringStyle);

  let propertyMatch = propMatches[1];

  const propertyName =
    _config.genericAlias.find((a: any) => a.alias === propertyMatch)?.prop ||
    propertyMatch;

  const value: any = propMatches[2];

  const colorValue = _config?.getColor(value) || false;
  if (colorValue && colorValue !== value) {
    return [{ propertyName, value: colorValue }];
  }

  const numberValue = Number(value);
  if (!isNaN(numberValue)) {
    const scaledValue = _config?.scale(numberValue) || numberValue;
    return [
      {
        propertyName,
        value: scaledValue,
        relativePixel: true,
      },
    ];
  }

  return [{ propertyName, value }];
};
