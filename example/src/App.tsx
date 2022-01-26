import React from 'react';
import { StyleSheet } from 'react-native';
import {
  defaultConfig,
  objToRNStyle,
  Text,
  View,
} from 'react-native-string-style';

defaultConfig.update({
  width: 360,
  height: 640,
  colors: { ...defaultConfig.colors, ...{ customColor: '#00ffcc' } },
});

const TestComp = () => {
  const styles = objToRNStyle({
    borderTest:
      'bg-gray.12:alpha:30 bd-width-l-4 bd-width-b-4 bd-c-b-customColor bd-c-l-#ff6600:alpha:50 bd-ra-tr-5 bd-ra-bl-6 padding-vertical-0',
  });

  const pureStyle = StyleSheet.create({
    pure: {
      color: '#000000',
    },
  });

  return (
    <View style={styles.borderTest}>
      <Text
        sstyle="c-orange:alpha:100 fs-20 lh-23 tdl-underline ff-default"
        style={pureStyle.pure}
      >
        This is a test
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <View>
      <View sstyle="pd-br-10 bd-ra-bl-6 bd-ra-br-18 w-85% h-150 bg-blue:alpha:35 mg-tl-20 jcfe aife">
        <TestComp />
        <TestComp />
        <TestComp />
      </View>
      {[...Array(4)].map((_v, i) => (
        <View key={i} sstyle="mg-t-4 mg-h-16 pd-4 bd-ra-2 bg-indigo">
          <Text sstyle="fs-20 lh-20 fw-bold c-white ta-center">test</Text>
        </View>
      ))}
    </View>
  );
}
