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
      <View>
        <Text>{name}</Text>
        <Text>{description}</Text>
      </View>
      <View onTouchStart={() => deleteRecipe(id)}>
        <FontAwesomeIcon icon={faX} />
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
  },
});
