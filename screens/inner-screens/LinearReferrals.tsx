import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ReferralContainer from "@/components/_layouts/ReferralContainer";
import { backgroundColor, backgroundColorDark } from "@/assets/colors";
import ReferralCard from "@/components/_screens/referrals/ReferralCard";
import { AvatarImage } from "@/assets/images";
import ScrollComponent from "@/components/_general/ScrollComponent";
import { useActionContext, useUserContext } from "@/context";
import { colorSchemes, windowWidth } from "@/utils/_variables";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import useUser from "@/hooks/useUser";

const LinearReferrals: React.FC = () => {
  const { colorScheme } = useActionContext();
  const { linearReferrals, userDetails } = useUserContext();
  const { fetchUserLinearReferrers } = useUser();

  useEffect(() => {
    fetchUserLinearReferrers();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? backgroundColorDark.default
            : backgroundColor.default
      }}
    >
      {linearReferrals.data ? (
        linearReferrals.data.length < 1 ? (
          <EmptyContainer text="Sorry! You have no linear referrals" />
        ) : (
          <ScrollComponent
            style={{
              minHeight: 0
            }}
          >
            {linearReferrals.data.map(({ email, name, avatar }, index) => (
              <ReferralCard
                key={index}
                image={avatar}
                name={name}
                email={email}
              />
            ))}
          </ScrollComponent>
        )
      ) : (
        <View
          style={{
            gap: 20
          }}
        >
          {new Array(10).fill(0).map((_, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
              }}
            >
              <SkeletonLoader
                width={50}
                height={50}
                style={{
                  borderRadius: 9000
                }}
              />

              <View
                style={{
                  flex: 1,
                  gap: 7
                }}
              >
                <SkeletonLoader width={windowWidth * 0.4} />
                <SkeletonLoader />
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default LinearReferrals;

const styles = StyleSheet.create({});
