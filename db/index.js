import * as SQLite from "expo-sqlite";

let db;

// 🔹 Inicializar la base de datos
export const initDB = async () => {
  db = await SQLite.openDatabaseAsync("menu.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT,
      category TEXT
    );
  `);
};

// 🔹 Obtener todos los items
export const getMenuFromDB = async () => {
  if (!db) await initDB();

  const result = await db.getAllAsync("SELECT * FROM menu;");
  return result;
};

// 🔹 Guardar múltiples items
export const saveMenuToDB = async (menuItems) => {
  if (!db) await initDB();

  for (const item of menuItems) {
    await db.runAsync(
      `INSERT INTO menu (name, price, description, image, category)
       VALUES (?, ?, ?, ?, ?);`,
      [
        item.name,
        item.price,
        item.description || "",
        item.image || "",
        item.category || "",
      ],
    );
  }
};

// 🔹 Limpiar tabla (opcional)
export const clearMenuTable = async () => {
  if (!db) await initDB();

  await db.runAsync("DELETE FROM menu;");
};

// 🔹 Insertar un solo item (opcional)
export const insertMenuItem = async (item) => {
  if (!db) await initDB();

  await db.runAsync(
    `INSERT INTO menu (name, price, description, image, category)
     VALUES (?, ?, ?, ?, ?);`,
    [
      item.name,
      item.price,
      item.description || "",
      item.image || "",
      item.category || "",
    ],
  );
};
