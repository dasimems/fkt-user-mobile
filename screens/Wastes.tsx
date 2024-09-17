import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import WasteList from "@/components/_screens/waste/WasteList";

const Wastes = () => {
  return (
    <LoggedInContainer
      hideNav
      contentContainerStyle={{
        gap: 20
      }}
      header={<InnerScreenHeader />}
    >
      <WasteList hideTitle />
    </LoggedInContainer>
  );
};

export default Wastes;

const styles = StyleSheet.create({});
