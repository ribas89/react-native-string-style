import React from 'react';
import { View, ViewProps } from 'react-native';

import { mergeNativeStyle } from '../shared';

export const SView: React.FC<ViewProps & { sstyle: string }> = (props) => {
  const { children, sstyle, style } = props;

  const finalStyle = mergeNativeStyle({ sstyle, style });

  return (
    <View {...props} style={finalStyle}>
      {children}
    </View>
  );
};
