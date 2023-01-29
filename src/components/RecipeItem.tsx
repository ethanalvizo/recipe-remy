import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";

import { DataStore } from "aws-amplify";
import { Recipe } from "../models";

const RecipeItem = ({ recipe }: any) => {
  const { id, name, description, steps }: Recipe = recipe;

  const [showSteps, setShowSteps] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [currName, setCurrName] = useState(name);
  const [currDescription, setCurrDescription] = useState(description);
  const [currSteps, setCurrSteps] = useState(steps);
  const [nextStep, setNextStep] = useState("");

  async function deleteRecipe() {
    const toDelete = await DataStore.query(Recipe, id);
    if (toDelete) DataStore.delete(toDelete);
  }

  async function updateRecipe() {
    const toUpdate = await DataStore.query(Recipe, id);
    const newRecipe = {
      name: currName,
      description: currDescription,
      steps: nextStep.length ? [...currSteps, nextStep] : [...currSteps],
    };

    if (toUpdate)
      DataStore.save(
        Recipe.copyOf(toUpdate, (updated) => {
          updated.name = newRecipe.name;
          updated.description = newRecipe.description;
          updated.steps = newRecipe.steps;
        })
      );

    setIsEditing(false);
  }

  return (
    <>
      <View key={id} style={styles.container}>
        {isEditing ? (
          <View style={styles.preview}>
            <TextInput
              style={styles.title}
              value={currName}
              onChangeText={(v) => setCurrName(v)}
            />

            <TextInput
              style={styles.description}
              value={currDescription}
              onChangeText={(v) => setCurrDescription(v)}
            />
          </View>
        ) : (
          <View
            style={styles.preview}
            onTouchStart={() => setShowSteps(!showSteps)}
          >
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        )}
        <View style={styles.editContainer}>
          {isEditing && (
            <View style={styles.delete} onTouchStart={() => deleteRecipe()}>
              <FontAwesomeIcon icon={faX} color="red" />
            </View>
          )}

          <View
            onTouchStart={() => {
              setIsEditing(!isEditing);
              setShowSteps(!isEditing);
            }}
            style={styles.edit}
          >
            <FontAwesomeIcon icon={faEdit} color="grey" />
          </View>
        </View>
      </View>
      <View style={styles.stepsContainer}>
        {showSteps &&
          currSteps &&
          currSteps.map((step, idx) => {
            if (isEditing)
              return (
                <TextInput
                  key={idx}
                  value={currSteps[idx]}
                  onChangeText={(v) => {
                    let newSteps = [...currSteps];
                    newSteps[idx] = v;
                    setCurrSteps(newSteps);
                  }}
                />
              );
            else return <Text key={idx}>{`${idx + 1}. ${step}`}</Text>;
          })}
        {isEditing && (
          <TextInput
            value={nextStep}
            onChangeText={(v) => setNextStep(v)}
            placeholder="New step.."
          />
        )}
      </View>
      {isEditing && (
        <Button title="Save" color={"green"} onPress={updateRecipe} />
      )}
    </>
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
    marginVertical: "0.25em",
  },
  stepsContainer: {
    marginLeft: "5%",
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
  editContainer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  edit: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "5px",
  },
  delete: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "5px",
    marginRight: "5px"
  },
});
