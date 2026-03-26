export const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

export async function fetchMenu() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch menu data");
    const data = await res.json();
    const menu = data.menu || [];
    // Agregamos un id temporal para FlatList
    return menu.map((item, index) => ({ id: index + 1, ...item }));
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
}
