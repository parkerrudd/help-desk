import { StyleSheet, View, Text } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";

import BottomTabNavigator from "./navigation/BottomTabNavigator";

const queryClient = new QueryClient();

export default function App() {
  const toastConfig = {
    success: ({ props }) => (
      <View
        style={{
          height: 120,
          width: "100%",
          backgroundColor: "#FFFAF0",
          paddingHorizontal: 15,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 45,
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", color: "black" }}>
            Submitted ✔️
          </Text>
        </View>
      </View>
    ),
  };

  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <BottomTabNavigator />
        <Toast config={toastConfig} autoHide={true} topOffset={0} />
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
