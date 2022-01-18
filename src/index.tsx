import React from 'react';
import { Text } from 'react-native';

export * from './shared/';
export * from './components';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b + 3);
}

export const Test: React.FC<any> = () => {
  return <Text>aaaa</Text>;
};

export const StringStyleProvider: React.FC<any> = (props) => {
  return props.children;
};
