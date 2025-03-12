import { View, Text } from "react-native";
import React from "react";
import PullToRefresh from "@/src/components/PullToRefresh";

export default function App() {
  return (
    <View>
      <Text>IndexScreen</Text>
      <PullToRefresh />
    </View>
  );
}
