import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import BottomTabNavigator from "./navigation/BottomTabNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <BottomTabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
