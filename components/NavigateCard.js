import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete/GooglePlacesAutocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavouritesDestination from "./NavFavouritesDestination";

import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     dispatch(setDestination(null));
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Hello, Thomas</Text>
      <View style={tw`border-t-2 border-gray-300 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            textInputProps={{
              placeholderTextColor: "black",
            }}
            styles={toInputBoxStyles}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            enablePoweredByContainer={false}
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>

        <NavFavouritesDestination />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row justify-between bg-white w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBotton: 0,
  },
});
