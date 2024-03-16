import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import AssetList from "@/components/_screens/_general/AssetList";

const Assets = () => {
  return (
    <LoggedInContainer>
      <AssetList
        hideTitle
        emptyContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%"
        }}
      />
    </LoggedInContainer>
  );
};

export default Assets;

const styles = StyleSheet.create({});
