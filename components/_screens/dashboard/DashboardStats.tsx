import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StatsCard from "../_general/StatsCard";
import { CheckSquare, Component, Folder } from "lucide-react-native";

const DashboardStats = () => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <StatsCard Icon={Folder} title="Projects" stat={0} />
      <StatsCard Icon={Component} title="Assets" stat={0} />
      <StatsCard Icon={CheckSquare} title="Active Proj" stat={0} />
    </View>
  );
};

export default DashboardStats;

const styles = StyleSheet.create({});
