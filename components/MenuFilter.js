import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Label, COLORS } from "./AppUI";

export default function MenuFilter({ selected, onSelect, items }) {
  const toggleCategory = (cat) => {
    if (selected.includes(cat)) {
      onSelect(selected.filter((c) => c !== cat));
    } else {
      onSelect([...selected, cat]);
    }
  };

  return (
    <View style={styles.container}>
      {items.map((cat) => {
        const isActive = selected.includes(cat);

        return (
          <TouchableOpacity
            key={cat}
            style={[styles.button, isActive && styles.buttonSelected]}
            onPress={() => toggleCategory(cat)}
          >
            <Label
              style={{
                color: isActive ? COLORS.primary : COLORS.primary,
                marginBottom: 0,
              }}
            >
              {cat}
            </Label>
          </TouchableOpacity>
        );
      })}
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
    color: COLORS.white,
  },
  buttonSelected: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
