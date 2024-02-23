import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import DashboardBalance from "@/components/_screens/dashboard/DashboardBalance";
import ReferralCard from "@/components/_screens/_general/ReferralCard";
import DashboardStats from "@/components/_screens/dashboard/DashboardStats";
import PendingWithdrawal from "@/components/_screens/_general/PendingWithdrawal";
import ProjectList from "@/components/_screens/_general/ProjectList";
import AssetList from "@/components/_screens/_general/AssetList";
import TransactionList from "@/components/_screens/_general/TransactionList";

const Dashboard = () => {
  return (
    <LoggedInContainer
      headerText="Welcome user"
      contentContainerStyle={{
        gap: 30
      }}
    >
      <View
        style={{
          gap: 20
        }}
      >
        <DashboardBalance />
        <ReferralCard />
      </View>
      <DashboardStats />
      <PendingWithdrawal />
      <ProjectList max={5} />
      <AssetList max={5} />
      <TransactionList max={5} />
    </LoggedInContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
