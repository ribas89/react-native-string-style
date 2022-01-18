import { ConfigType, defaultConfig } from '../config';
import { parseWarn } from '../utils';

import type { StyleResult } from '../types';
export const genericToStyleResult = (
  stringStyle: string,
  config?: ConfigType
): StyleResult[] => {
  const _config = config || defaultConfig;

  const propRegex = /^([a-z\-]+)-([a-zA-Z0-9.#%:]+)$/;
  const propMatches = stringStyle.match(propRegex);

  if (propMatches?.length !== 3) return parseWarn(stringStyle);

  let propertyName = propMatches[1];

  propertyName =
    _config.genericAlias.find((a: any) => a.alias === propertyName)?.prop ||
    propertyName;

  let value: any = propMatches[2];

  const colorValue = _config?.getColor(value) || false;
  if (colorValue && colorValue !== value) {
    return [{ propertyName, value: colorValue }];
  }

  if (/^\d+$/.exec(value)) {
    value = _config?.scale(Number(value)) || value;
    return [
      {
        propertyName,
        value,
        relativePixel: true,
      },
    ];
  }

  return [{ propertyName, value }];
};
