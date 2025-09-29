import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CategoryCard from "../components/CategoryCard";
import { colors } from "../styles/theme";

export default function CategoryRecipesScreen({ route, navigation }) {
  const { category } = route.params;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals));
  }, [category]);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        renderItem={({ item }) => (
          <CategoryCard
            title={item.strMeal}
            img={item.strMealThumb}
            onPress={() =>
              navigation.navigate("Detalle de Receta", { idMeal: item.idMeal })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
});
