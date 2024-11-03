import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ScreenWrapper from "./ScreenWrapper";
import { moviesData } from "@/data/moviesData";
import MovieCard from "./Card";
import { Movie } from "@/Types/types";
import { fetchLatestMovies } from "@/services/TMDBapi";

const LatestMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchLatestMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#F5C518" />
      </View>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>Latest Movies</Text>
      </View>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        nestedScrollEnabled={true} // Enable nested scrolling
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  list: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
});

export default LatestMovies;
