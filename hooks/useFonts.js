import * as Font from "expo-font";

export default function useAppFonts() {
  const [loaded] = Font.useFonts({
    markazi: require("../assets/fonts/markazi.ttf"),
    karla: require("../assets/fonts/karla.ttf"),
  });

  return loaded;
}
