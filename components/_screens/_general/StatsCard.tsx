import {
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

const StatsCard: React.FC<{
  style?: ViewStyle;
  Icon: LucideIcon;
  iconProps?: LucideProps;
  title: string;
  stat: number;
}> = ({ style, Icon, iconProps, title, stat }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={{ gap: 1, alignItems: "center" }}>
      {Icon && <Icon {...defaultIconProps} {...iconProps} />}
      <TextComponent
        textAlign="center"
        color={
          colorScheme === colorSchemes.dark
            ? whiteColor.opacity600
            : blackColor.opacity600
        }
      >
        {title}
      </TextComponent>
      <TextComponent textAlign="center" fontFamily={Poppins.semiBold.default}>
        {stat}
      </TextComponent>
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({});
