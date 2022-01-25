import React from 'react';
import { View as RNView, ViewProps } from 'react-native';

import { mergeNativeStyle } from '../shared';

export const View: React.FC<ViewProps & { sstyle?: string }> = (props) => {
  const { children, sstyle, style } = props;

  const finalStyle = mergeNativeStyle({ sstyle, style });

  return (
    <RNView {...props} style={finalStyle}>
      {children}
    </RNView>
  );
};
