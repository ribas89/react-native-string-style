import {
  DEFAULT_COLORS,
  DEFAULT_FONTS,
  DEFAULT_GENERIC_ALIAS,
} from '../constants';
import { getColor, scale, vscale } from '../utils';
import { AbstractConfig, ConfigProps } from './config-class';

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
