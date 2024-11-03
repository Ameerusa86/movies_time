import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Carousel from "@/components/Carousel";
import PopularMovies from "@/components/PopularMovies";
import { moviesData } from "@/data/moviesData";
import PopularTVShows from "@/components/PopularTvShows";
import LatestMovies from "@/components/LatestMovies";

const MainPage = () => {
  return (
    <ScrollView className="">
      <ScreenWrapper>
        {/* Carousel */}
        <Carousel height={550} width={"100%"} />
        {/* Popular Movies */}
        <PopularMovies />
        {/* Latest Movies */}
        <LatestMovies />
        {/* Popular TV Shows */}
        <PopularTVShows />
      </ScreenWrapper>
    </ScrollView>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  link: {
    fontSize: 20,
    color: "blue",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    cursor: "pointer",
  },
});
