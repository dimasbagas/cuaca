import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Video } from "expo-av";
import { useRouter } from "expo-router";

const LoadScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/"); // ke index
    }, 100000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/images/sunny.jpg")}
        style={styles.video}
        shouldPlay
        isLooping
        resizeMode="contain"
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default LoadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: 300,
    height: 300,
  },
  text: {
    marginTop: 20,
    color: "#fff",
    fontSize: 18,
  },
});
