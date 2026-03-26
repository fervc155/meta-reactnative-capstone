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
import { initDB, getMenuFromDB, saveMenuToDB } from "../db";
import { TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Hero from "../components/Hero";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    async function loadMenu() {
      setLoading(true);
      try {
        await initDB(); // inicializa DB
        let localMenu = await getMenuFromDB();

        if (localMenu.length === 0) {
          // Si no hay menú local, traer de API y guardar
          const apiMenu = await fetchMenu();
          await saveMenuToDB(apiMenu);
          localMenu = apiMenu;
        }

        let cats = new Set();

        localMenu.forEach((item) => {
          cats.add(item.category);
        });

        setCats(Array.from(cats));

        setMenu(localMenu);
      } catch (err) {
        console.error("DB error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  useEffect(() => {
    let filtered = menu;

    // 🔎 filtro por texto
    if (searchText.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // 🏷 filtro por categorías (multi)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category),
      );
    }

    setFilteredMenu(filtered);
  }, [searchText, selectedCategories, menu]);

  const renderItem = ({ item, index }) => {
    const isLastItem = index === filteredMenu.length - 1;
    return <MenuItem item={item} noBorder={isLastItem} />;
  };

  return (
    <Screen>
      <Header back={false} />
      <SectionScroll>
        <Hero>
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchIcon}>
              <FontAwesome name="search" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search menu..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </Hero>

        <MenuFilter
          items={cats}
          selected={selectedCategories}
          onSelect={setSelectedCategories}
        />

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : filteredMenu.length === 0 ? (
          <Body style={styles.noItems}>No items available.</Body>
        ) : (
          <FlatList
            data={filteredMenu}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <></>}
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
    borderRadius: 16,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  searchIcon: {
    marginLeft: 8,
  },
});
