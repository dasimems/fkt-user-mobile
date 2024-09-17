import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { DonationType } from "@/api/index.d";

const WasteCard: React.FC<DonationType> = ({
  pickup_location,
  _id: id,
  status,
  weight,
  donor_name
}) => {
  return (
    <View
      style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: whiteColor.default,
        borderRadius: 15
      }}
    >
      <TextComponent fontFamily={Poppins.semiBold.default}>
        {pickup_location?.address}
      </TextComponent>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10
        }}
      >
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          Donation ID:
        </TextComponent>
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {id}
        </TextComponent>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10
        }}
      >
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          Status:
        </TextComponent>
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {status}
        </TextComponent>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10
        }}
      >
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          Weight:
        </TextComponent>
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {weight}
        </TextComponent>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10
        }}
      >
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          Donor:
        </TextComponent>
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {donor_name}
        </TextComponent>
      </View>
    </View>
  );
};

export default WasteCard;

const styles = StyleSheet.create({});
