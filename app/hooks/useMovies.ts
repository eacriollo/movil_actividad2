import { useEffect, useState } from "react";
import database from "../database/movieDataBase";

export interface Movie {
  id?: number;
  title: string;
  genre: string;
  year: string;
  rating: string;
  imageUrl: string;
  description: string;
}

export const useMovies = () => {

  const [movies, setMovies] = useState<Movie[]>([]);

  /**
   * Obtener películas
   */
  const getMovies = async () => {
    try {

      const result = await database.getAllAsync<Movie>(
        "SELECT * FROM movies"
      );

      setMovies(result);

    } catch (error) {
      console.log("Error obteniendo películas", error);
    }
  };

  /**
   * Crear película
   */
  const createMovie = async (movie: Movie) => {

    try {

      await database.runAsync(
        `INSERT INTO movies 
        (title, genre, year, rating, imageUrl, description)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          movie.title,
          movie.genre,
          movie.year,
          movie.rating,
          movie.imageUrl,
          movie.description
        ]
      );

      getMovies();

    } catch (error) {
      console.log("Error creando película", error);
    }
  };

  /**
   * Eliminar película
   */
  const deleteMovie = async (id: number) => {

    try {

      await database.runAsync(
        "DELETE FROM movies WHERE id = ?",
        [id]
      );

      getMovies();

    } catch (error) {
      console.log("Error eliminando película", error);
    }
  };

  /**
 * Actualizar película
 */
const updateMovie = async (
  id: number,
  movie: Movie
) => {

  try {

    await database.runAsync(
      `UPDATE movies
      SET
        title = ?,
        genre = ?,
        year = ?,
        rating = ?,
        imageUrl = ?,
        description = ?
      WHERE id = ?`,
      [
        movie.title,
        movie.genre,
        movie.year,
        movie.rating,
        movie.imageUrl,
        movie.description,
        id
      ]
    );

    getMovies();

  } catch (error) {
    console.log("Error actualizando película", error);
  }
};



  useEffect(() => {
    getMovies();
  }, []);

  const getMovieById = async (id: number) => {
  try {
    const result = await database.getFirstAsync<Movie>(
      "SELECT * FROM movies WHERE id = ?",
      [id]
    );

    return result;
  } catch (error) {
    console.log("Error obteniendo película por ID", error);
    return null;
  }
};

  return {
    movies,
    getMovies,
    createMovie,
    deleteMovie,
    getMovieById,
    updateMovie
  };
};