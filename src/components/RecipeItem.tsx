import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";

import { DataStore } from "aws-amplify";
import { Recipe } from "../models";

const RecipeItem = ({ recipe }) => {
  const { id, name, description, steps }: Recipe = recipe;

  async function deleteRecipe(id: string) {
    const toDelete = await DataStore.query(Recipe, id);
    if (toDelete) DataStore.delete(toDelete);
  }

  return (
    <View key={id} style={styles.container}>
      <View style={styles.preview}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View onTouchStart={() => deleteRecipe(id)} style={styles.delete}>
        <FontAwesomeIcon icon={faX} color="red" />
      </View>
    </View>
  );
};

export default RecipeItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: "0.5em",
  },
  preview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
  },
  delete: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "5px",
  },
});
