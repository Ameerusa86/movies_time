import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MediaCard from "@/components/MediaCard"; // Reuse the MediaCard component for each result
import { Movie, TvShow } from "@/Types/types";
import { fetchSearchResults } from "@/services/TMDBapi"; // Create a new function in TMDBapi to fetch search results

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<(Movie | TvShow)[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === "") return; // Do not search if the query is empty
    setLoading(true);
    try {
      const searchResults = await fetchSearchResults(query);
      setResults(searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} className="mt-8">
        Search Movies & TV Shows
      </Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type a movie or TV show name..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={(text) => setQuery(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#F5C518" style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <MediaCard type={"title" in item ? "movie" : "tv"} item={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No results found</Text>
          }
        />
      )}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#FFD700",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  noResultsText: {
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
