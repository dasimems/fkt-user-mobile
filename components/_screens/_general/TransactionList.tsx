import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import TransactionCard from "./TransactionCard";

const TransactionList: React.FC<{
  max?: number;
  hideTitle?: boolean;
  title?: string;
}> = ({ max, hideTitle, title = "Recent Transactions" }) => {
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

      {new Array(max || 6).fill(0).map((_, index) => (
        <TransactionCard
          type={index % 2 === 0 ? "credit" : "debit"}
          date="30 sunday April 2023"
          description="Assisted Hank Fedry"
          price="$1.00"
          key={index}
        />
      ))}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
