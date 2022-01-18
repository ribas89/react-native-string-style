import _ from 'lodash';
import { Dimensions } from 'react-native';

import { ConfigType, defaultConfig } from './config';
import { DEFAULT_JS_COLORS, REGEX_HEX } from './constants';

import type { StyleResult } from './types';
export const kebabToCamelCase = (s: string) =>
  s.replace(/-./g, (x) => x[1].toUpperCase());

export const parseWarn = (stringStyle: string): StyleResult[] => {
  console.warn('react-native-string-style', 'cant parse string', stringStyle);
  return [{}] as unknown as StyleResult[];
};

export const getEndValue = (
  valueString: string,
  config?: ConfigType
): string | number => {
  const _config = config || defaultConfig;
  const valueRegex = /-([a-zA-Z0-9.#%:]+)$/;
  const valueMatches = valueString.match(valueRegex);

  if (valueMatches?.length !== 2) return 0;
  const numberValue = Number(valueMatches[1]);

  if (isNaN(numberValue)) return valueMatches[1];

  return _config.scale(numberValue);
};

export function relativePixel({
  value,
  realDimension,
  scaledDimension,
}: {
  value?: any;
  realDimension: number;
  scaledDimension: number;
}) {
  if (!value) return 0;
  const numberValue = Number(value);
  if (isNaN(numberValue)) return 0;

  const scaled = Math.round((realDimension / scaledDimension) * numberValue);
  return !!scaled ? scaled : 1;
}

export function scale(value: any, config: ConfigType) {
  const { width } = Dimensions.get('window');
  return relativePixel({
    value,
    realDimension: width,
    scaledDimension: config.width,
  });
}

export function vscale(value: any, config: ConfigType): number {
  const { height } = Dimensions.get('window');
  return relativePixel({
    value,
    realDimension: height,
    scaledDimension: config.height,
  });
}

export function getAlpha(value: number): string {
  const _alpha = Number(value) / 100;
  return Math.floor(_alpha * 255)
    .toString(16)
    .padStart(2, '0');
}

export function getColor(color: string, config: ConfigType) {
  let _color = color;
  let alphaValue = '';

  const alphaMatch = _color.match(/^(.+):alpha:(\d+)$/);
  if (alphaMatch) {
    _color = alphaMatch[1];
    const alpha = Number(alphaMatch[2]);
    alphaValue = !!alpha ? getAlpha(alpha) : '';
  }

  if (REGEX_HEX.exec(_color)) return _color + alphaValue;

  const colorHex = _.get(config.colors, _color, false);
  if (colorHex) return colorHex + alphaValue;

  const colorHexJs = (DEFAULT_JS_COLORS as any)[_color];
  if (colorHexJs) return colorHexJs + alphaValue;

  return _color;
}
