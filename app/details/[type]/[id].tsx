import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  fetchMovieDetails,
  fetchTvShowDetails,
  fetchMovieCredits,
  fetchTvShowCredits,
} from "@/services/TMDBapi";
import { Movie, TvShow, CreditsResponse } from "@/Types/types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const DetailsPage = () => {
  const { id, type } = useLocalSearchParams();
  const [item, setItem] = useState<Movie | TvShow | null>(null);
  const [credits, setCredits] = useState<CreditsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("about");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (type === "movie") {
          const movieDetails = await fetchMovieDetails(Number(id));
          const movieCredits = await fetchMovieCredits(Number(id));
          setItem(movieDetails);
          setCredits(movieCredits);
        } else if (type === "tv") {
          const tvShowDetails = await fetchTvShowDetails(Number(id));
          const tvShowCredits = await fetchTvShowCredits(Number(id));
          setItem(tvShowDetails);
          setCredits(tvShowCredits);
        }
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, type]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F5C518" />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Image */}
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              item.backdrop_path || item.poster_path
            }`,
          }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.1)"]}
          style={styles.gradientOverlay}
        />
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Poster and Title Section */}
        <View style={styles.posterRow}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.posterImage}
          />
          <View style={styles.titleSection}>
            <Text style={styles.title} numberOfLines={2}>
              {"title" in item ? item.title : item.name}
            </Text>
            <View style={styles.metaData}>
              <Text style={styles.metaText}>
                {new Date(
                  "release_date" in item
                    ? item.release_date
                    : item.first_air_date
                ).getFullYear()}
              </Text>
              <Text style={styles.metaText}>• 148 Minutes</Text>
              <Text style={styles.metaText}>• Action</Text>
            </View>
          </View>
        </View>

        {/* Tabs for About, Reviews, and Cast */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setSelectedTab("about")}>
            <Text
              style={[
                styles.tabText,
                selectedTab === "about" && styles.activeTab,
              ]}
            >
              About Movie
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("reviews")}>
            <Text
              style={[
                styles.tabText,
                selectedTab === "reviews" && styles.activeTab,
              ]}
            >
              Reviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("cast")}>
            <Text
              style={[
                styles.tabText,
                selectedTab === "cast" && styles.activeTab,
              ]}
            >
              Cast
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === "about" && (
            <Text style={styles.description}>{item.overview}</Text>
          )}

          {selectedTab === "cast" && credits && (
            <FlatList
              data={credits.cast}
              renderItem={({ item: castMember }) => (
                <TouchableOpacity
                  onPress={() => router.push(`/details/cast/${castMember.id}`)}
                >
                  <View style={styles.castMember}>
                    <Image
                      source={{
                        uri: castMember.profile_path
                          ? `https://image.tmdb.org/t/p/w185${castMember.profile_path}`
                          : "https://via.placeholder.com/80x80.png?text=No+Image",
                      }}
                      style={styles.castImage}
                    />
                    <Text style={styles.castName}>{castMember.name}</Text>
                    <Text style={styles.castCharacter}>
                      As {castMember.character}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(castMember) => castMember.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.castSlider}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  headerContainer: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 250,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  contentContainer: {
    padding: 16,
  },
  posterRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  posterImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  titleSection: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  metaData: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  metaText: {
    color: "#b0b0b0",
    fontSize: 14,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  rating: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
  userCount: {
    color: "#b0b0b0",
    fontSize: 12,
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 8,
  },
  tabText: {
    color: "#b0b0b0",
    fontSize: 16,
    paddingVertical: 4,
  },
  activeTab: {
    color: "#fff",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#F5C518",
  },
  tabContent: {
    marginTop: 16,
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
  },
  castSlider: {
    paddingVertical: 16,
  },
  castMember: {
    width: 80,
    alignItems: "center",
    marginRight: 16,
  },
  castImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  castName: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  castCharacter: {
    color: "#b0b0b0",
    fontSize: 10,
    textAlign: "center",
  },
});
