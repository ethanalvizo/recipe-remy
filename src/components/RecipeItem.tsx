import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { DataStore } from "aws-amplify";
import { Recipe } from "../models";

const RecipeItem = ({ recipe }) => {
  const { id, name, description, steps }: Recipe = recipe;
  async function deleteRecipe(id: string) {
    const toDelete = await DataStore.query(Recipe, id);
    if (toDelete) DataStore.delete(toDelete);
  }

  return (
    <View key={id} onTouchStart={() => deleteRecipe(id)}>
      <View style={styles.contactBg}>
        <Text style={styles.contactText}>ID: {id}</Text>
        <Text style={styles.contactText}>Name: {name}</Text>
        <Text style={styles.contactText}>Description: {description}</Text>
        <Text style={styles.contactText}>Steps: {steps}</Text>
      </View>
    </View>
  );
};

export default RecipeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: { marginBottom: 10, padding: 7, backgroundColor: "#ddd" },
  heading: { fontWeight: "normal", fontSize: 40 },
  contactBg: { backgroundColor: "white" },
  contactText: { margin: 0, padding: 9, fontSize: 20 },
});
