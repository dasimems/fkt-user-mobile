import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React from "react";
import { ScreenNamesType } from "@/utils/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import TextComponent from "../TextComponent";
import {
  defaultIconProps,
  navRoutes,
  padding,
  windowWidth
} from "@/utils/_variables";
import { backgroundColor, primaryColor, whiteColor } from "@/assets/colors";
import { ActiveNavWingOneImage, ActiveNavWingTwoImage } from "@/assets/images";

const NavButton: React.FC<ScreenNamesType & { index: number }> = ({
  Icon,
  name,
  label,
  activeNames,
  index
}) => {
  const { name: screenName } = useRoute();
  const { navigate } = useNavigation();

  let isActive = screenName === name;
  const iconSize = 25;
  const defaultWidth = (windowWidth - padding * 2) / navRoutes.length;

  if (!isActive) {
    isActive = activeNames.includes(screenName);
  }
  return (
    <Pressable
      onPress={() => {
        navigate(name as never);
      }}
      style={{
        width: defaultWidth,
        backgroundColor: isActive ? backgroundColor.default : undefined,
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 6,
          paddingVertical: 20
        }}
      >
        {Icon && (
          <>
            {isActive ? (
              <Icon
                {...defaultIconProps}
                size={iconSize}
                color={primaryColor.default}
              />
            ) : (
              <Icon
                {...defaultIconProps}
                size={iconSize}
                color={whiteColor.default}
              />
            )}
          </>
        )}
      </View>
      {isActive && index !== 0 && (
        <Image
          source={ActiveNavWingOneImage}
          style={{
            height: "50%",
            width: "100%",
            resizeMode: "contain",
            position: "absolute",
            top: 0,
            transform: [
              {
                translateX: -defaultWidth * 0.71
              }
            ]
          }}
        />
      )}
      {isActive && index !== navRoutes.length - 1 && (
        <Image
          source={ActiveNavWingTwoImage}
          style={{
            height: "50%",
            width: "100%",
            resizeMode: "contain",
            position: "absolute",
            top: 0,
            transform: [
              {
                translateX: defaultWidth * 0.71
              }
            ]
          }}
        />
      )}
    </Pressable>
  );
};

export default NavButton;

const styles = StyleSheet.create({});
