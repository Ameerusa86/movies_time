import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Movie } from "@/Types/types";
import { fetchMovies } from "@/services/TMDBapi";
import MediaCard from "@/components/MediaCard";
import Pagination from "@/components/Pagination";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500); // Set totalPages to a default value for now

  const loadMovies = async (page: number) => {
    setLoading(true);
    try {
      const moviesData = await fetchMovies(page);
      setMovies(moviesData);
      console.log("Movies loaded for page:", page);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F5C518" />
      </View>
    );
  }

  return (
    <ScreenWrapper style={styles.screenWrapper}>
      <View style={styles.header}>
        <Text style={styles.title} className="mt-6">
          All Movies
        </Text>
      </View>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MediaCard type="movie" item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </ScreenWrapper>
  );
};

export default MoviesPage;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  screenWrapper: {
    flex: 1, // Make sure ScreenWrapper takes full height
  },
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
    paddingHorizontal: 8,
    paddingBottom: 50, // Add extra padding at the bottom
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
