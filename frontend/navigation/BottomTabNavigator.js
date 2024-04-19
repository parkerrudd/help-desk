import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import CustomerScreen from "../screens/CustomerScreen";
import AdminScreen from "../screens/AdminScreen";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="CustomerScreen"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "#1b5738",
        }}
      >
        <Tab.Screen
          name="CustomerScreen"
          component={CustomerScreen}
          options={{
            title: "Customer",
            tabBarLabel: "Customer",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/images/ticket-solid.png")}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: "contain",
                  tintColor: focused ? "#1b5738" : "gray",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{
            title: "Admin",
            tabBarLabel: "Admin",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/images/clipboard-solid.png")}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: "contain",
                  tintColor: focused ? "#1b5738" : "gray",
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabNavigator;
