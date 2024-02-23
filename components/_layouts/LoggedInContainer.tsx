import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import ScrollComponent from "../_general/ScrollComponent";
import Nav from "../_general/nav/Nav";
import {
  ScreenNames,
  allScreenNames,
  defaultIconProps,
  nav,
  padding
} from "@/utils/_variables";
import { ArrowLeft2 } from "iconsax-react-native";
import TextComponent from "../_general/TextComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNamesType } from "@/utils/types";
import { backgroundColor, primaryColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import { Menu } from "react-native-paper";
import { MoreVertical, X } from "lucide-react-native";

const defaultBorderRadius = 30;

const Header: React.FC<{ headerText: string; hideBackArrow?: boolean }> = ({
  headerText,
  hideBackArrow
}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const { goBack } = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: padding,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        flexDirection: "row"
      }}
    >
      <TextComponent
        fontFamily={Poppins.semiBold.default}
        style={{
          flex: 1
        }}
      >
        {headerText || "Screen"}
      </TextComponent>
      <View>
        <Menu
          contentStyle={{
            top: defaultIconProps.size + 10
          }}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              {visible ? (
                <X {...defaultIconProps} />
              ) : (
                <MoreVertical {...defaultIconProps} />
              )}
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => {}} title="Chats" />
          <Menu.Item onPress={() => {}} title="Settings" />
        </Menu>
      </View>
    </View>
  );
};

const LoggedInContainer: React.FC<{
  hideHeader?: boolean;
  hideNav?: boolean;
  header?: React.ReactNode;
  headerText?: string;
  hideBackArrow?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  children: React.ReactNode;
  unScrollable?: boolean;
  unSafeView?: boolean;
}> = ({
  hideHeader,
  hideNav,
  header,
  headerText,
  hideBackArrow,
  style,
  contentContainerStyle,
  children,
  unScrollable,
  unSafeView
}) => {
  const [activeScreen, setActiveScreen] = useState<ScreenNamesType | null>(
      null
    ),
    { name } = useRoute();

  useEffect(() => {
    if (name) {
      const screen = allScreenNames.find((scr) => scr.name === name);
      setActiveScreen(screen || null);
    }
  }, [name]);
  return (
    <Container
      safeView={!unSafeView}
      style={{
        backgroundColor: primaryColor.default,
        padding: 10
      }}
    >
      <View
        style={{
          backgroundColor: backgroundColor.default,
          borderRadius: defaultBorderRadius,
          borderBottomLeftRadius: !hideNav
            ? activeScreen?.name === ScreenNames.Dashboard.name
              ? 0
              : defaultBorderRadius * 0.5
            : defaultBorderRadius,
          borderBottomRightRadius: !hideNav
            ? activeScreen?.name === ScreenNames.Profile.name
              ? 0
              : defaultBorderRadius * 0.5
            : defaultBorderRadius,
          flex: 1,
          ...style
        }}
      >
        {header
          ? header
          : !hideHeader && (
              <Header
                headerText={headerText || activeScreen?.label || "Screen"}
                hideBackArrow={hideBackArrow}
              />
            )}
        <View
          style={{
            flex: 1
          }}
        >
          {unScrollable ? (
            <View
              style={{
                ...styles.contentContainerStyle,
                ...contentContainerStyle
              }}
            >
              {children}
            </View>
          ) : (
            <ScrollComponent
              style={{
                minHeight: 0,
                ...styles.contentContainerStyle,
                ...contentContainerStyle
              }}
            >
              {children}
            </ScrollComponent>
          )}
        </View>
      </View>
      {!hideNav && <Nav />}
    </Container>
  );
};

export default LoggedInContainer;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: padding,
    paddingVertical: 20
  }
});
