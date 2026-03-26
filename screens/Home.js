import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  View,
  Image,
} from "react-native";
import {
  Screen,
  SectionScroll,
  Title,
  Label,
  Body,
  COLORS,
  Heading,
  Section,
  Row,
} from "../components/AppUI";
import { fetchMenu } from "../api/menu";
import MenuFilter from "../components/MenuFilter";
import MenuItem from "../components/MenuItem";
import Header from "../components/Header";

const categoryMap = {
  Starters: ["Greek Salad", "Bruschetta"],
  Mains: ["Grilled Fish", "Pasta"],
  Desserts: ["Lemon Dessert"],
  Drinks: [],
};

export default function HomeScreen() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Starters");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      setLoading(true);
      const data = await fetchMenu();
      setMenu(data);
      setLoading(false);
    }
    loadMenu();
  }, []);

  useEffect(() => {
    if (!menu.length) return;
    const allowedNames = categoryMap[selectedCategory] || [];
    const filtered = menu.filter((item) => allowedNames.includes(item.name));
    setFilteredMenu(filtered);
  }, [selectedCategory, menu]);

  const renderItem = ({ item, index }) => {
    const isLastItem = index === filteredMenu.length - 1;
    return <MenuItem item={item} noBorder={isLastItem} />;
  };

  return (
    <Screen>
      <Header back={false} />
      <SectionScroll>
        <Section style={styles.hero}>
          <Title style={styles.title}>Little Lemon</Title>
          <Row>
            <View style={styles.leftColumn}>
              <Heading style={styles.heading}>Chicago</Heading>
              <Body style={styles.description}>
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </Body>
            </View>
            <View style={styles.rightColumn}>
              <Image
                source={require("../assets/images/Hero.png")}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>
          </Row>
        </Section>
        <MenuFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : filteredMenu.length === 0 ? (
          <Body style={styles.noItems}>No items available.</Body>
        ) : (
          <FlatList
            data={filteredMenu}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={renderItem}
            scrollEnabled={false} // para que SectionScroll maneje el scroll
            ItemSeparatorComponent={() => <></>} // opcional si quieres espacio entre items
          />
        )}
      </SectionScroll>
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: {
    backgroundColor: COLORS.primary,
    margin: -24,
    marginBottom: 16,
    padding: 16,
  },
  leftColumn: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 12,
  },
  rightColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: "100%",
    height: 160,
    borderRadius: 16, // bordes redondeados de la imagen
  },
  title: {
    marginBottom: -16,
    fontSize: 40,
    color: COLORS.secondary,
  },
  heading: {
    fontSize: 32,
    color: COLORS.white,
    marginBottom: 8,
  },
  description: {
    color: COLORS.white,
  },
  noItems: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.muted,
  },
  city: {
    marginBottom: 16,
    color: COLORS.muted,
  },
});
