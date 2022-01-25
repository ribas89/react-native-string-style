import { borderToStyleResult } from './transpilers/borders';
import { flexKeys, flexToStyleResult } from './transpilers/flex';
import {
  fontFamilyToStyleResult,
  fontWeightToStyleResult,
} from './transpilers/fonts';
import { positionToStyleResult } from './transpilers/position';
import { spacesToStyleResult } from './transpilers/spaces';

export const functionsMap = [
  { name: 'padding', regex: /^pd-/, func: spacesToStyleResult },
  { name: 'margin', regex: /^mg-/, func: spacesToStyleResult },
  {
    name: 'flex',
    regex: new RegExp(`^(${flexKeys.join('|')})$`),
    func: flexToStyleResult,
  },
  { name: 'position', regex: /^pos-/, func: positionToStyleResult },
  { name: 'border', regex: /^bd-/, func: borderToStyleResult },
  { name: 'fontFamily', regex: /^ff-/, func: fontFamilyToStyleResult },
  { name: 'fontWeight', regex: /^fw-/, func: fontWeightToStyleResult },
];

type RegexFunctionType = {
  name: string;
  regex: RegExp;
  func: any;
};

export const resolveFunction = (stringStyle: string): RegexFunctionType => {
  const regexFunction = functionsMap.find(({ regex }) => {
    return regex.exec(stringStyle);
  });

  return regexFunction as RegexFunctionType;
};
