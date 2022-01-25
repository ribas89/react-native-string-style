import type { FontPlatform } from '../types';

export type ConfigProps = {
  width: number;
  height: number;
  scale: (value: any, config: ConfigInstance) => number;
  vscale: (value: any, config: ConfigInstance) => number;
  colors: {
    [key: string]: any;
  }[];
  getColor: (color: string, config: ConfigInstance) => string;
  genericAlias: {
    [key: string]: any;
  }[];
  fonts: FontPlatform;
};

export class AbstractConfig {
  private _width: number;
  private _height: number;
  private _scale: (value: any, config: ConfigInstance) => number;
  private _vscale: (value: any, config: ConfigInstance) => number;
  private _colors: {
    [key: string]: any;
  }[];
  private _getColor: (color: string, config: ConfigInstance) => string;
  private _genericAlias: {
    [key: string]: any;
  }[];
  private _fonts: FontPlatform;

  constructor(props: ConfigProps) {
    this._width = props.width;
    this._height = props.height;
    this._scale = props.scale;
    this._vscale = props.vscale;
    this._colors = props.colors;
    this._getColor = props.getColor;
    this._genericAlias = props.genericAlias;
    this._fonts = props.fonts;
  }

  update(props: Partial<ConfigProps>) {
    this._width = props?.width || this._width;
    this._height = props?.height || this._height;
    this._scale = props?.scale || this._scale;
    this._vscale = props?.vscale || this._vscale;
    this._colors = props?.colors || this._colors;
    this._genericAlias = props?.genericAlias || this._genericAlias;
    this._fonts = props?.fonts || this._fonts;
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
      return this._vscale!(value, this as any);
    };
  }

  public get colors() {
    return this._colors;
  }

  public get getColor() {
    return (value: string) => {
      return this._getColor!(value, this as any);
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

export type ConfigInstance = InstanceType<typeof AbstractConfig>;
