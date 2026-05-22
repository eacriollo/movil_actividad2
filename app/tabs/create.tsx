import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import { useState } from "react";
import { useMovies } from "../../hooks/useMovies";

export default function CreateScreen() {

  const { createMovie } = useMovies();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  /**
   * Guardar película
   */
  const handleCreateMovie = async () => {

    if (
      !title ||
      !genre ||
      !year ||
      !rating
    ) {
      alert("Completa los campos obligatorios");
      return;
    }

    await createMovie({
      title,
      genre,
      year,
      rating,
      imageUrl,
      description
    });

    alert("Película guardada");

    setTitle("");
    setGenre("");
    setYear("");
    setRating("");
    setImageUrl("");
    setDescription("");
  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Nueva Película
      </Text>

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

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateMovie}
      >
        <Text style={styles.buttonText}>
          Guardar Película
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 40
  },

  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16
  },

  descriptionInput: {
    height: 120,
    textAlignVertical: "top"
  },

  button: {
    backgroundColor: "#E50914",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18
  }

});
