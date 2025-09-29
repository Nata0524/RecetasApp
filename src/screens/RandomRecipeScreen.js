import React, { useEffect, useState } from "react";
import { ScrollView, Text, Image, StyleSheet, Button, View } from "react-native";
import { colors } from "../styles/theme";

export default function RandomRecipeScreen() {
  const [recipe, setRecipe] = useState(null);

  const fetchRandomRecipe = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals[0]))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  if (!recipe) return <Text style={styles.loading}>Cargando receta...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>

      <View style={styles.buttonContainer}>
        <Button title="🍀 Otra receta aleatoria" onPress={fetchRandomRecipe} color={colors.primary} />
      </View>

      <Text style={styles.subtitle}>Instrucciones:</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
  loading: { fontSize: 18, textAlign: "center", marginTop: 20, color: colors.text },
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", color: colors.primary, textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 18, marginTop: 15, fontWeight: "bold", color: colors.secondary },
  instructions: { fontSize: 16, marginTop: 5, textAlign: "justify", color: colors.text },
  buttonContainer: { marginVertical: 15 },
});
