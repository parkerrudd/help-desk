import React from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { useIsFocused } from "@react-navigation/native";

import fetchTickets from "../api/fetchTickets";
import TicketsTabNavigator from "../components/TicketsTabNavigator";

export default function AdminScreen() {
  const isFocused = useIsFocused();

  const {
    data: tickets,
    isLoading,
    refetch: refetchTickets,
  } = useQuery("fetchTickets", async () => fetchTickets(), {
    enabled: isFocused,
    onError: (err) => {
      console.error(err);
      Alert.alert(
        "Oops",
        "Tickets could not be retrieved. Please try again later."
      );
    },
  });

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size={"large"} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tickets</Text>
      <View style={styles.tabNavContainer}>
        <TicketsTabNavigator
          tickets={tickets}
          refetchTickets={refetchTickets}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b5738",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 70,
    marginLeft: 20,
  },
  tabNavContainer: {
    overflow: "hidden",
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 25,
  },
});
