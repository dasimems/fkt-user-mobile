import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ReferralContainer from "@/components/_layouts/ReferralContainer";
import { backgroundColor, backgroundColorDark } from "@/assets/colors";
import ScrollComponent from "@/components/_general/ScrollComponent";
import {
  ReferralGenerations,
  allGenerations,
  colorSchemes,
  nextLoadingSize,
  windowWidth
} from "@/utils/_variables";
import GenerationCard from "@/components/_screens/referrals/GenerationCard";
import ReferralCard from "@/components/_screens/referrals/ReferralCard";
import { AvatarImage, LoadingOne } from "@/assets/images";
import { useActionContext, useUserContext } from "@/context";
import { AllResponseType, ReferralType } from "@/api/index.d";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import useUser from "@/hooks/useUser";
import { EmptyReferrersLottieAnimation } from "@/assets/lottie";
import { isCloseToBottom, showToast } from "@/utils/functions";
import axios from "axios";
import { LinearReferralsExpectedDataType } from "@/reducers/userReducer";

const AssistReferrals = () => {
  const { generationReferrals, userDetails, setUserAssistReferral } =
    useUserContext();
  const { fetchUserAssistReferrersStat, fetchUserAssistReferrers } = useUser();

  const [nextLoading, setNextLoading] = useState(false);
  const [activeReferralList, setActiveReferralList] = useState(
    ReferralGenerations.First
  );
  const [referrers, setReferrers] = useState<ReferralType[] | null>(null);
  const { colorScheme } = useActionContext();

  useEffect(() => {
    fetchUserAssistReferrersStat();
  }, []);

  useEffect(() => {
    if (
      generationReferrals[activeReferralList.value] &&
      !generationReferrals[activeReferralList.value]?.data
    ) {
      fetchUserAssistReferrers(activeReferralList.value);
    }
  }, [activeReferralList, generationReferrals]);

  useEffect(() => {
    const referrers =
      generationReferrals[activeReferralList.value]?.data || null;
    setReferrers(referrers);
  }, [activeReferralList, generationReferrals]);
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
      <View>
        <ScrollComponent
          horizontal
          style={{
            minHeight: 0,
            gap: 20
          }}
        >
          {allGenerations.map((data) => (
            <GenerationCard
              value={data.value}
              label={data.label}
              stat={generationReferrals[data.value]?.total || 0}
              onChange={() => {
                setActiveReferralList(data);
              }}
              isActive={data.value === activeReferralList.value}
              key={data.value}
            />
          ))}
        </ScrollComponent>
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: 20
        }}
      >
        {referrers ? (
          referrers.length < 1 ? (
            <EmptyContainer
              animation={EmptyReferrersLottieAnimation}
              containerStyle={{
                flex: 1
              }}
              text={`Sorry! You have no ${activeReferralList.label} referrals`}
            />
          ) : (
            <>
              <ScrollComponent
                onScroll={(e) => {
                  const closeToBottom = isCloseToBottom(e);
                  if (
                    generationReferrals &&
                    generationReferrals[activeReferralList.value] &&
                    generationReferrals[activeReferralList.value]?.next &&
                    !nextLoading &&
                    closeToBottom
                  ) {
                    setNextLoading(true);
                    axios
                      .get<AllResponseType>(
                        generationReferrals[activeReferralList.value]
                          .next as string
                      )
                      .then((res) => {
                        const response = res?.data || {};
                        const referrals = response?.users || [];
                        const availableLinearReferrals =
                          generationReferrals[activeReferralList.value].data ||
                          [];

                        let userGenerationReferrer: {
                          [name: string]: LinearReferralsExpectedDataType;
                        } = {
                          ...generationReferrals,
                          [activeReferralList.value]: {
                            ...generationReferrals[activeReferralList.value],
                            data: [...availableLinearReferrals, ...referrals],
                            next: response?.links?.next
                          }
                        };

                        setUserAssistReferral(userGenerationReferrer);
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
                {referrers.map(({ email, name, avatar }, index) => (
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
            {new Array(6).fill(0).map((_, index) => (
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
    </View>
  );
};

export default AssistReferrals;

const styles = StyleSheet.create({});
