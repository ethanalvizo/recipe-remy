import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import Amplify from "@aws-amplify/core";
import config from "./src/aws-exports";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Recipes from "./src/components/Recipes";

Amplify.configure(config);

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export default function App() {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      width: dimensions.window.width,
      padding: "2.5%",
    },
    input: { marginBottom: 10, padding: 7, backgroundColor: "#ddd" },
    heading: { fontWeight: "normal", fontSize: 40 },
    contactBg: { backgroundColor: "white" },
    contactText: { margin: 0, padding: 9, fontSize: 20 },
  });
  return (
    <View style={styles.container}>
      <Recipes />
    </View>
  );
}
