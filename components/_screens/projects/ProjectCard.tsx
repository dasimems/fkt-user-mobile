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
import {
  AvatarImage,
  CardCurveDarkOne,
  CardCurveOne,
  CoinImage,
  ProjectImage
} from "@/assets/images";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import {
  ArrowUpRight,
  CheckSquare,
  Component,
  Download,
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

const ProjectCard: React.FC<{
  isDetails?: boolean;
  name: string;
  date: Date;
  image: string;
  images: string[];
  amount: string;
  status: string;
  id: string;
  total: number;
}> = ({ isDetails, name, date, image, images, amount, status, total, id }) => {
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
                  name: ScreenNames.ProjectDetails.name,
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
              <Download
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
                  alignItems: "center",
                  gap: 2
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
          gap: 25
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
          <View
            style={{
              maxWidth: isDetails ? "68%" : "45%"
            }}
          >
            <TextComponent
              style={{
                flex: 1
              }}
              fontFamily={Poppins.semiBold.default}
            >
              {isDetails ? name : stripText(name)}
            </TextComponent>
            <TextComponent>2023-04-13</TextComponent>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity100
                : blackColor.opacity100
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3
            }}
          >
            <CoinImage width={15} height={15} />
            <TextComponent
              fontFamily={Poppins.medium.default}
              style={{
                marginTop: 4
              }}
            >
              {total}
            </TextComponent>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TextComponent
              style={{
                marginTop: 4
              }}
              fontFamily={Poppins.medium.default}
            >
              {amount}/
            </TextComponent>

            <CoinImage width={15} height={15} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch",
            gap: 20,
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              ...styles.footerContentStyle,
              borderRightWidth: 1,
              borderRightColor: blackColor.opacity200,
              alignItems: "flex-start"
            }}
          >
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
          <View
            style={{
              ...styles.footerContentStyle,
              borderRightWidth: 1,
              borderRightColor: blackColor.opacity200,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                marginLeft: -20
              }}
            >
              <Component
                {...defaultIconProps}
                color={
                  colorScheme === colorSchemes.dark
                    ? whiteColor.default
                    : blackColor.default
                }
              />
            </View>
          </View>
          <View
            style={{
              ...styles.footerContentStyle,
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
          >
            {images.map((image) => (
              <Image
                key={image}
                url={image}
                image={ProjectImage}
                type="round"
                innerPadding={3}
                height={30}
                width={30}
                imageStyle={{
                  borderRadius: 9000
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProjectCard;

const styles = StyleSheet.create({
  footerContentStyle: {
    width: "30%",
    justifyContent: "center"
  },
  userImagesStyle: {
    marginLeft: -10
  }
});
