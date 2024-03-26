import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import TransactionList from "@/components/_screens/_general/TransactionList";
import PendingWithdrawal from "@/components/_screens/_general/PendingWithdrawal";
import DashboardBalance from "@/components/_screens/dashboard/DashboardBalance";
import WalletActions from "@/components/_screens/wallet/WalletActions";
import WalletStat from "@/components/_screens/wallet/WalletStat";
import { useUserContext } from "@/context";
import { LoadingOne } from "@/assets/images";
import { nextLoadingSize } from "@/utils/_variables";
import axios from "axios";
import { TransactionExpectedDataType } from "@/reducers/userReducer";
import { AllResponseType } from "@/api/index.d";
import { showToast } from "@/utils/functions";

const Wallet = () => {
  const { balance } = useUserContext();
  const { transactions, setUserTransactions } = useUserContext();
  const [nextLoading, setNextLoading] = useState(false);
  return (
    <LoggedInContainer
      runOnScrollEnd={() => {
        if (transactions.next && !nextLoading) {
          setNextLoading(true);
          axios
            .get<AllResponseType>(transactions.next)
            .then((res) => {
              const response = res?.data;
              const availableTransactions = transactions.data || [];

              const userTransactions: TransactionExpectedDataType = {
                data: [...availableTransactions, ...response?.transactions],
                next: response?.links?.next || null,
                total: response?.meta?.total || 0
              };
              setUserTransactions(userTransactions);
            })
            .catch((err) => {
              showToast(
                err?.response?.data?.message ||
                  err?.message ||
                  "Something went wrong while fetching other available transactions"
              );
            })
            .finally(() => {
              setNextLoading(false);
            });
        }
      }}
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
      {nextLoading && (
        <View
          style={{
            alignItems: "center",
            gap: 10,
            paddingTop: 20
          }}
        >
          <Image
            source={LoadingOne}
            style={{
              width: nextLoadingSize,
              height: nextLoadingSize,
              resizeMode: "contain"
            }}
          />
        </View>
      )}
    </LoggedInContainer>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
