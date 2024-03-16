import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StatsCard from "../_general/StatsCard";
import { CheckSquare, Component, Folder } from "lucide-react-native";
import { useUserContext } from "@/context";

const DashboardStats = () => {
  const { projects, assets } = useUserContext();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <StatsCard Icon={Folder} title="Projects" stat={projects.total || 0} />
      <StatsCard Icon={Component} title="Assets" stat={assets.total || 0} />
      <StatsCard Icon={CheckSquare} title="Active Proj" stat={0} />
    </View>
  );
};

export default DashboardStats;

const styles = StyleSheet.create({});
