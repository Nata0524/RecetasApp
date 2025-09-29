import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

export default function CountryRecipesScreen({ route, navigation }) {
  const { country } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error("❌ Error cargando recetas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [country]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={{ marginTop: 10 }}>Cargando recetas de {country}...</Text>
      </View>
    );
  }

  if (!recipes.length) {
    return (
      <View style={styles.center}>
        <Text>No se encontraron recetas para {country}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detalle", { mealId: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.text}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF5E1",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    padding: 10,
    color: "#333",
  },
});
