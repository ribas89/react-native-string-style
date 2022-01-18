import {
  DEFAULT_COLORS,
  DEFAULT_GENERIC_ALIAS,
  DEFAULT_FONTS,
} from './constants';
import { getColor, scale, vscale } from './utils';
import type { FontPlatform } from './types';

const keyPairType = function (value: any) {
  const clone = JSON.parse(JSON.stringify(value));

  return clone as Array<{ [key: string]: string }>;
};

export const DEFAULT_CONFIG = {
  width: 414,
  height: 736,
  scale,
  vscale,
  colors: keyPairType(DEFAULT_COLORS),
  getColor,
  genericAlias: keyPairType(DEFAULT_GENERIC_ALIAS),
  fonts: JSON.parse(JSON.stringify(DEFAULT_FONTS)),
};

export type ConfigProps = Omit<typeof DEFAULT_CONFIG, 'fonts'> & {
  fonts: FontPlatform;
};

export class StringStyleConfig {
  private _width: ConfigProps['width'];
  private _height: ConfigProps['height'];
  private _scale: ConfigProps['scale'];
  private _vscale: ConfigProps['vscale'];
  private _colors: ConfigProps['colors'];
  private _getColor: ConfigProps['getColor'];
  private _genericAlias: ConfigProps['genericAlias'];
  private _fonts: ConfigProps['fonts'];

  constructor(props?: Partial<ConfigProps>) {
    this._width = props?.width || DEFAULT_CONFIG.width;
    this._height = props?.height || DEFAULT_CONFIG.height;
    this._scale = props?.scale || DEFAULT_CONFIG.scale;
    this._vscale = props?.vscale || DEFAULT_CONFIG.vscale;
    this._colors = props?.colors || DEFAULT_CONFIG.colors;
    this._getColor = props?.getColor || DEFAULT_CONFIG.getColor;
    this._genericAlias = props?.genericAlias || DEFAULT_CONFIG.genericAlias;
    this._fonts = props?.fonts || DEFAULT_CONFIG.fonts;
  }

  update(props: Partial<ConfigProps>) {
    this._width = props.width || this._width;
    this._height = props.height || this._height;
    this._scale = props.scale || this._scale;
    this._vscale = props.vscale || this._vscale;
    this._colors = props.colors || this._colors;
    this._genericAlias = props.genericAlias || this._genericAlias;
    this._fonts = props.fonts || this._fonts;
  }

  public get width() {
    return this._width;
  }

  public get scale() {
    return (value: number) => {
      return this._scale!(value, this);
    };
  }

  public get height() {
    return this._height;
  }

  public get vscale() {
    return (value: number) => {
      return this._vscale!(value, this);
    };
  }

  public get colors() {
    return this._colors;
  }

  public get getColor() {
    return (value: string) => {
      return this._getColor!(value, this);
    };
  }

  public get genericAlias() {
    return this._genericAlias;
  }

  public addGenericAlias(value: { alias: string; prop: string }) {
    this._genericAlias.push(value);
  }

  public get fonts() {
    return this._fonts;
  }
}

export type ConfigType = InstanceType<typeof StringStyleConfig>;

export const defaultConfig = new StringStyleConfig();
