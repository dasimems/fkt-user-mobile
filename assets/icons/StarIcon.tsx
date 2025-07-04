import React from "react";
import { IconType } from "@/utils/types";
import { useColorScheme } from "react-native";
import { colorSchemes } from "@/utils/_variables";
import { blackColor, whiteColor } from "../colors";
import { Path, Svg } from "react-native-svg";
import { useActionContext } from "@/context";

const StarIcon: React.FC<IconType> = ({ size = 20, color, ...props }) => {
  const { colorScheme } = useActionContext();
  if (!color) {
    color =
      colorScheme === colorSchemes.dark
        ? whiteColor.default
        : blackColor.default;
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 11 11" fill="none" {...props}>
      {/* <rect width="19" height="19" fill="#00AC35" /> */}
      <Path
        d="M3.59543 8.72112C3.42932 8.85112 3.2596 8.85473 3.08626 8.73195C2.91293 8.60917 2.85515 8.44667 2.91293 8.24445L3.53043 6.24029L1.9596 5.12445C1.78626 5.00168 1.73397 4.83918 1.80273 4.63695C1.8712 4.43473 2.01015 4.33362 2.21959 4.33362H4.15876L4.7871 2.25362C4.82321 2.15251 4.87925 2.0748 4.95523 2.02049C5.03092 1.96646 5.11209 1.93945 5.19876 1.93945C5.28543 1.93945 5.36661 1.96646 5.4423 2.02049C5.51827 2.0748 5.57432 2.15251 5.61043 2.25362L6.23876 4.33362H8.17793C8.38737 4.33362 8.52647 4.43473 8.59523 4.63695C8.66369 4.83918 8.61126 5.00168 8.43793 5.12445L6.8671 6.24029L7.48459 8.24445C7.54237 8.44667 7.4846 8.60917 7.31126 8.73195C7.13793 8.85473 6.96821 8.85112 6.80209 8.72112L5.19876 7.49695L3.59543 8.72112Z"
        fill={color}
      />
    </Svg>
  );
};

export default StarIcon;
