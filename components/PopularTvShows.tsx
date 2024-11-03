import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ScreenWrapper from "./ScreenWrapper";
import MovieCard from "./Card";
import { TvShow } from "@/Types/types";
import { fetchTvShows } from "@/services/TMDBapi";

const PopularTVShows = () => {
  const [tvshows, settvshows] = useState<TvShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadtvshows = async () => {
      try {
        const tvshowsData = await fetchTvShows();
        settvshows(tvshowsData);
      } catch (error) {
        console.error("Failed to load tvshows:", error);
      } finally {
        setLoading(false);
      }
    };

    loadtvshows();
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
        <Text style={styles.title}>Popular TV Shows</Text>
      </View>
      <FlatList
        data={tvshows}
        renderItem={({ item }) => <MovieCard tvshow={item} />}
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

export default PopularTVShows;
