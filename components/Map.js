import { StyleSheet, Text, View, Image } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";

import MapView, { Marker, Polyline } from "react-native-maps";

import { decode } from "polyline";
// import simplify from "simplify-js";
import RoutePreview from "./RoutePreview";
import { GOOGLE_MAPS_API_KEY } from "@env";

import { useSelector, useDispatch } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";

import Origin from "../assets/Origin.png";
import Destination from "../assets/Destination.png";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();

  const mapRef = useRef(null);

  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    if (!origin) return;

    if (!destination) {
      mapRef.current.fitToSuppliedMarkers(["origin"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
      setCoordinates([]);
      return;
    }

    // ============= when both origin and destination exist ===============

    // fetchPolyline
    const getPolyline = async () => {
      const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.location.lat}, ${origin.location.lng}&destination=${destination.location.lat} ${destination.location.lng}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(URL);
      const data = await response.json();
      const encodedPolyline = decode(data.routes[0].overview_polyline.points);
      const parsedPolyline = encodedPolyline.map((pair) => ({
        latitude: pair[0],
        longitude: pair[1],
      }));
      setCoordinates(parsedPolyline);

      // Zoom out and fit all coordinates
      mapRef.current.fitToCoordinates(parsedPolyline, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    };

    // fetch polyline
    getPolyline();
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.location.lat},${origin.location.lng}&destinations=${destination.location.lat},${destination.location.lng}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(URL);
      const data = await response.json();
      dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
    };

    getTravelTime();
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && <RoutePreview coordinates={coordinates} />}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        >
          <Image source={Origin} style={{ height: 15, width: 15 }} />
        </Marker>
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Origin"
          description={destination.description}
          identifier="destination"
        >
          <Image source={Destination} style={{ height: 15, width: 15 }} />
        </Marker>
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
