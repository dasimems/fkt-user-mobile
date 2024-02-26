import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import Animated from "react-native-reanimated";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { useActionContext } from "@/context";
import { colorSchemes } from "@/utils/_variables";

const Toggle: React.FC<{
  size?: number;
  activeColor?: ColorValue;
  nonActiveColor?: ColorValue;
  nonActiveButtonColor?: ColorValue;
  active?: boolean;
  onChange?: (value: boolean) => void;
  oneWay?: boolean;
}> = ({
  size = 50,
  activeColor = primaryColor.default,
  nonActiveColor,
  nonActiveButtonColor = whiteColor.default,
  active = false,
  onChange = () => {},
  oneWay
}) => {
  const { colorScheme } = useActionContext();
  const [isActive, setIsActive] = useState(false);
  const marginLeft = useSharedValue(0);

  if (!nonActiveColor) {
    nonActiveColor =
      colorScheme === colorSchemes.dark
        ? whiteColor.opacity100
        : blackColor.opacity100;
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginLeft: withTiming(marginLeft.value)
    };
  });

  const toggleActive = () => {
    marginLeft.value = size * 0.5;
  };
  const toggleUnActive = () => {
    marginLeft.value = 0;
  };

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    if (isActive) {
      toggleActive();
    } else {
      toggleUnActive();
    }
  }, [isActive]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!oneWay) {
          setIsActive((prevState) => !prevState);
          onChange(!isActive);
        }
      }}
      style={{
        width: size,
        height: size * 0.5,
        borderRadius: 9000,
        backgroundColor: isActive ? activeColor : nonActiveColor,
        padding: size * 0.05
      }}
    >
      <Animated.View
        style={[
          {
            width: size * 0.4,
            height: size * 0.4,
            backgroundColor: isActive ? nonActiveButtonColor : activeColor,
            borderRadius: 90000
          },
          animatedStyle
        ]}
      ></Animated.View>
    </TouchableOpacity>
  );
};

export default Toggle;

const styles = StyleSheet.create({});
