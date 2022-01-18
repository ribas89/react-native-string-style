import React from 'react';
import { Text, TextProps } from 'react-native';

import { mergeNativeStyle } from '../shared';

export const SText: React.FC<TextProps & { sstyle?: string }> = (props) => {
  const { children, sstyle, style } = props;

  const finalStyle = mergeNativeStyle({ sstyle, style });

  return (
    <Text {...props} style={finalStyle}>
      {children}
    </Text>
  );
};
