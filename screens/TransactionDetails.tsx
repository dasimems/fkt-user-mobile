import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import { useRoute } from "@react-navigation/native";
import {
  blackColor,
  pendingColor,
  primaryColor,
  redColor,
  whiteColor
} from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import {
  colorSchemes,
  defaultIconProps,
  windowWidth
} from "@/utils/_variables";
import { Download, Share2 } from "lucide-react-native";

const Details: React.FC<{ title: string; value: string }> = ({
  title,
  value
}) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        paddingVertical: 25,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor:
          colorScheme === colorSchemes.dark
            ? whiteColor.opacity100
            : blackColor.opacity100,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        justifyContent: "space-between"
      }}
    >
      <TextComponent fontFamily={Poppins.semiBold.default}>
        {title}:
      </TextComponent>
      <TextComponent
        style={{
          opacity: 0.6
        }}
      >
        {value}
      </TextComponent>
    </View>
  );
};

const TransactionDetails = () => {
  const { params }: { params?: { type?: "debit" | "credit" | "pending" } } =
    useRoute();
  const colorScheme = useColorScheme();
  let textColor = pendingColor.default;
  let bgColor = pendingColor.opacity100;
  switch (params?.type?.toLowerCase()) {
    case "debit":
      textColor = redColor.default;
      bgColor = redColor.opacity100;
      break;
    case "credit":
      textColor = primaryColor.default;
      bgColor = primaryColor.opacity100;
      break;
    default:
      break;
  }
  return (
    <LoggedInContainer
      hideNav
      header={
        <InnerScreenHeader
          rightContent={
            <View
              style={{
                backgroundColor: bgColor,
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderRadius: 10
              }}
            >
              <TextComponent
                fontSize={12}
                fontFamily={Poppins.semiBold.default}
                color={textColor}
              >
                {params?.type?.slice(0, 1).toUpperCase()}
                {params?.type?.slice(1)}
              </TextComponent>
            </View>
          }
        />
      }
      contentContainerStyle={{
        gap: 30
      }}
    >
      <View
        style={{
          alignItems: "center"
        }}
      >
        <TextComponent
          textAlign="center"
          fontFamily={Poppins.bold.default}
          fontSize={windowWidth * 0.08}
        >
          +$1.00
        </TextComponent>
        <TextComponent
          textAlign="center"
          style={{
            opacity: 0.6
          }}
        >
          Amount
        </TextComponent>
      </View>
      <View>
        <Details title="Date" value="30 Sunday April 2023" />
        <Details title="Title" value="[3]Referred Hank Moore" />
        <Details title="Status" value="completed" />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.actionStyle,
            borderColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity100
                : styles.actionStyle.borderColor
          }}
        >
          <Share2
            {...defaultIconProps}
            color={
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity600
                : blackColor.opacity600
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.actionStyle,
            borderColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity100
                : styles.actionStyle.borderColor
          }}
        >
          <Download
            {...defaultIconProps}
            color={
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity600
                : blackColor.opacity600
            }
          />
        </TouchableOpacity>
      </View>
    </LoggedInContainer>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  actionStyle: {
    width: 40,
    height: 40,
    borderRadius: 90000,
    borderWidth: 1,
    borderColor: blackColor.opacity100,
    alignItems: "center",
    justifyContent: "center"
  }
});
