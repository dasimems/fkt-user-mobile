import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";

const Dashboard = () => {
  return (
    <LoggedInContainer>
      <Text>Dashboard</Text>
    </LoggedInContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
