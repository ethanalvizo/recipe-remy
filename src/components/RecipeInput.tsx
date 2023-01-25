import React, { useState } from "react";
import { Text, TextInput, Button, StyleSheet } from "react-native";

import { DataStore } from "aws-amplify";
import { Recipe } from "..//models";

const RecipeInput = () => {
  const initialState = { name: "", description: "", image: "", steps: [""] };
  const [formState, updateFormState] = useState(initialState);
  const [nextStep, setNextStep] = useState<string>("");

  async function createRecipe() {
    if (!formState.name && !formState.steps) return;
    await DataStore.save(new Recipe({ ...formState }));
    updateFormState(initialState);
    setNextStep("");
  }

  function onChangeText(key: string, value: string) {
    if (key === "steps") {
      updateFormState({ ...formState, [key]: [...formState.steps, value] });
      setNextStep(value);
    } else {
      updateFormState({ ...formState, [key]: value });
    }
  }
  return (
    <>
      {/* <Text style={styles.heading}> My Recipes </Text> */}
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
      <Button onPress={createRecipe} title="Add" />
    </>
  );
};

export default RecipeInput;

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
