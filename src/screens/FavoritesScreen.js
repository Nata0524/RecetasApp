import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import CategoryCard from "../components/CategoryCard";
import { FavoritesContext } from "../context/FavoritesContext";
import { colors } from "../styles/theme";

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No tienes recetas favoritas aún ⭐</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
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
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: colors.text },
});
