import _ from 'lodash';
import { Platform } from 'react-native';

import { ConfigType, defaultConfig } from '../config';
import { parseWarn } from '../utils';

import type { StyleResult } from '../types';
export const fontFamilyToStyleResult = (
  stringStyle: string,
  config?: ConfigType
): StyleResult[] => {
  const _config = config || defaultConfig;
  const fontAliasRegex = /^ff-(.+)$/;
  const aliasMatches = stringStyle.match(fontAliasRegex);
  if (!aliasMatches) {
    return parseWarn(stringStyle);
  }
  const alias = aliasMatches[1];

  const fontArray =
    Platform.OS === 'ios' ? _config.fonts.ios : _config.fonts.android;
  const font = fontArray.find((f) => f.alias === alias);

  if (!font) {
    return parseWarn(stringStyle);
  }

  return [{ propertyName: 'font-family', value: font.name }];
};

export const fontWeightToStyleResult = (stringStyle: string): StyleResult[] => {
  const fontAliasRegex = /^fw-(.+)$/;
  const aliasMatches = stringStyle.match(fontAliasRegex);
  if (!aliasMatches) {
    return parseWarn(stringStyle);
  }
  const value = aliasMatches[1];

  return [{ propertyName: 'font-weight', value }];
};
