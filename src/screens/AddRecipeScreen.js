import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db, auth } from "../firebase"; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from "firebase/firestore";
import { colors } from "../styles/theme";

export default function AddRecipeScreen() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleAddRecipe = async () => {
    if (!title || !ingredients || !instructions) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      await addDoc(collection(db, "recipes"), {
        title,
        ingredients: ingredients.split(",").map(i => i.trim()),
        instructions,
        author: auth.currentUser ? auth.currentUser.uid : "anon"
      });
      Alert.alert("Éxito", "Receta guardada ✅");
      setTitle("");
      setIngredients("");
      setInstructions("");
    } catch (error) {
      console.error("Error al guardar receta: ", error);
      Alert.alert("Error", "No se pudo guardar la receta");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la receta</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ej: Arepa con queso"
      />

      <Text style={styles.label}>Ingredientes (separados por comas)</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Harina, Queso, Sal"
      />

      <Text style={styles.label}>Instrucciones</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Escribe los pasos..."
        multiline
      />

      <Button title="Guardar Receta" onPress={handleAddRecipe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background, 
  },
  label: { fontWeight: "bold", marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#fff",
  },
});
