import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabaseSync("movies.db");

/**
 * Inicializa la base de datos
 */
export const initDatabase = async () => {
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        genre TEXT NOT NULL,
        year TEXT NOT NULL,
        rating TEXT NOT NULL,
        imageUrl TEXT,
        description TEXT
      );
      CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL,
        email TEXT,
        avatarUrl TEXT,
        favoriteGenre TEXT
  )

    `);

    console.log("Base de datos inicializada");
  } catch (error) {
    console.log("Error inicializando base de datos", error);
  }
};

export default database;
