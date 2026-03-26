import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLogged } = useContext(AuthContext);

  // Mientras carga AsyncStorage
  if (isLogged === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLogged ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
