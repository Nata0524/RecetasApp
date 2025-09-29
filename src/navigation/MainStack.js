import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import CategoryRecipesScreen from "../screens/CategoryRecipesScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import CountryRecipesScreen from "../screens/CountryRecipesScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inicio"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Recetas" component={CategoryRecipesScreen} />
      <Stack.Screen name="Detalle de Receta" component={RecipeDetailsScreen} />
      <Stack.Screen name="Recetas por País" component={CountryRecipesScreen} />
    </Stack.Navigator>
  );
}
