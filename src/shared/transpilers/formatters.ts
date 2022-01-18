import _ from 'lodash';

import { kebabToCamelCase } from '../utils';

import type { StyleResult } from '../types';
export const formatStyledString = ({
  propertyName,
  value,
  relativePixel,
}: StyleResult) => {
  return {
    styledString: `\n${propertyName}: ${value}${relativePixel ? 'px' : ''};`,
  };
};

export const formatStyleObject = ({ propertyName, value }: StyleResult) => {
  const _propertyName = kebabToCamelCase(propertyName);
  const styleObject = _.set({}, _propertyName, value);

  return styleObject;
};
