import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import DashboardBalance from "@/components/_screens/dashboard/DashboardBalance";
import ReferralCard from "@/components/_screens/_general/ReferralCard";
import DashboardStats from "@/components/_screens/dashboard/DashboardStats";
import PendingWithdrawal from "@/components/_screens/_general/PendingWithdrawal";
import ProjectList from "@/components/_screens/_general/ProjectList";
import AssetList from "@/components/_screens/_general/AssetList";
import TransactionList from "@/components/_screens/_general/TransactionList";
import { useUserContext } from "@/context";
import VerifyAccount from "@/components/_screens/_general/VerifyAccount";

const Dashboard = () => {
  const { balance, userDetails } = useUserContext();
  console.log("user details", userDetails);
  return (
    <LoggedInContainer
      headerText="Welcome user"
      contentContainerStyle={{
        gap: 30
      }}
    >
      <View
        style={{
          gap: 20
        }}
      >
        <DashboardBalance />
        {userDetails && (
          <>
            {userDetails?.email_verified && userDetails?.phone_verified && (
              <ReferralCard />
            )}
            {(!userDetails?.email_verified || !userDetails?.phone_verified) && (
              <VerifyAccount />
            )}
          </>
        )}
      </View>
      <DashboardStats />

      {balance && balance?.withdrawal && (
        <PendingWithdrawal
          date={balance?.withdrawal?.created_at}
          amount={balance?.withdrawal?.amount?.display}
          id={balance?.withdrawal?.id}
        />
      )}
      <ProjectList max={3} />
      <AssetList max={3} />
      <TransactionList max={5} />
    </LoggedInContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
