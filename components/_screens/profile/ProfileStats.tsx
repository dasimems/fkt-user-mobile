import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { primaryColor, whiteColor } from "@/assets/colors";
import StatsCard from "../_general/StatsCard";
import { Component, Folder, Wallet } from "lucide-react-native";
import { useUserContext } from "@/context";

const ProfileStats = () => {
  const { projects, assets, balance } = useUserContext();
  return (
    <View
      style={{
        backgroundColor: primaryColor.opacity600,
        width: "100%",
        padding: 20,
        borderRadius: 15,
        flexDirection: "row"
      }}
    >
      <StatsCard
        color={whiteColor.default}
        titleColor={whiteColor.default}
        Icon={Folder}
        title="Projects"
        stat={projects.total || 0}
        style={{
          ...styles.statStyle,
          borderRightWidth: 1,
          borderColor: whiteColor.default
        }}
      />
      <StatsCard
        color={whiteColor.default}
        titleColor={whiteColor.default}
        Icon={Component}
        title="Assets"
        stat={assets.total || 0}
        style={{
          ...styles.statStyle,
          borderRightWidth: 1,
          borderColor: whiteColor.default
        }}
      />
      <StatsCard
        color={whiteColor.default}
        titleColor={whiteColor.default}
        Icon={Wallet}
        title="Balance"
        stat={balance?.wallet.balance?.display || 0}
        style={{
          ...styles.statStyle
        }}
      />
    </View>
  );
};

export default ProfileStats;

const styles = StyleSheet.create({
  statStyle: {
    flex: 1 / 3
  }
});
