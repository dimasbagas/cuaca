import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="loadScreen">
      <Stack.Screen name="loadScreen" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
