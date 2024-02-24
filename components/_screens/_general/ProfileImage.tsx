import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Image from "@/components/_general/Image";
import { useUserContext } from "@/context";
import { AvatarImage } from "@/assets/images";
import { ProfileImageType } from "@/utils/types";

const ProfileImage: React.FC<ProfileImageType> = ({ size }) => {
  const { userDetails } = useUserContext();
  return (
    <Image
      type="round"
      innerPadding={3}
      url={userDetails?.profile_image}
      width={size}
      height={size}
      image={AvatarImage}
      imageStyle={{
        borderRadius: 9000
      }}
    />
  );
};

export default ProfileImage;

const styles = StyleSheet.create({});
