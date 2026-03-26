import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(null); // null = loading
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      setIsLogged(user ? true : false);
      if (user) setUser(JSON.parse(user));
      else setUser(null);
      return user;
    } catch (e) {
      setIsLogged(false);
      setUser(null);
      return false;
    }
  };

  const saveUser = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (e) {
      console.log("no se pudo guardar alv", e);
    }
  };
  const login = async (data) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsLogged(true);
    } catch (e) {
      console.log("no se pudo loguear alv", e);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setIsLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, login, logout, checkLogin, saveUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
