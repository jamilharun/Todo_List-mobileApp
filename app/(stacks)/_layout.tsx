import { Stack } from "expo-router";
import React from "react";

export default function Stackslayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: "main" }}
      />
      <Stack.Screen
        name="todo/[id]"
        options={{ headerShown: true, headerTitle: "Todo" }}
      />
      {/* <Stack.Screen name="createNew" /> */}
    </Stack>
  );
}
