import { ConfigInstance, defaultConfig } from './config';

import type { StyleResult } from './types';
export const kebabToCamelCase = (s: string) =>
  s.replace(/-./g, (x) => x[1].toUpperCase());

export const parseWarn = (stringStyle: string): StyleResult[] => {
  console.warn('react-native-string-style', 'cant parse string', stringStyle);
  return [{}] as unknown as StyleResult[];
};

export const getEndValue = (
  valueString: string,
  config?: ConfigInstance
): string | number => {
  const _config = config || defaultConfig;
  const valueRegex = /-([a-zA-Z0-9.#%:]+)$/;
  const valueMatches = valueString.match(valueRegex);

  if (valueMatches?.length !== 2) return 0;
  const numberValue = Number(valueMatches[1]);

  if (isNaN(numberValue)) return valueMatches[1];

  return _config.scale(numberValue);
};
