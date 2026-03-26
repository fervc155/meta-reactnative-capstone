import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Label, COLORS } from "./AppUI";

const categories = ["Starters", "Mains", "Desserts", "Drinks"];

export default function MenuFilter({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.button, selected === cat && styles.buttonSelected]}
          onPress={() => onSelect(cat)}
          activeOpacity={0.7}
        >
          <Label
            style={{
              color: selected === cat ? COLORS.primary : COLORS.muted,
              marginBottom: 0,
            }}
          >
            {cat}
          </Label>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 16, marginVertical: 10 },
  button: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  buttonSelected: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
