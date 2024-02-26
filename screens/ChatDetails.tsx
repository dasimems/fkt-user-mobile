import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import Image from "@/components/_general/Image";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { useNavigation } from "@react-navigation/native";
import { Menu } from "react-native-paper";
import { Ban, Flag, MoreVertical, Send, Trash2 } from "lucide-react-native";
import { colorSchemes, defaultIconProps, padding } from "@/utils/_variables";
import HeaderDropdownButton from "@/components/_general/HeaderDropdownButton";
import { AvatarImage } from "@/assets/images";
import InputField from "@/components/_general/form/InputField";
import ScrollComponent from "@/components/_general/ScrollComponent";
import ChatDetailsCard from "@/components/_screens/chats/ChatDetailsCard";
import { ArrowLeft2 } from "iconsax-react-native";
import { useActionContext } from "@/context";

const ChatHeader: React.FC<{
  image: ImageSourcePropType;
  name: string;
  lastSeen: string;
  id: string;
  isOnline?: boolean;
}> = ({ image, name, lastSeen, id, isOnline }) => {
  const defaultBorderRadius = 30;
  const defaultIconSize = 25;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const { colorScheme } = useActionContext();
  const { goBack } = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: padding
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderBottomWidth: 1,
          paddingVertical: 20,
          borderColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity100
        }}
      >
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft2
            {...defaultIconProps}
            size={30}
            color={
              colorScheme === colorSchemes.dark
                ? whiteColor.default
                : blackColor.default
            }
          />
        </TouchableOpacity>
        <View>
          <Image
            image={image}
            type="round"
            innerPadding={3}
            imageStyle={{
              borderRadius: 9000
            }}
          />
          {isOnline && (
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: primaryColor.default,
                borderRadius: 9000,
                position: "absolute",
                right: 0,
                bottom: 4
              }}
            ></View>
          )}
        </View>
        <View
          style={{
            flex: 1
          }}
        >
          <TextComponent fontFamily={Poppins.semiBold.default}>
            {name}
          </TextComponent>
          <TextComponent style={{ opacity: 0.6 }}>{lastSeen}</TextComponent>
        </View>

        <View>
          <Menu
            contentStyle={{
              top: defaultIconSize + 10,
              backgroundColor: whiteColor.default,
              borderRadius: 15
            }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                {
                  <MoreVertical
                    {...defaultIconProps}
                    size={defaultIconSize}
                    color={
                      colorScheme === colorSchemes.dark
                        ? whiteColor.opacity600
                        : blackColor.opacity600
                    }
                  />
                }
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => {
                closeMenu();
              }}
              title={<HeaderDropdownButton Icon={Trash2} label="Delete" />}
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
              }}
              title={<HeaderDropdownButton Icon={Ban} label="Block" />}
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
              }}
              title={<HeaderDropdownButton Icon={Flag} label="Report" />}
            />
          </Menu>
        </View>
      </View>
    </View>
  );
};

const ChatDetails = () => {
  return (
    <LoggedInContainer
      unScrollable
      hideNav
      header={
        <ChatHeader
          name="Duyil Ayomid"
          id=""
          image={AvatarImage}
          lastSeen="Just now"
        />
      }
      contentContainerStyle={{
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 0
      }}
    >
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollComponent
          style={{
            minHeight: 0,
            paddingVertical: 20,
            paddingHorizontal: padding
          }}
        >
          {new Array(6).fill(0).map((_, index) => (
            <ChatDetailsCard
              key={index}
              message="Testing message"
              time="8:19pm"
              isSender={index % 2 === 0}
            />
          ))}
        </ScrollComponent>
      </View>

      <View
        style={{
          paddingHorizontal: padding,
          paddingBottom: 20
        }}
      >
        <InputField
          multiline
          inputStyle={{
            paddingVertical: 8,
            borderRadius: 25,
            textAlignVertical: "top",
            maxHeight: 150
          }}
          rightIcon={
            <Send {...defaultIconProps} color={primaryColor.default} />
          }
          rightIconStyle={{
            paddingHorizontal: 15
          }}
          placeholder="Type your message here..."
        />
      </View>
    </LoggedInContainer>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({});
