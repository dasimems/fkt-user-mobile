import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import AssetList from "@/components/_screens/_general/AssetList";
import { useUserContext } from "@/context";
import { LoadingOne } from "@/assets/images";
import axios from "axios";
import { showToast } from "@/utils/functions";
import { AllResponseType } from "@/api/index.d";
import { AssetExpectedDataType } from "@/reducers/userReducer";
import { nextLoadingSize } from "@/utils/_variables";

const Assets = () => {
  const { assets, setUserAssets } = useUserContext();
  const [nextLoading, setNextLoading] = useState(false);
  return (
    <LoggedInContainer
      runOnScrollEnd={() => {
        if (assets.next && !nextLoading) {
          setNextLoading(true);
          axios
            .get<AllResponseType>(assets.next)
            .then((res) => {
              const response = res?.data;
              const availableAssets = assets.data || [];

              const userAssets: AssetExpectedDataType = {
                data: [...availableAssets, ...response?.assets],
                next: response?.links?.next || null,
                total: response?.meta?.total || 0
              };
              setUserAssets(userAssets);
            })
            .catch((err) => {
              showToast(
                err?.response?.data?.message ||
                  err?.message ||
                  "Something went wrong while fetching other available assets"
              );
            })
            .finally(() => {
              setNextLoading(false);
            });
        }
      }}
      contentContainerStyle={{
        minHeight: "100%"
      }}
    >
      <AssetList
        hideTitle
        emptyContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%"
        }}
      />
      {nextLoading && (
        <View
          style={{
            alignItems: "center",
            gap: 10,
            paddingTop: 20
          }}
        >
          <Image
            source={LoadingOne}
            style={{
              width: nextLoadingSize,
              height: nextLoadingSize,
              resizeMode: "contain"
            }}
          />
        </View>
      )}
    </LoggedInContainer>
  );
};

export default Assets;

const styles = StyleSheet.create({});
