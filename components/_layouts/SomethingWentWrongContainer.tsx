import { View, ViewStyle } from "react-native";
import TextComponent from "../_general/TextComponent";
import LottieView, { AnimationObject } from "lottie-react-native";
import { EmptyAssetsLottieAnimation } from "@/assets/lottie";

const SomethingWentWrongContainer: React.FC<{
  animation?: AnimationObject;
  containerStyle?: ViewStyle;
  text?: string;
  animationStyle?: ViewStyle;
}> = ({ animation, containerStyle, animationStyle, text }) => {
  return (
    <View
      style={{
        height: 150,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle
      }}
    >
      <LottieView
        source={animation || EmptyAssetsLottieAnimation}
        style={{ width: 120, height: 120, ...animationStyle }}
        autoPlay
        loop
      />
      <TextComponent
        style={{
          opacity: 0.6
        }}
      >
        {text || "Something went wrong! Unable to process request"}
      </TextComponent>
    </View>
  );
};

export default SomethingWentWrongContainer;
