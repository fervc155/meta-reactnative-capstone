import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(null); // null = loading

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      setIsLogged(user ? true : false);
    } catch (e) {
      setIsLogged(false);
    }
  };

  const login = async (data) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setIsLogged(true);
    } catch (e) {
      console.log("no se pudo loguear alv", e);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
