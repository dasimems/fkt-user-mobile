import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React, { useEffect, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import { useRoute, useIsFocused, useNavigation } from "@react-navigation/native";
import {
  blackColor,
  pendingColor,
  primaryColor,
  redColor,
  whiteColor
} from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import {
  colorSchemes,
  defaultIconProps,
  innerPadding,
  padding,
  windowWidth
} from "@/utils/_variables";
import { Download, Share2 } from "lucide-react-native";
import { useActionContext, useUserContext } from "@/context";
import { TransactionType, WithdrawalType } from "@/api/index.d";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import { formatText } from "@/utils/functions";

const Details: React.FC<{ title: string; value: string }> = ({
  title,
  value
}) => {
  const { colorScheme } = useActionContext();
  return (
    <View
      style={{
        paddingVertical: 25,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor:
          colorScheme === colorSchemes.dark
            ? whiteColor.opacity100
            : blackColor.opacity100,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        justifyContent: "space-between"
      }}
    >
      <TextComponent fontFamily={Poppins.semiBold.default}>
        {title}:
      </TextComponent>
      <TextComponent
        style={{
          opacity: 0.6
        }}
      >
        {value}
      </TextComponent>
    </View>
  );
};

const TransactionDetails = () => {
  const {
    params
  }: { params?: { type?: "debit" | "credit" | "pending"; id?: string } } =
    useRoute();
    const {goBack} = useNavigation();
  const { colorScheme } = useActionContext();
  const {transactions, balance} = useUserContext();
  const isFocused = useIsFocused();
  const [details, setDetails] = useState<
    (WithdrawalType & TransactionType) | null
  >(null);
  let textColor = pendingColor.default;
  let bgColor = pendingColor.opacity100;
  switch (params?.type?.toLowerCase()) {
    case "debit":
      textColor = redColor.default;
      bgColor = redColor.opacity100;
      break;
    case "credit":
      textColor = primaryColor.default;
      bgColor = primaryColor.opacity100;
      break;
    default:
      break;
  }

  useEffect(()=>{

    if(isFocused){
      if(params?.type && params?.id && transactions){

        if(params?.type?.toLowerCase() === "pending"){
          setDetails(balance?.withdrawal as (WithdrawalType & TransactionType))

        }else{

          const tDetails =  transactions.data?.find(transaction => transaction.id === params?.id)  as (WithdrawalType & TransactionType)
          setDetails(tDetails)
        }
      }else{
        goBack();
      }
    }

  }, [isFocused, params, transactions, balance])
  return (
    <LoggedInContainer
      hideNav
      header={
        <InnerScreenHeader
          rightContent={
            <View
              style={{
                backgroundColor: bgColor,
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderRadius: 10
              }}
            >
              <TextComponent
                fontSize={12}
                fontFamily={Poppins.semiBold.default}
                color={textColor}
              >
                {params?.type?.slice(0, 1).toUpperCase()}
                {params?.type?.slice(1)}
              </TextComponent>
            </View>
          }
        />
      }
      contentContainerStyle={{
        gap: 30
      }}
    >
      <View
        style={{
          alignItems: "center"
        }}
      >
        {details? <TextComponent
          textAlign="center"
          fontFamily={Poppins.bold.default}
          fontSize={windowWidth * 0.08}
        >
          {details?.amount?.display}
        </TextComponent>: <SkeletonLoader width={60} />}
        <TextComponent
          textAlign="center"
          style={{
            opacity: 0.6
          }}
        >
          Amount
        </TextComponent>
      </View>
      {details ? (
        <View>
          <Details title="Date" value={"30 Sunday April 2023"} />
          <Details title="Title" value={params?.type?.toLowerCase() === "pending"? "Pending withdrawal" :details?.title} />
          <Details title="Status" value={formatText(params?.type || "")} />
        </View>
      ) : (
        <View
          style={{
            gap: 10
          }}
        >
          {new Array(3).fill(0).map((_, index) => (
            <SkeletonLoader
              key={index}
              height={40}
              width={windowWidth - padding * 2 - innerPadding * 2}
            />
          ))}
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.actionStyle,
            borderColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity100
                : styles.actionStyle.borderColor
          }}
        >
          <Share2
            {...defaultIconProps}
            color={
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity600
                : blackColor.opacity600
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.actionStyle,
            borderColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity100
                : styles.actionStyle.borderColor
          }}
        >
          <Download
            {...defaultIconProps}
            color={
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity600
                : blackColor.opacity600
            }
          />
        </TouchableOpacity>
      </View>
    </LoggedInContainer>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  actionStyle: {
    width: 40,
    height: 40,
    borderRadius: 90000,
    borderWidth: 1,
    borderColor: blackColor.opacity100,
    alignItems: "center",
    justifyContent: "center"
  }
});
