import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProviderType } from "@/utils/types";
import {
  ActionProvider,
  FormProvider,
  NavigationProvider,
  UserProvider
} from "@/context";
import { PaperProvider } from "react-native-paper";
import { ChatProvider } from "@/context/ChatContext";

const Providers: React.FC<ProviderType> = ({ children }) => {
  return (
    <PaperProvider>
      <FormProvider>
        <ActionProvider>
          <UserProvider>
            <ChatProvider>
              <NavigationProvider>{children}</NavigationProvider>
            </ChatProvider>
          </UserProvider>
        </ActionProvider>
      </FormProvider>
    </PaperProvider>
  );
};

export default Providers;

const styles = StyleSheet.create({});
