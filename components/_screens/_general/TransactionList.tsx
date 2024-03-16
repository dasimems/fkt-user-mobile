import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import TransactionCard from "./TransactionCard";
import { useUserContext } from "@/context";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import { windowWidth } from "@/utils/_variables";

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
  const { transactions } = useUserContext();
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
          <View
            style={{
              height: 150,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              ...emptyContainerStyle
            }}
          >
            <TextComponent
              style={{
                opacity: 0.6
              }}
            >
              You have no transactions at the present moment
            </TextComponent>
          </View>
        ) : (
          transactions.data
            .slice(0, max)
            .map(({ type, created_at, title, amount }, index) => (
              <TransactionCard
                type={type}
                date={"30 sunday April 2023"}
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
                flex: 1
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
