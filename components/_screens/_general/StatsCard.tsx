import {
  ColorValue,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useColorScheme
} from "react-native";
import React from "react";
import { LucideIcon, LucideProps } from "lucide-react-native";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { colorSchemes, defaultIconProps } from "@/utils/_variables";
import { blackColor, whiteColor } from "@/assets/colors";
import { useActionContext } from "@/context";

const StatsCard: React.FC<{
  style?: ViewStyle;
  Icon: LucideIcon;
  iconProps?: LucideProps;
  title: string;
  stat: number | string;
  color?: ColorValue;
  titleColor?: ColorValue;
}> = ({ style, Icon, iconProps, title, stat, color, titleColor }) => {
  const { colorScheme } = useActionContext();
  return (
    <View style={{ gap: 1, alignItems: "center", ...style }}>
      {Icon && (
        <Icon
          {...defaultIconProps}
          {...iconProps}
          color={
            color || colorScheme === colorSchemes.dark
              ? whiteColor.default
              : blackColor.default
          }
        />
      )}
      <TextComponent
        textAlign="center"
        color={titleColor}
        style={{
          opacity: 0.6
        }}
      >
        {title}
      </TextComponent>
      <TextComponent
        color={color}
        textAlign="center"
        fontFamily={Poppins.semiBold.default}
      >
        {stat}
      </TextComponent>
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({});
