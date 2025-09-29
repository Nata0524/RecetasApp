import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CategoryCard from "../components/CategoryCard";
import { colors } from "../styles/theme";

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        renderItem={({ item }) => (
          <CategoryCard
            title={item.strCategory}
            img={item.strCategoryThumb}
            onPress={() =>
              navigation.navigate("Recetas", { category: item.strCategory })
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
