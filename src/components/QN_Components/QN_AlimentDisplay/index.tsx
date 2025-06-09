import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import { useFoodModal } from "@/src/context/FoodContext";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function QN_AlimentDisplay() {
  const { openModal } = useFoodModal();
  const [scaleAnim] = useState(new Animated.Value(1));
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    const foodData = {
      foodName: "Arroz Integral",
      calories: 365,
      units: 2,
      observation:
        "Este alimento é rico em fibras e fornece energia de forma sustentada. Recomendado para o almoço junto com proteínas magras e legumes.",
      nutritionalInfo: {
        energy: "365kcal = 1528kJ",
        carbs: "77g",
        protein: "7.3g",
        totalFat: "2.2g",
        saturatedFat: "0.6g",
        fiber: "2.7g",
        sodium: "5mg",
      },
    };

    openModal(foodData);
  };

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <Pressable
        style={styles.pressable}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <LinearGradient
          colors={pressed ? ["#f0f4f8", "#e2e8f0"] : ["#ffffff", "#f8fafc"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          {/* Indicador lateral colorido */}
          <View style={styles.sideIndicator} />

          <View style={styles.content}>
            {/* Ícone de informação */}
            <View style={styles.infoIconContainer}>
              <AntDesign name="infocirlceo" color="#55b7fe" size={16} />
            </View>

            {/* Informações do alimento */}
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>Arroz Integral</Text>
              <View style={styles.foodDetails}>
                <View style={styles.portionBadge}>
                  <Text style={styles.portionText}>2 porções</Text>
                </View>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>Carboidrato</Text>
                </View>
              </View>
            </View>

            {/* Calorias */}
            <View style={styles.caloriesContainer}>
              <View style={styles.caloriesIcon}>
                <LinearGradient
                  colors={["#ff6b6b", "#ee5a24"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.fireGradient}
                >
                  <MaterialCommunityIcons
                    name="fire"
                    size={14}
                    color="#ffffff"
                  />
                </LinearGradient>
              </View>
              <View style={styles.caloriesInfo}>
                <Text style={styles.caloriesValue}>365</Text>
                <Text style={styles.caloriesUnit}>kcal</Text>
              </View>
            </View>

            {/* Seta de expansão */}
            <View style={styles.expandArrow}>
              <AntDesign name="right" size={12} color="#a0aec0" />
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  pressable: {
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  gradientBackground: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.1)",
    overflow: "hidden",
  },
  sideIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#55b7fe",
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    paddingLeft: 18, // Espaço para o indicador lateral
    gap: 10,
    minHeight: 60,
  },
  infoIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  foodInfo: {
    flex: 1,
    gap: 4,
    minWidth: 0, // Permite que o texto seja truncado se necessário
  },
  foodName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3748",
    lineHeight: 16,
  },
  foodDetails: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  portionBadge: {
    backgroundColor: "rgba(72, 187, 120, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  portionText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#38a169",
  },
  typeBadge: {
    backgroundColor: "rgba(102, 126, 234, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#55b7fe",
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    flexShrink: 0,
  },
  caloriesIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  fireGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  caloriesInfo: {
    alignItems: "flex-start",
  },
  caloriesValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#e53e3e",
    lineHeight: 14,
  },
  caloriesUnit: {
    fontSize: 9,
    fontWeight: "500",
    color: "#e53e3e",
    opacity: 0.8,
  },
  expandArrow: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(160, 174, 192, 0.1)",
    borderRadius: 10,
    flexShrink: 0,
  },
});

// Variação alternativa para diferentes tipos de alimentos
export const AlimentDisplayVariations = {
  // Para proteínas
  protein: {
    sideColor: "#e53e3e",
    typeColor: "#e53e3e",
    typeBg: "rgba(229, 62, 62, 0.15)",
    typeText: "Proteína",
  },

  // Para gorduras
  fat: {
    sideColor: "#d69e2e",
    typeColor: "#d69e2e",
    typeBg: "rgba(214, 158, 46, 0.15)",
    typeText: "Gordura",
  },

  // Para vegetais
  vegetable: {
    sideColor: "#38a169",
    typeColor: "#38a169",
    typeBg: "rgba(56, 161, 105, 0.15)",
    typeText: "Vegetal",
  },

  // Para frutas
  fruit: {
    sideColor: "#ed8936",
    typeColor: "#ed8936",
    typeBg: "rgba(237, 137, 54, 0.15)",
    typeText: "Fruta",
  },
};
