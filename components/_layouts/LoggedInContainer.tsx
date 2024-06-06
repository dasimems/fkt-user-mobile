import {
  NativeScrollEvent,
  NativeSyntheticEvent,
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
  innerPadding,
  nav,
  padding
} from "@/utils/_variables";
import { ArrowLeft2 } from "iconsax-react-native";
import TextComponent from "../_general/TextComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNamesType } from "@/utils/types";
import {
  backgroundColor,
  backgroundColorDark,
  blackColor,
  primaryColor,
  whiteColor
} from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import { Menu } from "react-native-paper";
import {
  Bolt,
  LucideIcon,
  MessageCircle,
  MoreVertical,
  Trash,
  X
} from "lucide-react-native";
import { useColorScheme } from "react-native";
import { colorSchemes } from "@/utils/_variables";
import HeaderDropdownButton from "../_general/HeaderDropdownButton";
import { useActionContext } from "@/context";
import { ifCloseToTop, isCloseToBottom } from "@/utils/functions";

const defaultBorderRadius = 30;
const defaultIconSize = 28;

const Header: React.FC<{ headerText: string; hideBackArrow?: boolean }> = ({
  headerText
}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const { colorScheme } = useActionContext();
  const { navigate } = useNavigation();
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
        fontSize={16}
        style={{
          flex: 1
        }}
      >
        {headerText || "Screen"}
      </TextComponent>
      <View>
        <Menu
          contentStyle={{
            top: defaultIconSize + 10,
            backgroundColor: whiteColor.default,
            borderRadius: 15
          }}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              {visible ? (
                <X
                  {...defaultIconProps}
                  size={defaultIconSize}
                  color={
                    colorScheme === colorSchemes.dark
                      ? whiteColor.opacity600
                      : blackColor.opacity600
                  }
                />
              ) : (
                <MoreVertical
                  {...defaultIconProps}
                  size={defaultIconSize}
                  color={
                    colorScheme === colorSchemes.dark
                      ? whiteColor.opacity600
                      : blackColor.opacity600
                  }
                />
              )}
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigate(ScreenNames.Chats.name as never);
            }}
            title={<HeaderDropdownButton Icon={MessageCircle} label="Chats" />}
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigate(ScreenNames.Waste.name as never);
            }}
            title={<HeaderDropdownButton Icon={Trash} label="Waste" />}
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigate(ScreenNames.Profile.name as never);
            }}
            title={<HeaderDropdownButton Icon={Bolt} label="Settings" />}
          />
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
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  children: React.ReactNode;
  unScrollable?: boolean;
  unSafeView?: boolean;
  runOnScrollEnd?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  runOnScrollToTop?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}> = ({
  hideHeader,
  hideNav,
  header,
  headerText,
  style,
  contentContainerStyle,
  children,
  unScrollable,
  unSafeView,
  runOnScrollEnd,
  runOnScrollToTop
}) => {
  const [activeScreen, setActiveScreen] = useState<ScreenNamesType | null>(
      null
    ),
    { name } = useRoute();
  const { colorScheme } = useActionContext();

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
        padding: innerPadding
      }}
    >
      <View
        style={{
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? backgroundColorDark.default
              : backgroundColor.default,
          borderRadius: defaultBorderRadius,
          borderBottomLeftRadius: !hideNav
            ? activeScreen?.name === ScreenNames.Dashboard.name
              ? 0
              : defaultBorderRadius * 0.5
            : defaultBorderRadius,
          borderBottomRightRadius: !hideNav
            ? activeScreen?.name === ScreenNames.Referrals.name
              ? 0
              : defaultBorderRadius * 0.5
            : defaultBorderRadius,
          flex: 1,
          paddingBottom: !hideNav ? padding : 0,
          ...style
        }}
      >
        {header
          ? header
          : !hideHeader && (
              <Header
                headerText={headerText || activeScreen?.label || "Screen"}
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
              onScroll={(e) => {
                const scrolledToBottom = isCloseToBottom(e);
                const scrolledToTop = ifCloseToTop(e);
                if (scrolledToBottom) {
                  if (runOnScrollEnd) {
                    runOnScrollEnd(e);
                  }
                }
                if (scrolledToTop) {
                  if (runOnScrollToTop) {
                    runOnScrollToTop(e);
                  }
                }
              }}
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
