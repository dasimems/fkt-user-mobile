import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  View
} from "react-native";
import React, { forwardRef } from "react";
import { ScrollComponentType } from "@/utils/types";

const ScrollComponent = forwardRef<ScrollView, ScrollComponentType>(
  ({ children, style, showScrollIndicator, ...props }, ref) => {
    return (
      <ScrollView
        ref={ref}
        showsHorizontalScrollIndicator={showScrollIndicator || false}
        showsVerticalScrollIndicator={showScrollIndicator || false}
        contentContainerStyle={{
          minHeight: "100%",
          ...style
        }}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

export default ScrollComponent;

const styles = StyleSheet.create({});
