import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import { colors } from "../styles/theme";

export default function CategoryCard({ title, img, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: img }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 15,
    margin: 8,
    flex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  image: { 
    width: "100%", 
    height: 120, 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15 
  },
  textContainer: { padding: 10 },
  title: { 
    fontSize: 16, 
    fontWeight: "600", 
    textAlign: "center", 
    color: colors.primary 
  },
});
