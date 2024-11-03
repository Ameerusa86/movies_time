import React from "react";
import { View, Text, Image } from "react-native";
import { Movie, TvShow } from "@/Types/types";

interface MovieCardProps {
  movie?: Movie;
  tvshow?: TvShow;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, tvshow }) => {
  const item = movie || tvshow; // Use movie if provided, otherwise tvshow

  // Construct the image URL from poster_path or backdrop_path
  const imageUrl = item?.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : item?.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
    : "https://via.placeholder.com/120x180.png?text=No+Image"; // Fallback image if none available

  return (
    <View className="w-[120px] h-[180px] bg-gray-900 rounded-lg overflow-hidden shadow-lg m-2 shadow-background">
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 120, height: 160, borderRadius: 8 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default MovieCard;
