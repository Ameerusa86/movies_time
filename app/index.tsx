import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const HomePage = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.background}
      />
      <LinearGradient
        // Button Linear Gradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.button}
      ></LinearGradient>
      <ImageBackground
        source={require("../assets/images/landingimg.jpeg")}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* Gradient overlay */}
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.7)"]}
        className="absolute w-full h-full"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          onPress={() => router.push("/auth")}
          className="bg-danger px-8 py-4 rounded-full shadow-lg"
        >
          <Text className="text-primary text-lg font-bold">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
