import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ReferralContainer from "@/components/_layouts/ReferralContainer";
import { backgroundColor, backgroundColorDark } from "@/assets/colors";
import ReferralCard from "@/components/_screens/referrals/ReferralCard";
import { AvatarImage, LoadingOne } from "@/assets/images";
import ScrollComponent from "@/components/_general/ScrollComponent";
import { useActionContext, useUserContext } from "@/context";
import { colorSchemes, nextLoadingSize, windowWidth } from "@/utils/_variables";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import useUser from "@/hooks/useUser";
import { isCloseToBottom, showToast } from "@/utils/functions";
import axios from "axios";
import { AllResponseType } from "@/api/index.d";
import { LinearReferralsExpectedDataType } from "@/reducers/userReducer";

const LinearReferrals: React.FC = () => {
  const { colorScheme } = useActionContext();
  const { linearReferrals, userDetails, setUserLinearReferrals } =
    useUserContext();
  const { fetchUserLinearReferrers } = useUser();
  const [nextLoading, setNextLoading] = useState(false);

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
          <>
            <ScrollComponent
              onScroll={(e) => {
                const closeToBottom = isCloseToBottom(e);
                if (linearReferrals.next && !nextLoading && closeToBottom) {
                  setNextLoading(true);
                  axios
                    .get<AllResponseType>(linearReferrals.next)
                    .then((res) => {
                      const response = res?.data;
                      const availableLinearReferrals =
                        linearReferrals.data || [];

                      const userLinearReferrals: LinearReferralsExpectedDataType =
                        {
                          data: [
                            ...availableLinearReferrals,
                            ...response?.users
                          ],
                          next: response?.links?.next || null,
                          total: response?.meta?.total || 0
                        };
                      setUserLinearReferrals(userLinearReferrals);
                    })
                    .catch((err) => {
                      showToast(
                        err?.response?.data?.message ||
                          err?.message ||
                          "Something went wrong while fetching other available referrals"
                      );
                    })
                    .finally(() => {
                      setNextLoading(false);
                    });
                }
              }}
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
          </>
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
