import { fetchMovies } from "@/services/TMDBapi";
import { Movie } from "@/Types/types";
import React, { useEffect, useState } from "react";
import { View, Image, Dimensions, ActivityIndicator } from "react-native";
import PagerView from "react-native-pager-view";

interface CarouselProps {
  height: number; // Required prop for height of each carousel item
  width: number | string; // Required prop for width of each carousel item
  containerStyle?: string; // Optional additional styling for the outer container
}

const Carousel: React.FC<CarouselProps> = ({
  height,
  width,
  containerStyle = "",
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies();
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
    <View
      className={`items-center justify-center ${containerStyle}`}
      style={{ height }}
    >
      <PagerView
        className="items-center justify-center"
        style={{
          width:
            typeof width === "number" ? width : Dimensions.get("window").width,
          height,
        }}
        initialPage={0}
      >
        {movies.map((movie) => (
          <View
            key={movie.id}
            className="items-center justify-center"
            style={{
              width:
                typeof width === "number"
                  ? width
                  : Dimensions.get("window").width,
              height,
            }}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default Carousel;
