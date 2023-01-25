import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import RecipeInput from "./RecipeInput";
import RecipeItem from "./RecipeItem";

import { DataStore } from "aws-amplify";
import { Recipe } from "../models";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
    <View>
      <RecipeInput />
      {recipes.map((recipe: Recipe) => (
        <RecipeItem recipe={recipe} />
      ))}
    </View>
  );
};

export default Recipes;

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
