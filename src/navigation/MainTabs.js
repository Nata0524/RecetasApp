// src/navigation/MainTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

// Screens
import CategoriesScreen from "../screens/CategoriesScreen";
import CountriesScreen from "../screens/CountriesScreen";
import RandomRecipeScreen from "../screens/RandomRecipeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen"; // ✅ nueva pantalla

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card },
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen
        name="Categorías"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Países"
        component={CountriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="flag" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Aleatoria"
        component={RandomRecipeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="shuffle" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Crear Receta"
        component={AddRecipeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
