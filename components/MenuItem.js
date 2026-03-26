import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Label, Body, COLORS } from "./AppUI";

export default function MenuItem({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Label style={styles.name}>{item.name}</Label>
        <Body numberOfLines={2} style={styles.description}>
          {item.description}
        </Body>
        <Label style={styles.price}>${item.price.toFixed(2)}</Label>
      </View>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}`,
        }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1, // ancho del borde
    borderBottomColor: "#e0e0e0", // gris ligero
    paddingBottom: 10, // opcional, para separar el contenido del borde
  },
  textContainer: { flex: 1, paddingRight: 12 },
  name: { fontWeight: "bold" },
  description: { color: COLORS.primary, marginVertical: 4 },
  price: { marginTop: 6 },
  image: { width: 80, height: 80, borderRadius: 10 },
});
