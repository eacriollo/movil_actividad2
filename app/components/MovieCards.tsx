import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Componente para mostrar la información de una película

interface MovieCardProps {
  title: string;
  genre: string;
  year: string;
  rating: string;
  imageUrl: string;
  onDelete?: () => void;
  onEdit?: () => void;
  showActions?: boolean;
}


export default function MovieCard({
  title,
  genre,
  year,
  rating,
  imageUrl,
  onDelete,
  onEdit,
  showActions = true
}: MovieCardProps) {

  return (
    <View style={styles.card}>

      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />

      <View style={styles.infoContainer}>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.text}>
          Género: {genre}
        </Text>

        <Text style={styles.text}>
          Año: {year}
        </Text>

        <Text style={styles.rating}>
          ⭐ {rating}
        </Text>

        {showActions && (
          <>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20
  },

  image: {
    width: "100%",
    height: 220
  },

  infoContainer: {
    padding: 15
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  text: {
    color: "#CCCCCC",
    fontSize: 16,
    marginBottom: 5
  },

  rating: {
    color: "#FFD700",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15
  },

  editButton: {
    backgroundColor: "#1E88E5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10
  },

  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },

  deleteButton: {
    backgroundColor: "#E53935",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }

});