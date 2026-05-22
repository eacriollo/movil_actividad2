import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCards";
import { useMovies } from "../hooks/useMovies";

export default function EditMovieScreen() {
  const { id } = useLocalSearchParams();
  const { getMovieById, updateMovie } = useMovies();

  const movieId = Number(id);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadMovie();
  }, []);

  const loadMovie = async () => {
    const movie = await getMovieById(movieId);

    if (!movie) {
      alert("No se encontró la película");
      router.back();
      return;
    }

    setTitle(movie.title);
    setGenre(movie.genre);
    setYear(movie.year);
    setRating(movie.rating);
    setImageUrl(movie.imageUrl);
    setDescription(movie.description);
  };

  const handleUpdateMovie = async () => {
    if (!title || !genre || !year || !rating) {
      alert("Completa los campos obligatorios");
      return;
    }

    await updateMovie(movieId, {
      title,
      genre,
      year,
      rating,
      imageUrl,
      description,
    });

    alert("Película actualizada");
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Película</Text>

      <MovieCard
        title={title || "Sin título"}
        genre={genre || "Sin género"}
        year={year || "Sin año"}
        rating={rating || "0"}
        imageUrl={
          imageUrl ||
          "https://via.placeholder.com/400x600.png?text=Sin+Imagen"
        }
        showActions={false}
      />

      <TextInput
        placeholder="Título"
        placeholderTextColor="#999"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Género"
        placeholderTextColor="#999"
        style={styles.input}
        value={genre}
        onChangeText={setGenre}
      />

      <TextInput
        placeholder="Año"
        placeholderTextColor="#999"
        style={styles.input}
        value={year}
        onChangeText={setYear}
      />

      <TextInput
        placeholder="Rating"
        placeholderTextColor="#999"
        style={styles.input}
        value={rating}
        onChangeText={setRating}
      />

      <TextInput
        placeholder="URL imagen"
        placeholderTextColor="#999"
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <TextInput
        placeholder="Descripción"
        placeholderTextColor="#999"
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateMovie}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 40,
  },

  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#1E88E5",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  backButton: {
    backgroundColor: "#555",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 40,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});