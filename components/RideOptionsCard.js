import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: 0,
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: 1,
    title: "UberXL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: 2,
    title: "UberLUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// surge charge rate
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Choose a trip</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-8 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={[
                tw`bottom-2`,
                { width: 100, height: 100, resizeMode: "contain" },
              ]}
              source={{ uri: image }}
            />
            <View style={tw`-ml-2 w-1/2 left-2`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>
                {new Date(
                  Date.now() + travelTimeInformation?.duration.value * 1000
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}{" "}
                • {travelTimeInformation?.duration.text}
              </Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "CAD",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      ></FlatList>

      <View
        style={tw`flex flex-row justify-between mt-auto border-t border-gray-200 pt-3`}
      >
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 mx-3 flex-grow ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose{selected ? " " + selected.title : null}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-gray-200 py-3 mr-3 px-4 flex justify-center`}
        >
          <Icon name="clock" type="font-awesome-5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
