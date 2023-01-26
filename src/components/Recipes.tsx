import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, ScrollView } from "react-native";
import RecipeInput from "./RecipeInput";
import RecipeItem from "./RecipeItem";

import { DataStore } from "aws-amplify";
import { Recipe } from "../models";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isAddingRecipe, setIsAddingRecipe] = useState<boolean>(false);

  async function fetchRecipes() {
    const result: Recipe[] = await DataStore.query(Recipe);
    setRecipes(result);
  }

  useEffect(() => {
    fetchRecipes();
    const subscription = DataStore.observe(Recipe).subscribe(() =>
      fetchRecipes()
    );
    return () => subscription.unsubscribe();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recipes</Text>
        <Button
          onPress={() => setIsAddingRecipe(!isAddingRecipe)}
          title={isAddingRecipe ? "Cancel" : "Add"}
          color={isAddingRecipe ? "red" : "green"}
        />
      </View>
      {isAddingRecipe && (
        <View style={styles.input}>
          <RecipeInput />
        </View>
      )}
      <ScrollView style={styles.recipes} showsVerticalScrollIndicator={false}>
        {recipes.map((recipe: Recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    padding: "1em",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    width: "100%",
    minHeight: "40%",
    maxHeight: "40%",
    display: "flex",
    flexDirection: "column",
    // overflow: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "0.5em",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerButton: {
    backgroundColor: "green",
  },
  input: {
    marginBottom: "0.5em",
  },
  recipes: {
    flex: 1,
  },
});
