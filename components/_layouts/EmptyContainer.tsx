import { View, ViewStyle } from "react-native";
import TextComponent from "../_general/TextComponent";

const EmptyContainer: React.FC<{
  animation?: JSON;
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
      <TextComponent
        style={{
          opacity: 0.6
        }}
      >
        {text || "No data found"}
      </TextComponent>
    </View>
  );
};

export default EmptyContainer;
