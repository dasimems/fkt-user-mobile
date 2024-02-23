import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React from "react";
import { colorSchemes, defaultIconProps } from "@/utils/_variables";
import {
  blackColor,
  primaryColor,
  redColor,
  whiteColor
} from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { ArrowDown, ArrowUp, Banknote } from "lucide-react-native";
import { textColor } from "../../../assets/colors";

const TransactionCard: React.FC<{
  type?: "debit" | "credit";
  description: string;
  date: string;
  price: string;
}> = ({ type, description, date, price }) => {
  const colorScheme = useColorScheme();
  let textColor = redColor.opacity600;

  switch (type?.toLowerCase()) {
    case "credit":
      textColor = primaryColor.opacity600;
      break;
    default:
      break;
  }
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? blackColor.default
              : whiteColor.default,
          borderRadius: 9000,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Banknote {...defaultIconProps} color={textColor} size={23} />
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {description}
        </TextComponent>
        <TextComponent
          color={
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity600
              : blackColor.opacity600
          }
        >
          {date}
        </TextComponent>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1
        }}
      >
        <TextComponent color={textColor}>{price}</TextComponent>
        {type?.toLowerCase() === "debit" ? (
          <ArrowUp {...defaultIconProps} color={textColor} />
        ) : (
          <ArrowDown {...defaultIconProps} color={textColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
