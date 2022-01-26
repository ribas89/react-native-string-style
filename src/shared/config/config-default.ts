import _ from 'lodash';
import { Dimensions } from 'react-native';

import {
  DEFAULT_COLORS,
  DEFAULT_FONTS,
  DEFAULT_GENERIC_ALIAS,
  DEFAULT_JS_COLORS,
  REGEX_HEX,
} from '../constants';
import { AbstractConfig, ConfigInstance, ConfigProps } from './config-class';

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

export function scale(value: any, config: ConfigInstance) {
  const { width } = Dimensions.get('window');
  return relativePixel({
    value,
    realDimension: width,
    scaledDimension: config.width,
  });
}

export function vscale(value: any, config: ConfigInstance): number {
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

export function getColor(color: string, config: ConfigInstance) {
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

const keyPairType = function (value: any) {
  const clone = JSON.parse(JSON.stringify(value));

  return clone as Array<{ [key: string]: any }>;
};

export const DEFAULT_CONFIG_PROPS = {
  width: 414,
  height: 736,
  scale,
  vscale,
  colors: keyPairType(DEFAULT_COLORS),
  getColor,
  genericAlias: keyPairType(DEFAULT_GENERIC_ALIAS),
  fonts: JSON.parse(JSON.stringify(DEFAULT_FONTS)),
};

export class Config extends AbstractConfig {
  constructor(props?: Partial<ConfigProps>) {
    super({ ...DEFAULT_CONFIG_PROPS, ...props });
  }
}

export const defaultConfig = new Config();
