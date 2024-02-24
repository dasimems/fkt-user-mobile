import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React from "react";
import { blackColor, pendingColor, whiteColor } from "@/assets/colors";
import {
  ScreenNames,
  colorSchemes,
  defaultIconProps
} from "@/utils/_variables";
import { Clock, Info } from "lucide-react-native";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PendingWithdrawal = () => {
  const colorScheme = useColorScheme();
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate({
          name: ScreenNames.TransactionDetails.name,
          params: {
            type: "pending"
          }
        } as never);
      }}
      style={{
        gap: 10,
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? blackColor.default
            : whiteColor.default,
        padding: 10,
        borderRadius: 9000,
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <View
        style={{
          backgroundColor: pendingColor.opacity100,
          height: 50,
          width: 50,
          borderRadius: 9000,
          padding: 5
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? blackColor.default
                : whiteColor.default,
            borderRadius: 90000,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FontAwesome5
            name="exclamation"
            {...defaultIconProps}
            color={pendingColor.opacity600}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default}>
          Pending withdrawal
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          25 Sunday June 2023
        </TextComponent>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 2
        }}
      >
        <TextComponent color={pendingColor.default} fontSize={13}>
          $50,000
        </TextComponent>
        <Clock {...defaultIconProps} size={11} color={pendingColor.default} />
      </View>
    </TouchableOpacity>
  );
};

export default PendingWithdrawal;

const styles = StyleSheet.create({});
