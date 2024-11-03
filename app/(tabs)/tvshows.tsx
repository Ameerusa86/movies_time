import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { TvShow } from "@/Types/types";
import MediaCard from "@/components/MediaCard";
import Pagination from "@/components/Pagination";
import { fetchTvShows } from "@/services/TMDBapi";

const TVShowsPage = () => {
  const [tvshows, setTvShows] = useState<TvShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500); // Set totalPages to a default value for now

  const loadTvShows = async (page: number) => {
    setLoading(true);
    try {
      const tvshowsData = await fetchTvShows(page);
      setTvShows(tvshowsData);
      console.log("Tv Shows loaded for page:", page);
    } catch (error) {
      console.error("Error loading Tv Shows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTvShows(currentPage);
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
          All TV Shows
        </Text>
      </View>
      <FlatList
        data={tvshows}
        renderItem={({ item }) => <MediaCard type="tv" item={item} />}
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

export default TVShowsPage;

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
