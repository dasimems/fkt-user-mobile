import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import TransactionList from "@/components/_screens/_general/TransactionList";
import PendingWithdrawal from "@/components/_screens/_general/PendingWithdrawal";
import DashboardBalance from "@/components/_screens/dashboard/DashboardBalance";
import WalletActions from "@/components/_screens/wallet/WalletActions";
import WalletStat from "@/components/_screens/wallet/WalletStat";
import { useUserContext } from "@/context";

const Wallet = () => {
  const { balance } = useUserContext();
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
      {balance && balance?.withdrawal && (
        <PendingWithdrawal
          date={balance?.withdrawal?.created_at}
          amount={balance?.withdrawal?.amount?.display}
          id={balance?.withdrawal?.id}
        />
      )}
      <TransactionList title="Transactions" />
    </LoggedInContainer>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
