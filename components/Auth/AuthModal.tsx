import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const AuthModal = () => {
  return (
    <View className="w-11/12 bg-[#242A32] bg-opacity-90 p-6 rounded-xl absolute bottom-8 self-center">
      <Text className="text-white text-lg font-bold text-center mb-2">
        Watch movies anytime anywhere
      </Text>
      <Text className="text-white text-center text-sm mb-6">
        Explore a vast collection of blockbuster movies, timeless classics, and
        the latest releases.
      </Text>
      <TouchableOpacity className="bg-green-500 rounded-lg py-3 mb-3 w-full">
        <Text className="text-white text-center text-lg font-semibold">
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="border border-green-500 rounded-lg py-3 w-full">
        <Text className="text-green-500 text-center text-lg font-semibold">
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthModal;
