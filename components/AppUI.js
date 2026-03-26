// =======================
// components/UI.js
// Reusable styled components based on style guide
// =======================

import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

// =======================
// COLORS (from style guide)
// =======================
const COLORS = {
  white: "#FFFFFF",
  primary: "#495E57",
  secondary: "#F4CE14",
  background: "#EDEFEE",
  surface: "#FFFFFF",
  text: "#333333",
  muted: "#eaeaeb",
  error: "#D32F2F",
};

// =======================
// TYPOGRAPHY
// =======================
const TYPOGRAPHY = {
  title: {
    fontFamily: "markazi",
    fontSize: 30,
    color: COLORS.text,
  },
  heading: {
    fontFamily: "markazi",
    fontSize: 22,
    color: COLORS.text,
  },
  body: {
    fontFamily: "karla",
    fontSize: 16,
    color: COLORS.text,
  },
  label: {
    fontFamily: "karla",
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "bold",
  },
};

// =======================
// COMPONENTS
// =======================

// Title
export const Title = ({ children, style }) => (
  <Text style={[TYPOGRAPHY.title, style]}>{children}</Text>
);

// Title
export const Heading = ({ children, style }) => (
  <Text style={[TYPOGRAPHY.heading, style]}>{children}</Text>
);

// Label
export const Label = ({ children, style, textAlign = "left" }) => (
  <Text style={[TYPOGRAPHY.label, styles.label, { textAlign }, style]}>
    {children}
  </Text>
);
// Input
export const Input = ({
  value,
  onChangeText,
  placeholder,
  error,
  ...props
}) => (
  <View style={{ width: "100%" }}>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[styles.input, TYPOGRAPHY.body, error && styles.inputError]}
      {...props}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

export const InputPhone = ({
  value,
  onChangeText,
  placeholder,
  error,
  ...props
}) => (
  <View style={{ width: "100%" }}>
    <MaskedTextInput
      mask="(999) 999-9999"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType="phone-pad"
      style={[styles.input, TYPOGRAPHY.body, error && styles.inputError]}
      {...props}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// Button
export const Button = ({ title, onPress, disabled }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[styles.button, disabled && styles.buttonDisabled]}
  >
    <Text style={[styles.buttonText, TYPOGRAPHY.label]}>{title}</Text>
  </TouchableOpacity>
);

// Screen Container
export const Screen = ({ children }) => (
  <View style={styles.screen}>{children}</View>
);

// Section (gray block like wireframe)
export const Section = ({ children, style }) => (
  <View style={[styles.section, style]}>{children}</View>
);

export const SectionScroll = ({ children, style }) => (
  <ScrollView
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={[styles.sectionScrollContainer, style]}
  >
    {children}
  </ScrollView>
);

// En components/UI.js, agrega esto:

export const Body = ({ children, style, numberOfLines }) => (
  <Text style={[TYPOGRAPHY.body, style]} numberOfLines={numberOfLines}>
    {children}
  </Text>
);

export const Row = ({ children, style }) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

// =======================
// STYLES
// =======================
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 24,
  },
  sectionScrollContainer: {
    padding: 24,
    backgroundColor: COLORS.surface, // o muted, lo que quieras
  },
  section: {
    flex: 1,
    backgroundColor: COLORS.muted,
    padding: 24,
    justifyContent: "center",
  },
  label: {
    marginBottom: 6,
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
    padding: 12,
    backgroundColor: COLORS.surface,
    marginBottom: 12,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    textAlign: "center",
  },
});

// =======================
// EXPORT COLORS (optional)
// =======================
export { COLORS, TYPOGRAPHY };
