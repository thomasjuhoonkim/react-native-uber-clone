import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

import { useNavigation } from "@react-navigation/native";
import MapScreen from "../screens/MapScreen";

const data = [
  {
    id: 0,
    icon: "home",
    location: "Home",
    destination: "5432 Fudge Terrace, Mississauga, ON, Canada",
    coordinates: {
      lat: 43.5553459,
      lng: -79.7303697,
    },
  },
  {
    id: 1,
    icon: "briefcase",
    location: "Work",
    destination: "750 Bay Street, Toronto, ON, Canada",
    coordinates: {
      lat: 43.6596769,
      lng: -79.38606109999999,
    },
  },
];

const NavFavourites = ({ type }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, destination, icon, coordinates } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => {
            dispatch(
              setOrigin({
                location: coordinates,
                description: destination,
              })
            );
            dispatch(setDestination(null));

            navigation.navigate("MapScreen");
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-400 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
