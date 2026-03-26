import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  View,
  StyleSheet,
} from "react-native";

import {
  Screen,
  Section,
  Title,
  Label,
  Input,
  Button,
} from "../components/AppUI";

export default function LoginScreen() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!firstName.trim()) {
      newErrors.firstName = "Name is required";
      valid = false;
    } else if (!/^[A-Za-z\\s]+$/.test(firstName)) {
      newErrors.firstName = "Only letters allowed";
      valid = false;
    }

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    setErrors(newErrors);
    setIsValid(valid);
  };

  useEffect(() => {
    validate();
  }, [firstName, email]);

  const handleNext = () => {
    if (isValid) {
      console.log("Valid data:", { firstName, email });
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <Section
          style={[styles.section, { flex: 1, justifyContent: "space-between" }]}
        >
          {/* Arriba */}
          <View>
            <Title>Let us get to know you</Title>
          </View>

          {/* Abajo (tus inputs tal cual) */}
          <View>
            <Label textAlign="center">First Name</Label>
            <Input
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your name"
              error={errors.firstName}
            />

            <Label textAlign="center">Email</Label>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
          </View>

          <View></View>
        </Section>

        {/* Footer */}
        <View style={styles.footer}>
          <Button title="Next" onPress={handleNext} disabled={!isValid} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 200,
    height: 60,
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});
