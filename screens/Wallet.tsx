import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import TransactionList from "@/components/_screens/_general/TransactionList";
import PendingWithdrawal from "@/components/_screens/_general/PendingWithdrawal";
import DashboardBalance from "@/components/_screens/dashboard/DashboardBalance";
import WalletActions from "@/components/_screens/wallet/WalletActions";
import WalletStat from "@/components/_screens/wallet/WalletStat";

const Wallet = () => {
  return (
    <LoggedInContainer
      contentContainerStyle={{
        gap: 30
      }}
    >
      <DashboardBalance
        style={{
          flexDirection: "column-reverse"
        }}
      />
      <WalletActions />
      <WalletStat />
      <PendingWithdrawal />
      <TransactionList title="Transactions" />
    </LoggedInContainer>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
