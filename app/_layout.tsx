import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    k2d: require("../assets/fonts/K2D-Regular.ttf"),
    "k2d-medium": require("../assets/fonts/K2D-Medium.ttf"),
    "k2d-bold": require("../assets/fonts/K2D-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#242A32" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
