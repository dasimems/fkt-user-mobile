import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { ArrowLeft2 } from "iconsax-react-native";
import { allScreenNames, defaultIconProps, padding } from "@/utils/_variables";
import { ScreenNamesType } from "@/utils/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { blackColor } from "@/assets/colors";

const InnerScreenHeader: React.FC<{
  headerText?: string;
  hideHeaderText?: boolean;
  hideBackFunction?: boolean;
  color?: ColorValue;
  style?: ViewStyle;
  rightContent?: React.ReactNode;
}> = ({
  headerText,
  hideHeaderText,
  hideBackFunction,
  color = blackColor.default,
  style,
  rightContent
}) => {
  const [activeScreen, setActiveScreen] = useState<ScreenNamesType | null>(
      null
    ),
    { name } = useRoute(),
    { goBack } = useNavigation();

  useEffect(() => {
    if (name) {
      const screen = allScreenNames.find((scr) => scr.name === name);
      setActiveScreen(screen || null);
    }
  }, [name]);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 16,
        paddingHorizontal: padding,
        ...style
      }}
    >
      {!hideBackFunction && (
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft2 {...defaultIconProps} color={color as string} size={27} />
        </TouchableOpacity>
      )}
      {!hideHeaderText && (
        <TextComponent
          fontFamily={Poppins.semiBold.default}
          color={color}
          style={{
            flex: 1
          }}
        >
          {headerText || activeScreen?.label}
        </TextComponent>
      )}
      {rightContent}
    </View>
  );
};

export default InnerScreenHeader;

const styles = StyleSheet.create({});
