import {
  ColorValue,
  StyleSheet,
  Text,
  View,
  useColorScheme
} from "react-native";
import React from "react";
import { Banknote } from "lucide-react-native";
import { colorSchemes, defaultIconProps } from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor, redColor, whiteColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import { primaryColor } from "../../../assets/colors";
import { useActionContext, useUserContext } from "@/context";
import SkeletonLoader from "@/components/_general/SkeletonLoader";

const WalletStatCard: React.FC<{
  color: ColorValue;
  title: string;
  value?: string;
  loading?: boolean;
}> = ({ color, title, value, loading }) => {
  const { colorScheme } = useActionContext();
  return (
    <View
      style={{
        gap: 20,
        borderRadius: 15,
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? blackColor.default
            : whiteColor.default,
        padding: 20,
        flex: 1 / 2
      }}
    >
      <Banknote {...defaultIconProps} color={color} />

      <View
        style={{
          gap: 1
        }}
      >
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          {title}
        </TextComponent>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <TextComponent fontFamily={Poppins.semiBold.default}>
            {value || ""}
          </TextComponent>
        )}
      </View>
    </View>
  );
};

const WalletStat = () => {
  const { colorScheme } = useActionContext();
  const { balance } = useUserContext();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "stretch",
        gap: 20
      }}
    >
      <WalletStatCard
        loading={!balance}
        color={
          colorScheme === colorSchemes.dark
            ? whiteColor.default
            : primaryColor.default
        }
        title="Credit dismount"
        value={balance?.credits?.display}
      />
      <WalletStatCard
        loading={!balance}
        color={redColor.default}
        title="Debit dismount"
        value="$30,000"
      />
    </View>
  );
};

export default WalletStat;

const styles = StyleSheet.create({});
