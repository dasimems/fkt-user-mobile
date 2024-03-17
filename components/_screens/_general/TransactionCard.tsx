import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React, { useEffect, useRef } from "react";
import {
  ScreenNames,
  colorSchemes,
  dateFormat,
  defaultIconProps
} from "@/utils/_variables";
import {
  blackColor,
  primaryColor,
  redColor,
  whiteColor
} from "@/assets/colors";
// import InView from "react-native-component-inview";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { ArrowDown, ArrowUp, Banknote } from "lucide-react-native";
import { textColor } from "../../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { useActionContext } from "@/context";
import moment from "moment";

const TransactionCard: React.FC<{
  type?: "debit" | "credit";
  description: string;
  date: Date;
  price: string;
  id: string;
}> = ({ type, description, date, price, id }) => {
  const { colorScheme } = useActionContext();
  const touchableRef = useRef<TouchableOpacity>(null);
  let textColor =
    colorScheme === colorSchemes.dark ? redColor.default : redColor.opacity600;
  const { navigate } = useNavigation();

  switch (type?.toLowerCase()) {
    case "credit":
      textColor =
        colorScheme === colorSchemes.dark
          ? whiteColor.default
          : primaryColor.opacity600;
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity
      ref={touchableRef}
      onPress={() => {
        navigate({
          name: ScreenNames.TransactionDetails.name,
          params: {
            type,
            id
          }
        } as never);
      }}
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
              ? whiteColor.opacity100
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
          style={{
            opacity: 0.6
          }}
        >
          {moment(date).format(dateFormat)}
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
