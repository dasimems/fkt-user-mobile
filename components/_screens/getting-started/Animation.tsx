import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { withRepeat } from "react-native-reanimated";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {
  AnimationGroupOneBottomImage,
  AnimationGroupOneTopImage,
  AnimationGroupThreeBottomImage,
  AnimationGroupThreeTopImage,
  AnimationGroupTwoBottomImage,
  AnimationGroupTwoTopImage
} from "@/assets/images";

const slideDistance = 50;
const timeDuration = 3000;
const Animation = () => {
  const translateYOne = useSharedValue(-slideDistance);
  const translateXOne = useSharedValue(-slideDistance);
  const translateYTwo = useSharedValue(slideDistance);
  const translateXTwo = useSharedValue(slideDistance);
  const opacityOne = useSharedValue(0);
  const opacityTwo = useSharedValue(0);
  const opacityThree = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeTimeout, setActiveTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const animatedStyleOne = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withRepeat(
          withTiming(translateXOne.value, {
            duration: timeDuration
          }),
          -1,
          true
        )
      },
      {
        translateY: withRepeat(
          withTiming(translateYOne.value, {
            duration: timeDuration
          }),
          -1,
          true
        )
      }
    ]
  }));
  const animatedStyleTwo = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withRepeat(
          withTiming(translateXTwo.value, {
            duration: timeDuration
          }),
          -1,
          true
        )
      },
      {
        translateY: withRepeat(
          withTiming(translateYTwo.value, {
            duration: timeDuration
          }),
          -1,
          true
        )
      }
    ]
  }));

  const opacityAnimatedOne = useAnimatedStyle(() => ({
    opacity: withTiming(opacityOne.value, {
      duration: 500
    })
  }));
  const opacityAnimatedTwo = useAnimatedStyle(() => ({
    opacity: withTiming(opacityTwo.value, {
      duration: 500
    })
  }));
  const opacityAnimatedThree = useAnimatedStyle(() => ({
    opacity: withTiming(opacityThree.value, {
      duration: 500
    })
  }));

  const startSlideAnimation = () => {
    translateXOne.value = 0;
    translateYOne.value = 0;
    translateXTwo.value = 0;
    translateYTwo.value = 0;
  };

  const fadeImages = () => {
    if (activeIndex === 1) {
      opacityOne.value = 1;
    } else {
      opacityOne.value = 0;
    }
    if (activeIndex === 2) {
      opacityTwo.value = 1;
    } else {
      opacityTwo.value = 0;
    }
    if (activeIndex === 3) {
      opacityThree.value = 1;
    } else {
      opacityThree.value = 0;
    }
  };
  useEffect(() => {
    startSlideAnimation();
  }, []);

  useEffect(() => {
    fadeImages();
  }, [activeIndex]);

  useEffect(() => {
    const newTimeout = setTimeout(() => {
      setActiveIndex((prevState) => (prevState + 1 > 3 ? 1 : prevState + 1));
    }, timeDuration * 1.5);
    setActiveTimeout((prevState) => {
      if (prevState) {
        clearTimeout(prevState);
      }
      return newTimeout;
    });
  }, [activeIndex]);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <Animated.View
        style={[
          {
            width: "100%",
            height: "100%",
            position: "absolute"
          },
          opacityAnimatedOne
        ]}
      >
        <Animated.View
          style={[
            {
              width: "62%",
              height: "62%",
              position: "absolute",
              top: 0,
              left: 0
              //   backgroundColor: "red"
            },
            animatedStyleOne
          ]}
        >
          <AnimationGroupOneTopImage width={"100%"} height={"100%"} />
        </Animated.View>
        <Animated.View
          style={[
            {
              width: "62%",
              height: "62%",
              position: "absolute",
              bottom: 0,
              right: 0
              //   backgroundColor: "red"
            },
            animatedStyleTwo
          ]}
        >
          <AnimationGroupOneBottomImage width={"100%"} height={"100%"} />
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          {
            width: "100%",
            height: "100%",
            position: "absolute"
          },
          opacityAnimatedTwo
        ]}
      >
        <Animated.View
          style={[
            {
              width: "62%",
              height: "62%",
              position: "absolute",
              top: 0,
              left: 0
              //   backgroundColor: "red"
            },
            animatedStyleOne
          ]}
        >
          <AnimationGroupTwoTopImage width={"100%"} height={"100%"} />
        </Animated.View>
        <Animated.View
          style={[
            {
              width: "62%",
              height: "62%",
              position: "absolute",
              bottom: 0,
              right: 0
              //   backgroundColor: "red"
            },
            animatedStyleTwo
          ]}
        >
          <AnimationGroupTwoBottomImage width={"100%"} height={"100%"} />
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          {
            width: "100%",
            height: "100%",
            position: "absolute"
          },
          opacityAnimatedThree
        ]}
      >
        <Animated.View
          style={[
            {
              width: "62%",
              height: "62%",
              position: "absolute",
              top: 0,
              left: 0
              //   backgroundColor: "red"
            },
            animatedStyleOne
          ]}
        >
          <AnimationGroupThreeTopImage width={"100%"} height={"100%"} />
        </Animated.View>
        <Animated.View
          style={[
            {
              width: "62%",
              height: "62%",
              position: "absolute",
              bottom: 0,
              right: 0
              //   backgroundColor: "red"
            },
            animatedStyleTwo
          ]}
        >
          <AnimationGroupThreeBottomImage width={"100%"} height={"100%"} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({});
