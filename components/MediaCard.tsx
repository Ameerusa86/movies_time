import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Movie, TvShow } from "@/Types/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface MediaCardProps {
  item: Movie | TvShow;
  type: "movie" | "tv";
}

const MediaCard = ({ item, type }: MediaCardProps) => {
  const router = useRouter();

  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : item.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
    : "https://via.placeholder.com/120x180.png?text=No+Image";

  const title =
    type === "movie" && "title" in item
      ? item.title
      : "name" in item
      ? item.name
      : "Unknown";
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";

  // Type guard to determine if item is a Movie or TvShow for date access
  const releaseDate =
    "release_date" in item
      ? item.release_date
      : "first_air_date" in item
      ? item.first_air_date
      : undefined;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "Unknown";

  const handlePress = () => {
    router.push(`/details/${type}/${item.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.infoContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.date}>{year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    margin: 8,
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  content: {
    position: "absolute",
    bottom: 0,
    padding: 8,
    width: "100%",
  },
  title: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    color: "#FFD700",
    fontSize: 12,
    marginLeft: 4,
  },
  date: {
    color: "#FFF",
    fontSize: 10,
    marginLeft: 10,
  },
});

export default MediaCard;
