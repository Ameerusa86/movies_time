// components/ScreenWrapper.tsx
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
  return <View style={[styles.wrapper, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#242A32",
    height: "auto",
    width: "100%",
  },
});

export default ScreenWrapper;
