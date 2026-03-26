import { Image, StyleSheet, View } from "react-native";
import { Body, COLORS, Heading, Row, Section, Title } from "./AppUI";

export default function Hero({ children, img = true, style }) {
  return (
    <Section style={[styles.hero, style]}>
      <Title style={styles.title}>Little Lemon</Title>
      <Row>
        <View style={styles.leftColumn}>
          <Heading style={styles.heading}>Chicago</Heading>
          <Body style={styles.description}>
            We are a family owned Mediterranean restaurant, focused on COLORS
            traditional recipes served with a modern twist.
          </Body>
        </View>
        {img && (
          <View style={styles.rightColumn}>
            <Image
              source={require("../assets/images/Hero.png")}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
        )}
      </Row>
      {children}
    </Section>
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
