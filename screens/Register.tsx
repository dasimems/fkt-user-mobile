import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React, { useCallback, useState } from "react";
import Container from "@/components/_layouts/Container";
import {
  ScreenNames,
  colorSchemes,
  defaultIconProps,
  generalError,
  padding,
  windowHeight
} from "@/utils/_variables";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TextComponent from "@/components/_general/TextComponent";
import {
  backgroundColorDark,
  blackColor,
  primaryColor,
  whiteColor
} from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import InputField from "@/components/_general/form/InputField";
import styles from "../utils/styles";
import ScrollComponent from "@/components/_general/ScrollComponent";
import Button from "@/components/_general/Button";
import { UserPlus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useActionContext, useUserContext } from "@/context";
import { SignupBodyType } from "@/api/index.d";
import { showToast, stripPhoneNumber, validateValues } from "@/utils/functions";
import { saveUserToken } from "@/localServices/function";
import { emailRegExp, phoneNumberRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { signupApi } from "@/api/url";
import { setHeaderAuthorization } from "@/api";
import useUser from "@/hooks/useUser";
import Moment from "moment";
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { setHeaderAuthorization2 } from "@/api/index2";

const Register = () => {
  const { colorScheme } = useActionContext();
  const { setToken, setUserDetails } = useUserContext();
  const { fetchUserDetails } = useUser();
  const { navigate } = useNavigation();
  const initialValue: SignupBodyType = {
    name: "",
    username: "",
    email: "",
    phone: "",
    referrer_code: "",
    community: "",
    assist_id: "",
    date_of_birth: "",
    password: "",
    password_confirmation: ""
  };
  const [loading, setLoading] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryItem | null>({
    code: "us",
    name: {},
    dial_code: "+1",
    flag: "🇺🇸"
  });
  const [showCountryCodeList, setShowCountryCodeList] = useState(false);
  const [formDetails, setFormDetails] = useState<SignupBodyType>({
    ...initialValue,
    date_of_birth: Moment().format("DD-MM-YYYY")
  });
  const [formDetailsErr, setFormDetailsErr] =
    useState<SignupBodyType>(initialValue);

  const registerUser = useCallback(() => {
    const { password, password_confirmation } = formDetails;
    const errors = validateValues(formDetails, {
      name: true as any,
      username: true as any,
      email: {
        required: true,
        regex: emailRegExp
      } as any,
      phone: {
        required: true,
        regex: phoneNumberRegExp
      } as any,
      date_of_birth: true as any,
      password: true as any,
      password_confirmation: true as any
    });

    if (errors) {
      setFormDetailsErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else if (password !== password_confirmation) {
      setFormDetailsErr((prevState) => ({
        ...prevState,
        password_confirmation: "Your password doesn't match"
      }));
    } else {
      const { phone: sentPhone, email, username } = formDetails;
      let phone = stripPhoneNumber(
        `${countryCode?.dial_code}${stripPhoneNumber(sentPhone)}`
      );
      setLoading(true);
      processRequest(signupApi, {
        ...formDetails,
        phone,
        email: email.toLowerCase(),
        username: username.toLowerCase()
      })
        .then((res) => {
          const response = res?.response?.authentication;
          const userToken = response?.token;
          const userDetails = response?.user;

          if (userToken) {
            setHeaderAuthorization(userToken);
            setHeaderAuthorization2(userToken);
            saveUserToken(userToken);
            setToken(userToken);
            fetchUserDetails();
            if (userDetails) {
              setUserDetails(userDetails);
            }
          } else {
            showToast("Invalid Request - Token error");
          }
        })
        .catch((err) => {
          showToast(err?.statusText || generalError);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [formDetails]);
  return (
    <Container
      safeView
      style={{
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? backgroundColorDark.default
            : whiteColor.default
      }}
    >
      <ScrollComponent
        style={{
          paddingVertical: 20,
          paddingHorizontal: padding,
          gap: 20
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            justifyContent: "space-between"
          }}
        >
          <TextComponent
            color={primaryColor.default}
            fontFamily={Poppins.semiBold.default}
          >
            Join us today!
          </TextComponent>

          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.Login.name as never);
            }}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 15,
              backgroundColor: primaryColor.default
            }}
          >
            <TextComponent color={whiteColor.default}>Login</TextComponent>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, gap: 20 }}>
          <InputField
            label="Full name"
            placeholder="E.g John Doe"
            value={formDetails.name}
            error={formDetailsErr.name}
            onChangeText={(name) => {
              setFormDetails((prevState) => ({
                ...prevState,
                name
              }));
              setFormDetailsErr((prevState) => ({
                ...prevState,
                name: ""
              }));
            }}
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Email"
            inputMode="email"
            keyboardType="email-address"
            placeholder="E.g example@example.com"
            value={formDetails.email}
            error={formDetailsErr.email}
            onChangeText={(email) => {
              setFormDetails((prevState) => ({
                ...prevState,
                email
              }));
              setFormDetailsErr((prevState) => ({
                ...prevState,
                email: ""
              }));
            }}
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Username"
            placeholder="E.g john"
            value={formDetails.username}
            error={formDetailsErr.username}
            onChangeText={(username) => {
              setFormDetails((prevState) => ({
                ...prevState,
                username
              }));
              setFormDetailsErr((prevState) => ({
                ...prevState,
                username: ""
              }));
            }}
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <KeyboardAvoidingView behavior="height" enabled>
            <CountryPicker
              style={{
                modal: {
                  height: windowHeight * 0.6
                }
              }}
              androidWindowSoftInputMode="pan"
              enableModalAvoiding
              searchMessage="Search country"
              lang="en"
              show={showCountryCodeList}
              onBackdropPress={() => {
                setShowCountryCodeList(false);
              }}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={(item) => {
                setCountryCode(item);
                setShowCountryCodeList(false);
              }}
            />
          </KeyboardAvoidingView>
          <InputField
            leftContent={
              <TouchableOpacity
                onPress={() => {
                  setShowCountryCodeList(true);
                }}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                  alignItems: "center",
                  flexDirection: "row",
                  ...styles.inputStyle,
                  backgroundColor:
                    colorScheme === colorSchemes.dark
                      ? whiteColor.opacity50
                      : styles.inputStyle.backgroundColor,
                  gap: 6,
                  minWidth: 60
                }}
              >
                <TextComponent fontSize={30}>{countryCode?.flag}</TextComponent>
                <TextComponent fontSize={17}>
                  {countryCode?.dial_code}
                </TextComponent>
              </TouchableOpacity>
            }
            label="Phone number"
            inputMode="tel"
            keyboardType="number-pad"
            placeholder="E.g 903-3663-4645"
            value={formDetails.phone}
            error={formDetailsErr.phone}
            onChangeText={(phone) => {
              setFormDetails((prevState) => ({
                ...prevState,
                phone
              }));
              setFormDetailsErr((prevState) => ({
                ...prevState,
                phone: ""
              }));
            }}
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />

          <DateTimePickerModal
            date={new Date()}
            isVisible={showDate}
            mode="date"
            onConfirm={(date) => {
              const date_of_birth = Moment(date).format("DD-MM-YYYY");
              setFormDetails((prevState) => ({
                ...prevState,
                date_of_birth
              }));
              setFormDetailsErr((prevState) => ({
                ...prevState,
                date_of_birth: ""
              }));
              setShowDate(false);
            }}
            onCancel={() => {
              setShowDate(false);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setShowDate(true);
            }}
          >
            <InputField
              editable={false}
              label="Date of birth"
              value={formDetails.date_of_birth}
              placeholder="DD-MM-YYYY"
              inputStyle={{
                ...styles.inputStyle,
                backgroundColor:
                  colorScheme === colorSchemes.dark
                    ? whiteColor.opacity50
                    : styles.inputStyle.backgroundColor
              }}
              error={formDetailsErr.date_of_birth}
            />
          </TouchableOpacity>

          <InputField
            label="Password"
            placeholder="*********"
            secureTextEntry
            value={formDetails.password}
            error={formDetailsErr.password}
            onChangeText={(password) => {
              setFormDetails((prevState) => ({
                ...prevState,
                password
              }));
              setFormDetailsErr((prevState) => ({
                ...prevState,
                password: ""
              }));
            }}
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Repeat Password"
            placeholder="*********"
            secureTextEntry
            value={formDetails.password_confirmation}
            error={formDetailsErr.password_confirmation}
            onChangeText={(password_confirmation) => {
              setFormDetails((prevState) => ({
                ...prevState,
                password_confirmation
              }));
              setFormDetailsErr((prevState) => ({
                ...prevState,
                password_confirmation: ""
              }));
            }}
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Assist code (optional)"
            placeholder="E.g XYWIGVZ"
            value={formDetails.assist_id}
            error={formDetailsErr.assist_id}
            onChangeText={(assist_id) => {
              setFormDetails((prevState) => ({
                ...prevState,
                assist_id
              }));
              setFormDetailsErr((prevState) => ({
                ...prevState,
                assist_id: ""
              }));
            }}
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Referral code (optional)"
            placeholder="E.g CYXUGDO"
            value={formDetails.referrer_code}
            error={formDetailsErr.referrer_code}
            onChangeText={(referrer_code) => {
              setFormDetails((prevState) => ({
                ...prevState,
                referrer_code
              }));
              setFormDetailsErr((prevState) => ({
                ...prevState,
                referrer_code: ""
              }));
            }}
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <Button
            loading={loading}
            action={registerUser}
            type="primary"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10
            }}
          >
            <TextComponent textAlign="center" color={whiteColor.default}>
              Register
            </TextComponent>
            <UserPlus {...defaultIconProps} color={whiteColor.default} />
          </Button>
        </View>
      </ScrollComponent>
    </Container>
  );
};

export default Register;
