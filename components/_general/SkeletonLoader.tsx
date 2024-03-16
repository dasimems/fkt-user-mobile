import { windowWidth } from "@/utils/_variables";
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withSpring,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";

const SkeletonLoader: React.FC<{
  width?: number;
  height?: number;
  style?: ViewStyle;
}> = ({ width = windowWidth * 0.3, height = 10, style }) => {
  const skeletonWidth = useSharedValue(100); // Default width
  const skeletonHeight = useSharedValue(20); // Default height
  const opacity = useSharedValue(0); // Default opacity

  // Adjust width and height when props change
  React.useEffect(() => {
    skeletonWidth.value = withSpring(width || 100);
    skeletonHeight.value = withSpring(height || 20);
    opacity.value = withRepeat(withTiming(1, { duration: 500 }), -1);
  }, [width, height]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: skeletonWidth.value,
      height: skeletonHeight.value,
      backgroundColor: "#E0E0E0", // Placeholder color
      borderRadius: 15,
      opacity: opacity.value
    };
  });

  return (
    <Animated.View
      style={[{ ...styles.skeleton, ...style }, animatedStyle]}
    ></Animated.View>
  );
};

const styles = StyleSheet.create({
  skeleton: {}
});

export default SkeletonLoader;
