import React, { useEffect, useRef } from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Animated, Easing, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AnimatedIconProps {
  children: React.ReactNode;
  focused: boolean;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ children, focused }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {children}
    </Animated.View>
  );
};

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#242A32" }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ffd33d",
          tabBarInactiveTintColor: "#888",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#25292e",
            borderTopWidth: 0,
            height: 70,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.4,
            shadowRadius: 15,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIcon focused={focused}>
                <Ionicons
                  name={focused ? "home-sharp" : "home-outline"}
                  color={color}
                  size={28}
                />
              </AnimatedIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="movies"
          options={{
            title: "Movies",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIcon focused={focused}>
                <MaterialIcons name="movie" size={28} color={color} />
              </AnimatedIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="tvshows"
          options={{
            title: "TV Shows",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIcon focused={focused}>
                <Feather name="tv" size={28} color={color} />
              </AnimatedIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIcon focused={focused}>
                <Feather name="search" size={28} color={color} />
              </AnimatedIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIcon focused={focused}>
                <MaterialCommunityIcons
                  name="account"
                  size={28}
                  color={color}
                />
              </AnimatedIcon>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
  },
});
