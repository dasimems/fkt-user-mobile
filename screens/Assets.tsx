import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import AssetList from "@/components/_screens/_general/AssetList";

const Assets = () => {
  return (
    <LoggedInContainer>
      <AssetList hideTitle />
    </LoggedInContainer>
  );
};

export default Assets;

const styles = StyleSheet.create({});
