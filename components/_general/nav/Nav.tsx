import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { navRoutes, padding } from "@/utils/_variables";
import { blackColor, primaryColor } from "@/assets/colors";
import NavButton from "./NavButton";

const Nav = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: primaryColor.default,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        width: "100%"
      }}
    >
      {navRoutes.map((screenName, index) => (
        <NavButton index={index} {...screenName} key={index} />
      ))}
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({});
