import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useProfile } from "../hooks/useProfile";

export default function ProfileScreen() {
  const { movies, getMovies } = useMovies();
  const { profile, saveProfile } = useProfile();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName);
      setEmail(profile.email);
      setAvatarUrl(profile.avatarUrl);
      setFavoriteGenre(profile.favoriteGenre);
    }
  }, [profile]);

  useFocusEffect(
    useCallback(() => {
      getMovies();
    }, [])
  );

  const handleSaveProfile = async () => {
    if (!fullName) {
      alert("El nombre es obligatorio");
      return;
    }

    await saveProfile({
      fullName,
      email,
      avatarUrl,
      favoriteGenre,
    });

    alert("Perfil guardado");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <Image
        source={{
          uri:
            avatarUrl ||
            "https://via.placeholder.com/300x300.png?text=Perfil",
        }}
        style={styles.avatar}
      />

      <TextInput
        placeholder="Nombre completo"
        placeholderTextColor="#999"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="URL de avatar"
        placeholderTextColor="#999"
        style={styles.input}
        value={avatarUrl}
        onChangeText={setAvatarUrl}
      />

      <TextInput
        placeholder="Género favorito"
        placeholderTextColor="#999"
        style={styles.input}
        value={favoriteGenre}
        onChangeText={setFavoriteGenre}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Guardar Perfil</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Estadísticas</Text>
        <Text style={styles.movieCount}>
          🎬 Películas guardadas: {movies.length}
        </Text>
      </View>
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
    marginTop: 45,
    marginBottom: 25,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: "center",
    marginBottom: 25,
    backgroundColor: "#1E1E1E",
  },

  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#E50914",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  movieCount: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
  },
});