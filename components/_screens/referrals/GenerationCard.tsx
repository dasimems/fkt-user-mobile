import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React from "react";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import { Users } from "lucide-react-native";
import {
  colorSchemes,
  defaultIconProps,
  windowWidth
} from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const GenerationCard: React.FC<{
  label: string;
  value: string;
  stat: number;
  isActive?: boolean;
  onChange?: (value: string) => void;
}> = ({ label, value, stat, isActive, onChange }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === colorSchemes.dark;
  return (
    <TouchableOpacity
      onPress={() => {
        if (onChange) {
          onChange(value);
        }
      }}
      style={{
        padding: 20,
        backgroundColor: isActive
          ? primaryColor.opacity800
          : isDarkMode
          ? blackColor.default
          : whiteColor.default,
        gap: 20,
        borderRadius: 15,
        width: windowWidth * 0.5
      }}
    >
      <View>
        <Users
          {...defaultIconProps}
          color={
            isActive
              ? whiteColor.default
              : isDarkMode
              ? whiteColor.default
              : blackColor.default
          }
        />
      </View>
      <View>
        <TextComponent
          color={isActive ? whiteColor.default : undefined}
          style={{
            opacity: 0.6
          }}
        >
          {label}
        </TextComponent>
        <TextComponent
          color={isActive ? whiteColor.default : undefined}
          fontFamily={Poppins.semiBold.default}
        >
          {stat}
        </TextComponent>
      </View>
    </TouchableOpacity>
  );
};

export default GenerationCard;

const styles = StyleSheet.create({});
