import React, { useState, useEffect, useRef } from "react";
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
  SectionScroll,
} from "../components/AppUI";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Hero from "../components/Hero";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  let starting = useRef(true);

  useEffect(() => {
    if (starting.current) {
      starting.current = false;
      return;
    } else {
      validate();
    }
  }, [firstName, email]);

  const handleNext = () => {
    if (isValid) {
      console.log(" valido pal login");
      login({ firstName, email });
      setIsValid(false);
    } else {
      console.log("no valido");
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

        <Hero
          img={false}
          style={{
            height: 100,
            margin: 0,
            paddingVertical: 0,
            marginBottom: 0,
          }}
        />
        {/* Content */}
        <Section
          style={[styles.section, { flex: 1, justifyContent: "space-between" }]}
        >
          {/* Arriba */}
          <View>
            <Title style={{ textAlign: "center", marginBottom: 10 }}>
              Let us get to know you
            </Title>
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
    paddingVertical: 5,
  },
  logo: {
    width: 200,
    height: 60,
  },
  footer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
});
