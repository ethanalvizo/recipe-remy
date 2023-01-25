import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import Amplify from "@aws-amplify/core";
import config from "./src/aws-exports";
import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { Recipe } from "./src/models";

Amplify.configure(config);

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const initialState = { name: "", description: "", image: "", steps: [""] };
  const [formState, updateFormState] = useState(initialState);
  const [nextStep, setNextStep] = useState<string>("");

  async function createRecipe() {
    if (!formState.name && !formState.steps) return;
    await DataStore.save(new Recipe({ ...formState }));
    updateFormState(initialState);
    setNextStep("");
  }

  async function deleteRecipe(id: string) {
    const toDelete = await DataStore.query(Recipe, id);
    if (toDelete) DataStore.delete(toDelete);
  }

  async function fetchRecipes() {
    const result: Recipe[] = await DataStore.query(Recipe);
    setRecipes(result);
  }

  function onChangeText(key: string, value: string) {
    if (key === "steps") {
      updateFormState({ ...formState, [key]: [...formState.steps, value] });
      setNextStep(value);
    } else {
      updateFormState({ ...formState, [key]: value });
    }
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
      <Text style={styles.heading}> My Recipes </Text>
      <TextInput
        onChangeText={(v) => onChangeText("name", v)}
        placeholder="Name"
        value={formState.name}
        style={styles.input}
      />
      <TextInput
        onChangeText={(v) => onChangeText("description", v)}
        placeholder="Description"
        value={formState.description}
        style={styles.input}
      />
      <TextInput
        onChangeText={(v) => onChangeText("steps", v)}
        placeholder="Steps"
        value={nextStep}
        style={styles.input}
      />
      <Button onPress={createRecipe} title="Create Recipe" />
      {recipes.map((recipe: Recipe) => (
        <View key={recipe.id} onTouchStart={() => deleteRecipe(recipe.id)}>
          <View style={styles.contactBg}>
            <Text style={styles.contactText}>ID: {recipe.id}</Text>
            <Text style={styles.contactText}>Name: {recipe.name}</Text>
            <Text style={styles.contactText}>
              Description: {recipe.description}
            </Text>
            <Text style={styles.contactText}>Steps: {recipe.steps}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

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
