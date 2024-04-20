import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function TicketRenderItem({ item, handleTicketPress }) {
  return (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => handleTicketPress(item)}
    >
      <View style={styles.textInfoContainer}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Status:</Text> {item?.status}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
          {item?.description}
        </Text>
      </View>
      <Image
        source={require("../assets/images/plus-solid.png")}
        style={styles.plusIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  textInfoContainer: {
    width: "90%",
    gap: 10,
  },
  plusIcon: {
    height: 20,
    width: 20,
    tintColor: "#1b5738",
  },
});
