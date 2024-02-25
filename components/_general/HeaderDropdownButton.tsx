import { defaultIconProps } from "@/utils/_variables";
import { LucideIcon } from "lucide-react-native";
import { View } from "react-native";
import TextComponent from "./TextComponent";

const HeaderDropdownButton: React.FC<{ Icon: LucideIcon; label: string }> = ({
  Icon,
  label
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 3
      }}
    >
      {Icon && <Icon {...defaultIconProps} />}
      <TextComponent>{label}</TextComponent>
    </View>
  );
};

export default HeaderDropdownButton;
