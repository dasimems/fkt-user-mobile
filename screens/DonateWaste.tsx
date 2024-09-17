import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import TextComponent from "@/components/_general/TextComponent";
import SelectBox from "@/components/_general/form/SelectBox";
import { SelectBoxOptionType } from "@/utils/types";
import InputField from "@/components/_general/form/InputField";
import Checkbox from "@/components/_general/form/Checkbox";
import Button from "@/components/_general/Button";
import { blackColor, redColor, whiteColor } from "@/assets/colors";
import { showToast, validateValues } from "@/utils/functions";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef
} from "react-native-google-places-autocomplete";
import { processRequest2 } from "@/api/function2";
import useUser from "@/hooks/useUser";
import { donateWasteApi } from "@/api/url";
import { colorSchemes } from "@/utils/_variables";
import { useActionContext } from "@/context";
const wasteCategoryData: SelectBoxOptionType[] = [
  {
    key: "Food waste",
    value: "food_waste"
  },
  {
    key: "Farm waste",
    value: "farm_waste"
  },
  {
    key: "Brewy waste",
    value: "brewy_waste"
  },
  {
    key: "Others",
    value: "other_waste"
  }
];

const initialValue = {
  category: "",
  weight: "",
  pickup_location: "",
  lat: null,
  long: null,
  checked_radio_button: "now"
};

const DonateWaste = () => {
  const { colorScheme } = useActionContext();
  const [formData, setFormData] = useState(initialValue);
  const [formDataErr, setFormDataErr] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const { getDonationList } = useUser();

  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  const setPickUpLocation = useCallback((location: string) => {
    if (location) {
      const placesSearchElement = ref?.current;

      if (placesSearchElement) {
        placesSearchElement.setAddressText(location);
      }
    }
  }, []);

  const processForm = useCallback(() => {
    const errors = validateValues(formData, {
      category: {
        required: {
          value: true,
          message: "Please select a category"
        }
      },
      weight: {
        required: {
          value: true,
          message: "Please provide the weight of the waste"
        }
      },
      pickup_location: {
        required: {
          value: true,
          message: "Please provide the location of pickup"
        }
      }
    });

    if (errors) {
      setFormDataErr((prevState) => ({
        ...prevState,
        ...errors
      }));
      return;
    }

    setLoading(true);
    processRequest2(donateWasteApi, formData)
      .then(() => {
        getDonationList();
        setFormData(initialValue);
        setFormDataErr(initialValue);
      })
      .catch((err) => {
        showToast(err?.statusText);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formData]);
  return (
    <LoggedInContainer
      hideNav
      header={<InnerScreenHeader />}
      contentContainerStyle={{
        gap: 30
      }}
    >
      <TextComponent
        style={{
          opacity: 0.6
        }}
      >
        Fill in the below information
      </TextComponent>

      <View
        style={{
          gap: 20
        }}
      >
        <SelectBox
          search={false}
          onChange={(category) => {
            setFormData((prevState) => ({
              ...prevState,
              category
            }));
            setFormDataErr((prevState) => ({
              ...prevState,
              category: ""
            }));
          }}
          error={formDataErr?.category}
          label="Waste Category"
          data={wasteCategoryData}
        />

        <InputField
          onChangeText={(weight) => {
            setFormData((prevState) => ({
              ...prevState,
              weight
            }));
            setFormDataErr((prevState) => ({
              ...prevState,
              weight: ""
            }));
          }}
          error={formDataErr?.weight}
          label="Weight (KG)"
          placeholder="Weight of the waste"
          inputMode="tel"
          keyboardType="phone-pad"
        />

        <View
          style={{
            gap: 3,
            zIndex: 99
          }}
        >
          <TextComponent>Pickup location</TextComponent>
          <GooglePlacesAutocomplete
            placeholder="Pickup location"
            fetchDetails
            ref={ref}
            listViewDisplayed={false}
            onPress={(data, details = null) => {
              console.log("clicked");
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setFormData((prevState) => ({
                ...prevState,
                pickup_location: data?.description ?? ""
              }));
              setPickUpLocation(data?.description);
            }}
            styles={{
              textInputContainer: {
                position: "relative"
              },
              textInput: {
                backgroundColor: "transparent",
                borderColor: formDataErr?.pickup_location
                  ? redColor.opacity300
                  : colorScheme === colorSchemes.dark
                  ? whiteColor.opacity200
                  : blackColor.opacity200,
                borderWidth: 1,
                paddingVertical: 15,
                height: "auto",
                borderRadius: 10,
                paddingHorizontal: 15,
                zIndex: 99
              }
            }}
            query={{
              key: "AIzaSyDk6tM6q5dXWQ5i7HtQ5k5OXT6CMMfq3nQ",
              language: "en"
            }}
          />
          <TextComponent
            style={{
              color: redColor.opacity600
            }}
          >
            {formDataErr?.pickup_location}
          </TextComponent>
        </View>
        <View
          style={{
            gap: 3
          }}
        >
          <TextComponent>Pick up time</TextComponent>
          <Checkbox checked label="Now" onChange={() => {}} />
        </View>
        <Button loading={loading} action={processForm} type="primary">
          <TextComponent textAlign="center" color={whiteColor.default}>
            Donate
          </TextComponent>
        </Button>
      </View>
    </LoggedInContainer>
  );
};

export default DonateWaste;

const styles = StyleSheet.create({});
