import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";

const FLAGS = {
  American: "https://flagcdn.com/w320/us.png",
  British: "https://flagcdn.com/w320/gb.png",
  Canadian: "https://flagcdn.com/w320/ca.png",
  Chinese: "https://flagcdn.com/w320/cn.png",
  Croatian: "https://flagcdn.com/w320/hr.png",
  Dutch: "https://flagcdn.com/w320/nl.png",
  Egyptian: "https://flagcdn.com/w320/eg.png",
  Filipino: "https://flagcdn.com/w320/ph.png",
  French: "https://flagcdn.com/w320/fr.png",
  Greek: "https://flagcdn.com/w320/gr.png",
  Indian: "https://flagcdn.com/w320/in.png",
  Irish: "https://flagcdn.com/w320/ie.png",
  Italian: "https://flagcdn.com/w320/it.png",
  Jamaican: "https://flagcdn.com/w320/jm.png",
  Japanese: "https://flagcdn.com/w320/jp.png",
  Kenyan: "https://flagcdn.com/w320/ke.png",
  Malaysian: "https://flagcdn.com/w320/my.png",
  Mexican: "https://flagcdn.com/w320/mx.png",
  Moroccan: "https://flagcdn.com/w320/ma.png",
  Polish: "https://flagcdn.com/w320/pl.png",
  Portuguese: "https://flagcdn.com/w320/pt.png",
  Russian: "https://flagcdn.com/w320/ru.png",
  Spanish: "https://flagcdn.com/w320/es.png",
  Thai: "https://flagcdn.com/w320/th.png",
  Tunisian: "https://flagcdn.com/w320/tn.png",
  Turkish: "https://flagcdn.com/w320/tr.png",
  Vietnamese: "https://flagcdn.com/w320/vn.png",
  Ukrainian: "https://flagcdn.com/w320/ua.png", 
  Uruguayan: "https://flagcdn.com/w320/uy.png", 
};

export default function CountriesScreen({ navigation }) {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const data = await res.json();
        setAreas(data.meals.map((item) => item.strArea));
      } catch (error) {
        console.error("❌ Error cargando áreas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={{ marginTop: 10 }}>Cargando países...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={areas}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Recetas por País", { country: item })}
          >
            <Image
              source={{ uri: FLAGS[item] || "https://via.placeholder.com/80x50.png?text=🏳️" }}
              style={styles.flag}
            />
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F4",
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE6D9",
    padding: 15,
    borderRadius: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flag: {
    width: 60,
    height: 40,
    borderRadius: 6,
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
