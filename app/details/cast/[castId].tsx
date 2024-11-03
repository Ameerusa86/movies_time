import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { fetchCastDetails } from "@/services/TMDBapi";
import { CastMember } from "@/Types/types";

const CastDetailsPage = () => {
  const { castId } = useLocalSearchParams();
  const [castDetails, setCastDetails] = useState<CastMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCastDetails = async () => {
      try {
        if (castId) {
          const data = await fetchCastDetails(Number(castId));
          setCastDetails(data);
        }
      } catch (error) {
        console.error("Error fetching cast details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCastDetails();
  }, [castId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F5C518" />
      </View>
    );
  }

  if (!castDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cast details not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${castDetails.profile_path}`,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{castDetails.name}</Text>
      <Text style={styles.biography}>
        {castDetails.biography || "Biography not available"}
      </Text>
      <Text style={styles.subheading}>Known For:</Text>
      {castDetails.known_for_department && (
        <Text style={styles.info}>{castDetails.known_for_department}</Text>
      )}
      {castDetails.birthday && (
        <Text style={styles.info}>Birthday: {castDetails.birthday}</Text>
      )}
      {castDetails.place_of_birth && (
        <Text style={styles.info}>
          Place of Birth: {castDetails.place_of_birth}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1c1c1c",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  biography: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 10,
  },
  subheading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  info: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 5,
  },
});

export default CastDetailsPage;
