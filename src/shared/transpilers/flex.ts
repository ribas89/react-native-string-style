import type { StyleResult } from '../types';

export const flexObj = {
  fg: { propertyName: 'flex-grow', value: 1 },
  fs: { propertyName: 'flex-shrink', value: 1 },
  fdr: { propertyName: 'flex-direction', value: 'row' },
  fdc: { propertyName: 'flex-direction', value: 'column' },
  fw: { propertyName: 'flex-wrap', value: 'wrap' },
  aic: { propertyName: 'align-items', value: 'center' },
  aib: { propertyName: 'align-items', value: 'baseline' },
  aife: { propertyName: 'align-items', value: 'flex-end' },
  jcc: { propertyName: 'justify-content', value: 'center' },
  jcfe: { propertyName: 'justify-content', value: 'flex-end' },
  jcsb: { propertyName: 'justify-content', value: 'space-between' },
};

export type FlexKeys = keyof typeof flexObj;

export const flexKeys = Object.keys(flexObj);

export const flexToStyleResult = (stringStyle: FlexKeys): StyleResult[] => {
  const flex = flexObj[stringStyle];
  return [flex];
};
