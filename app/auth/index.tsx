import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import LoginPage from "./login";
import RegisterPage from "./register";
import { LinearGradient } from "expo-linear-gradient";
import AuthModal from "@/components/Auth/AuthModal";
import { Link } from "expo-router";

const Auth = () => {
  return (
    <View className="flex-1 items-center justify-center">
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
        source={require("../../assets/images/avatar.jpg")}
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
      <Link href={"/(tabs)"} className="text-primary text-lg font-bold">
        <Text className="">Welcome</Text>
      </Link>
      {/* <AuthModal /> */}
    </View>
  );
};

export default Auth;

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
