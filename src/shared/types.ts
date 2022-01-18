export type StyleResult = {
  propertyName: string;
  value: number | string;
  relativePixel?: boolean;
};

export type CompileResultsProps = {
  keyStyle: string;
  stringStyle: string;
  flattenedStyleObject: any;
};

export type FontItem = {
  alias: string;
  name: string;
};

export type FontPlatform = {
  ios: FontItem[];
  android: FontItem[];
};
