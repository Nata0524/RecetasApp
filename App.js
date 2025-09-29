import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";
import { FavoritesProvider } from "./src/context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
