import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

import NavOptions from "../components/NavOptions";
import NavFavouritesOrigin from "../components/NavFavouritesOrigin";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setOrigin(null));
      dispatch(setDestination(null));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          source={{ uri: "https://links.papareact.com/gzs" }}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />

        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          placeholder="Where From?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          minLength={2}
          enablePoweredByContainer={false}
        />

        <NavOptions />
        <NavFavouritesOrigin />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
