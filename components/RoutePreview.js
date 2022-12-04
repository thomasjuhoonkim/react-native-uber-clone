import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { Polyline } from "react-native-maps";

const useInterval = (callback, delay) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const RoutePreview = ({ coordinates }) => {
  const shinePathRef = useRef(null);

  const [polylinePath, setPolylinePath] = useState([]);
  const [shinePath, setShinePath] = useState([]);
  const [shinePathOpacity, setShinePathOpacity] = useState(1);

  useInterval(() => animatePolyline(), 25);

  const animatePolyline = () => {
    if (polylinePath.length < coordinates.length) {
      setPolylinePath(coordinates.slice(0, polylinePath.length + 8));
    } else if (shinePath.length < coordinates.length) {
      setShinePath(coordinates.slice(0, shinePath.length + 8));
    } else if (shinePathOpacity > 0) {
      setShinePathOpacity((shinePathOpacity) => shinePathOpacity - 0.05);
    } else {
      setShinePath([]);
      setShinePathOpacity(1);
    }
  };

  return (
    <>
      <Polyline
        ref={shinePathRef}
        coordinates={shinePath}
        strokeWidth={3}
        strokeColor={`rgba(180, 180, 180, ${shinePathOpacity})`}
      />
      <Polyline
        coordinates={polylinePath}
        strokeWidth={3}
        strokeColor="black"
      />
    </>
  );
};

export default RoutePreview;

const styles = StyleSheet.create({});
