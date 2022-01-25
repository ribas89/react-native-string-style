import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

import { mergeNativeStyle } from '../shared';

export const Text: React.FC<TextProps & { sstyle?: string }> = (props) => {
  const { children, sstyle, style } = props;

  const finalStyle = mergeNativeStyle({ sstyle, style });

  return (
    <RNText {...props} style={finalStyle}>
      {children}
    </RNText>
  );
};
