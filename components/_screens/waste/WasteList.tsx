import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect } from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { primaryColor } from "@/assets/colors";
import WasteCard from "./WasteCard";
import useUser from "@/hooks/useUser";
import { useUserContext } from "@/context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import { ScreenNames } from "@/utils/_variables";

const WasteList: React.FC<{
  max?: number;
  showViewAll?: boolean;
  hideTitle?: boolean;
}> = ({ max, showViewAll, hideTitle }) => {
  const { getDonationList } = useUser();
  const { navigate } = useNavigation();
  const { donations, setDonationList } = useUserContext();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getDonationList();
    } else {
      // setDonationList();
      getDonationList();
    }
  }, [isFocused]);
  return (
    <View
      style={{
        gap: 20
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 20,
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        {!hideTitle && (
          <TextComponent fontFamily={Poppins.semiBold.default}>
            Donated wastes
          </TextComponent>
        )}

        {showViewAll && (
          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.ViewWaste.name as never);
            }}
          >
            <TextComponent color={primaryColor.default}>View all</TextComponent>
          </TouchableOpacity>
        )}
      </View>

      {!donations && (
        <View
          style={{
            paddingVertical: 30,
            alignItems: "center",
            gap: 6,
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color={primaryColor.default} />
        </View>
      )}
      {donations && donations.length < 1 && (
        <EmptyContainer
          // animation={EmptyReferrersLottieAnimation}
          containerStyle={{
            paddingVertical: 30,
            alignItems: "center",
            gap: 6,
            justifyContent: "center"
          }}
          text={`Sorry! You have donations made yet`}
        />
      )}

      {donations &&
        donations.length > 0 &&
        donations
          .slice(0, max)
          .map((data, index) => <WasteCard key={index} {...data} />)}
    </View>
  );
};

export default WasteList;

const styles = StyleSheet.create({});
