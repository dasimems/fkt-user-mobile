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
import { formatText, stripText } from "@/utils/functions";

const AssetCard: React.FC<{
  isDetails?: boolean;
  id: string;
  status: "active" | "seized";
  value: number;
  rate: string;
  amount: string;
  title: string;
  image: string;
}> = ({ isDetails, id, status, value, rate, amount, title, image }) => {
  const { navigate } = useNavigation();
  const { colorScheme } = useActionContext();
  const generalBackgroundColor =
    colorScheme === colorSchemes.dark
      ? primaryColor.default
      : primaryColor.opacity200;
  let statusColor = redColor.default;

  switch (status.toLowerCase()) {
    case "active":
      statusColor =
        colorScheme === colorSchemes.dark
          ? whiteColor.default
          : primaryColor.default;
    default:
      break;
  }
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
                navigate({
                  name: ScreenNames.AssetDetails.name,
                  params: {
                    id
                  }
                } as never);
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
                      : blackColor.default
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
            url={image}
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
            {isDetails ? title : stripText(title)}
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
              {value}
            </TextComponent>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3
              }}
            >
              <CheckSquare {...defaultIconProps} color={statusColor} />
              <TextComponent color={statusColor}>
                {formatText(status)}
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
              <TextComponent
                color={
                  colorScheme === colorSchemes.dark
                    ? whiteColor.default
                    : primaryColor.default
                }
              >
                {rate}
              </TextComponent>
              <MoveUp
                {...defaultIconProps}
                color={
                  colorScheme === colorSchemes.dark
                    ? whiteColor.default
                    : primaryColor.default
                }
              />
            </View>
            <TextComponent fontFamily={Poppins.semiBold.default}>
              {amount}
            </TextComponent>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssetCard;

const styles = StyleSheet.create({});
