import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import {typography} from '../src/styles/Typography';

const CustomText = ({ variant = 'bodyMedium', color, style, children, ...rest }) => (
  <RNText
    style={[styles.base, typography[variant], color && { color }, style]}
    {...rest}
  >
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default CustomText;