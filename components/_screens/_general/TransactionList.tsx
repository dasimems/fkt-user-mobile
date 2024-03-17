import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import TransactionCard from "./TransactionCard";
import { useUserContext } from "@/context";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import { windowWidth } from "@/utils/_variables";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import { EmptyTransactionsLottieAnimation } from "@/assets/lottie";
import useUser from "@/hooks/useUser";

const TransactionList: React.FC<{
  max?: number;
  hideTitle?: boolean;
  title?: string;
  emptyContainerStyle?: ViewStyle;
}> = ({
  max,
  hideTitle,
  title = "Recent Transactions",
  emptyContainerStyle
}) => {
  const { transactions, userDetails } = useUserContext();
  const { fetchUserTransactions } = useUser();

  useEffect(() => {
    fetchUserTransactions();
  }, []);
  return (
    <View
      style={{
        gap: 35
      }}
    >
      {!hideTitle && (
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {title}
        </TextComponent>
      )}

      {transactions.data ? (
        transactions.data.length < 1 ? (
          <EmptyContainer
            animation={EmptyTransactionsLottieAnimation}
            containerStyle={emptyContainerStyle}
            text="You have no transactions at the present moment"
          />
        ) : (
          transactions.data
            .slice(0, max)
            .map(({ type, created_at, id, title, amount }, index) => (
              <TransactionCard
                id={id}
                type={type}
                date={((created_at as any) * 1000) as unknown as Date}
                description={title}
                price={amount?.display}
                key={index}
              />
            ))
        )
      ) : (
        new Array(max || 6).fill(0).map((_, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}
          >
            <SkeletonLoader
              width={50}
              height={50}
              style={{
                borderRadius: 9000
              }}
            />

            <View
              style={{
                flex: 1,
                gap: 7
              }}
            >
              <SkeletonLoader width={windowWidth * 0.4} />
              <SkeletonLoader />
            </View>
            <SkeletonLoader width={40} />
          </View>
        ))
      )}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
