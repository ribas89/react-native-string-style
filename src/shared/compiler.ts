import _ from 'lodash';
import { StyleProp, StyleSheet } from 'react-native';
// @ts-ignore
import hash from 'string-hash-64';

import { resolveFunction } from './resolver';
import { formatStyleObject } from './transpilers/formatters';
import { genericToStyleResult } from './transpilers/gereric';

import type { StyleResult, CompileResultsProps } from './types';
import type { ConfigType } from './config';
import { parseWarn } from './utils';
export const partialResultCache = {} as any;
export const finalResultCache = {} as any;

export const recursiveMerge = (arr: any[], instance = [] as any[]) => {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      recursiveMerge(value, instance);
    } else {
      instance?.push(value);
    }
  }

  return instance;
};

export const stringToStyleResult = (
  stringStyles: string,
  config?: ConfigType
): StyleResult[] => {
  const finalCacheIndex = hash(stringStyles);
  const finalCache = finalResultCache[finalCacheIndex];
  if (finalCache) {
    return finalCache;
  }

  const stringArray = stringStyles.split(' ');

  const partialStyles = [];
  for (let i = 0; i < stringArray.length; i++) {
    const stringStyle = stringArray[i];
    const kebabFormat = /^(.+)-(.+)$/;
    const singleFormat = /^(\w+)$/;

    if (!kebabFormat.exec(stringStyle) && !singleFormat.exec(stringStyle)) {
      parseWarn(stringStyle);
      continue;
    }

    const partialCacheIndex = hash(stringStyle);
    const partialCache = partialResultCache[partialCacheIndex];

    if (partialCache) {
      partialStyles.push(partialCache);
      continue;
    }

    let regexFunction = resolveFunction(stringStyle);

    const func = regexFunction?.func || genericToStyleResult;

    let partialResult = func(stringStyle, config);

    const removeEmptyResults = (r: any) =>
      typeof r === 'object' && Object.keys(r).length > 0;

    partialResult = partialResult.filter(removeEmptyResults);

    if (partialResult?.length < 1) {
      continue;
    }

    partialResultCache[partialCacheIndex] = partialResult;

    partialStyles.push(partialResult);
  }

  const flattenedStyles = recursiveMerge(partialStyles, []);

  finalResultCache[finalCacheIndex] = flattenedStyles;

  return flattenedStyles;
};

export const nativeStyleCache = {} as any;

export const compileResults = (
  func: (props: CompileResultsProps) => void,
  styleEntires: [string, string][],
  config?: ConfigType
) => {
  styleEntires.forEach(([keyStyle, stringStyle]) => {
    const styleResultArray = stringToStyleResult(stringStyle, config);
    const styleObjectArray = styleResultArray.map(formatStyleObject);
    const flattenedStyleObject = _.merge({}, ...styleObjectArray);
    func({ keyStyle, stringStyle, flattenedStyleObject });
  });
};

export const objToRNStyle = (
  stringStylesObject: {
    [key: string]: string;
  },
  config?: ConfigType
) => {
  const styleEntires = Object.entries(stringStylesObject);
  if (!styleEntires.length) return StyleSheet.create({});

  let concatStyle = '';
  for (let i = 0; i < styleEntires.length; i++) {
    const [keyStyle, stringStyle] = styleEntires[i];
    concatStyle += keyStyle + stringStyle;
  }

  const nativeCacheIndex = hash(concatStyle);
  const nativeStyleCached = nativeStyleCache[nativeCacheIndex];
  if (nativeStyleCached) {
    return nativeStyleCached;
  }

  const finalStyleObject = {};
  compileResults(
    ({ keyStyle, flattenedStyleObject }) =>
      _.set(finalStyleObject, keyStyle, flattenedStyleObject),
    styleEntires,
    config
  );

  const nativeStyleSheet = StyleSheet.create({ ...finalStyleObject });

  nativeStyleCache[nativeCacheIndex] = nativeStyleSheet;

  return nativeStyleSheet;
};

export const mergeNativeStyle = ({
  sstyle,
  style,
}: {
  sstyle?: string;
  style?: StyleProp<any>;
}) => {
  if (sstyle && style) {
    const compiledStyle = objToRNStyle({ keyName: sstyle });
    const composedStyle = StyleSheet.compose(compiledStyle.keyName, style);
    return composedStyle;
  }

  if (sstyle) {
    return objToRNStyle({ keyName: sstyle }).keyName;
  }

  if (style) return style;
};
