import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image as RNImage,
  useColorScheme
} from "react-native";
import React from "react";
import {
  backgroundColor,
  backgroundColorDark,
  primaryColor,
  redColor,
  whiteColor
} from "@/assets/colors";
import Image from "@/components/_general/Image";
import { CardCurveDarkOne, CardCurveOne, ProjectImage } from "@/assets/images";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import {
  ArrowUpRight,
  CheckSquare,
  MessageCircle,
  MoveUp
} from "lucide-react-native";
import {
  ScreenNames,
  colorSchemes,
  defaultIconProps,
  windowWidth
} from "@/utils/_variables";
import { blackColor } from "../../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { useActionContext } from "@/context";

const AssetCard: React.FC<{ isDetails?: boolean }> = ({ isDetails }) => {
  const { navigate } = useNavigation();
  const { colorScheme } = useActionContext();
  const generalBackgroundColor =
    colorScheme === colorSchemes.dark
      ? primaryColor.default
      : primaryColor.opacity200;
  return (
    <View
      style={{
        backgroundColor: generalBackgroundColor,
        borderRadius: 20
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0
        }}
      >
        <RNImage
          source={
            colorScheme === colorSchemes.dark ? CardCurveDarkOne : CardCurveOne
          }
          style={{
            top: "-9%",
            height: 30,
            width: 20,
            left: "-14%",
            position: "absolute",
            resizeMode: "contain"
          }}
        />
        <RNImage
          source={
            colorScheme === colorSchemes.dark ? CardCurveDarkOne : CardCurveOne
          }
          style={{
            bottom: "-38%",
            height: 30,
            width: 20,
            right: 0,
            position: "absolute",
            resizeMode: "contain"
          }}
        />
        <View
          style={{
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? backgroundColorDark.default
                : backgroundColor.default,
            borderBottomLeftRadius: 30
            // borderWidth: 1
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (isDetails) {
              } else {
                navigate(ScreenNames.AssetDetails.name as never);
              }
            }}
            style={{
              paddingBottom: 20,
              paddingLeft: 20
            }}
          >
            {isDetails ? (
              <MessageCircle
                {...defaultIconProps}
                size={25}
                color={
                  colorScheme === colorSchemes.dark
                    ? whiteColor.opacity600
                    : blackColor.opacity600
                }
              />
            ) : (
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: generalBackgroundColor,
                  borderRadius: 9000,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <TextComponent>View more</TextComponent>
                <ArrowUpRight
                  {...defaultIconProps}
                  color={
                    colorScheme === colorSchemes.dark
                      ? whiteColor.default
                      : whiteColor.default
                  }
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          gap: 20
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10
          }}
        >
          <Image
            image={ProjectImage}
            type="round"
            innerPadding={3}
            imageStyle={{
              borderRadius: 9000
            }}
          />
          <TextComponent
            fontFamily={Poppins.semiBold.default}
            style={{
              maxWidth: isDetails ? "68%" : "45%"
            }}
          >
            {isDetails ? "The first dummy project" : "The first dummy...."}
          </TextComponent>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            justifyContent: "space-between"
          }}
        >
          <View>
            <TextComponent fontFamily={Poppins.semiBold.default}>
              10
            </TextComponent>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3
              }}
            >
              <CheckSquare
                {...defaultIconProps}
                color={
                  colorScheme === colorSchemes.dark
                    ? whiteColor.default
                    : primaryColor.default
                }
              />
              <TextComponent
                color={
                  colorScheme === colorSchemes.dark
                    ? whiteColor.default
                    : primaryColor.default
                }
              >
                Active
              </TextComponent>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3
              }}
            >
              <TextComponent color={primaryColor.default}>200%</TextComponent>
              <MoveUp {...defaultIconProps} color={primaryColor.default} />
            </View>
            <TextComponent fontFamily={Poppins.semiBold.default}>
              $20.00
            </TextComponent>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssetCard;

const styles = StyleSheet.create({});
