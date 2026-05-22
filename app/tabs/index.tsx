import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";


import MovieCard from "../components/MovieCards";
import { useMovies } from "../hooks/useMovies";

export default function HomeScreen() {

  const {
    movies,
    getMovies,
    deleteMovie
  } = useMovies();

  /**
 * Confirmar eliminación
 */
const confirmDeleteMovie = (id: number) => {

  Alert.alert(
    "Eliminar película",
    "¿Deseas eliminar esta película?",
    [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteMovie(id)
      }
    ]
  );
};

  useFocusEffect(
    useCallback(() => {
      getMovies();
    }, [])
  );

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Mis Películas
      </Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id!.toString()}

        renderItem={({ item }) => (

          <MovieCard
            title={item.title}
            genre={item.genre}
            year={item.year}
            rating={item.rating}
            imageUrl={item.imageUrl}

            onDelete={() => confirmDeleteMovie(item.id!)}

            onEdit={() =>
              router.push(`../edit/${item.id}`)
            }
          />

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 15,
    paddingTop: 50
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  }

});