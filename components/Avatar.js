import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Avatar({ size = 70, uri, initials }) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
    );
  }

  // Mostrar iniciales si no hay imagen
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#495E57",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Text style={{ color: "white", fontSize: size / 2, fontWeight: "bold" }}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    // default size and shape, overridden in inline styles
  },
});
