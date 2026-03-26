import React, { use, useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS } from "./AppUI";
import Logo from "../assets/images/Logo.png";
import Avatar from "./Avatar";
import { AuthContext } from "../context/AuthContext";

export default function Header({ onBack, back = true }) {
  let [urlImage, setUrlImage] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    user && setUrlImage(user.imageUri);
  }, [user]);

  return (
    <View style={styles.header}>
      {back ? (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      ) : (
        <View> </View>
      )}
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
        <Text style={styles.logoText}>L I T T L E L E M O N</Text>
      </View>
      <Avatar uri={urlImage} size={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.muted,
  },
  backButton: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backArrow: {
    fontSize: 24,
    color: COLORS.primary,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  logoText: {
    fontFamily: "markazi",
    fontSize: 18,
    color: COLORS.primary,
    letterSpacing: 2,
  },
});
