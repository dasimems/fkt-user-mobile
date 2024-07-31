import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import PointBalance from "@/components/_screens/waste/PointBalance";
import PointStats from "@/components/_screens/waste/PointStats";
import TextComponent from "@/components/_general/TextComponent";
import { primaryColor } from "@/assets/colors";
import { whiteColor } from "../assets/colors";
import WasteList from "@/components/_screens/waste/WasteList";
import useUser from "@/hooks/useUser";
import { useUserContext } from "@/context";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "@/utils/_variables";

const WasteManagement = () => {
  const { userDetails } = useUserContext();
  const { navigate } = useNavigation();

  return (
    <LoggedInContainer
      contentContainerStyle={{
        gap: 20
      }}
      hideNav
      header={
        <InnerScreenHeader
          rightContent={
            userDetails?.role === "donor" && (
              <TouchableOpacity
                onPress={() => {
                  navigate(ScreenNames.DonateWaste.name as never);
                }}
                style={{
                  backgroundColor: primaryColor.default,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 10
                }}
              >
                <TextComponent color={whiteColor.default}>Donate</TextComponent>
              </TouchableOpacity>
            )
          }
        />
      }
    >
      <PointBalance />
      <PointStats />
      <WasteList max={5} showViewAll />
    </LoggedInContainer>
  );
};

export default WasteManagement;

const styles = StyleSheet.create({});
