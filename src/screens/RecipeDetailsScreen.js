import React, { useEffect, useState, useContext } from "react";
import { ScrollView, Text, Image, StyleSheet, Button, View } from "react-native";
import { colors } from "../styles/theme";
import { FavoritesContext } from "../context/FavoritesContext";

export default function RecipeDetailsScreen({ route }) {
  const { idMeal } = route.params;
  const [recipe, setRecipe] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals[0]));
  }, [idMeal]);

  if (!recipe) return <Text>Cargando...</Text>;

  // ingredientes
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>

      {/* Botón de favoritos */}
      <View style={styles.buttonContainer}>
        <Button
          title={isFavorite(recipe.idMeal) ? "⭐ Quitar de Favoritos" : "⭐ Agregar a Favoritos"}
          color={isFavorite(recipe.idMeal) ? "red" : colors.primary}
          onPress={() =>
            isFavorite(recipe.idMeal)
              ? removeFavorite(recipe.idMeal)
              : addFavorite(recipe)
          }
        />
      </View>

      <Text style={styles.subtitle}>Ingredientes:</Text>
      {ingredients.map((ing, index) => (
        <Text key={index} style={styles.ingredient}>• {ing}</Text>
      ))}

      <Text style={styles.subtitle}>Instrucciones:</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
  image: { width: "100%", height: 220, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", color: colors.primary },
  subtitle: { fontSize: 18, marginTop: 15, fontWeight: "bold" },
  ingredient: { fontSize: 16, marginLeft: 10, marginTop: 4, color: colors.text },
  instructions: { fontSize: 16, marginTop: 10, textAlign: "justify" },
  buttonContainer: { marginVertical: 10 },
});

