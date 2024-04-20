import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TicketsTabs from "./TicketsTabs";

const Tab = createMaterialTopTabNavigator();
export default function TicketsTabNavigator({ tickets }) {
  const [newTickets, setNewTickets] = useState([]);
  const [inProgressTickets, setInProgressTickets] = useState([]);
  const [resolvedTickets, setResolvedTickets] = useState([]);

  useEffect(() => {
    const newTickets = tickets?.filter((item) => item.status === "New");
    const inProgressTickets = tickets?.filter(
      (item) => item.status === "In Progress"
    );
    const resolvedTickets = tickets?.filter(
      (item) => item.status === "Resolved"
    );
    setNewTickets(newTickets);
    setInProgressTickets(inProgressTickets);
    setResolvedTickets(resolvedTickets);
  }, [tickets]);

  return (
    <Tab.Navigator
      initialRouteName={"All"}
      headerMode="none"
      screenOptions={{
        tabBarActiveTintColor: "#1b5738",
        tabBarinactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontWeight: "bold",
          width: 99,
        },

        tabBarIndicatorStyle: {
          borderBottomWidth: 2,
          borderColor: "#1b5738",
        },
      }}
    >
      <Tab.Screen name="All">
        {() => <TicketsTabs tickets={tickets} />}
      </Tab.Screen>
      <Tab.Screen name="New">
        {() => <TicketsTabs tickets={newTickets} />}
      </Tab.Screen>
      <Tab.Screen name="In Progress">
        {() => <TicketsTabs tickets={inProgressTickets} />}
      </Tab.Screen>
      <Tab.Screen name="Resolved">
        {() => <TicketsTabs tickets={resolvedTickets} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
