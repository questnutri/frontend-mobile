import { StyleSheet, View, Text, Pressable, Animated } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import QN_AlimentDisplay from "../QN_AlimentDisplay";
import { LinearGradient } from "expo-linear-gradient";

export default function QN_MealDisplay() {
  const [press, setPress] = useState(false);
  const [rotateAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: press ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [press]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <Pressable
        style={styles.pressableContainer}
        onPress={() => setPress(!press)}
      >
        {/* Card Principal */}
        <View style={styles.mainCard}>
          {/* Borda gradiente */}
          <LinearGradient
            colors={["#55b7fe", "#55b7fe"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
          >
            <View style={styles.cardContent}>
              {/* Ícone de expansão */}
              <View style={styles.expandIcon}>
                <Animated.View
                  style={[
                    styles.iconContainer,
                    {
                      transform: [
                        {
                          rotate: rotateAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0deg", "90deg"],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <AntDesign name="caretright" size={18} color="#55b7fe" />
                </Animated.View>
              </View>

              {/* Informações da refeição */}
              <View style={styles.mealInfo}>
                <Text style={styles.mealText}>Nome aleatório de refeição</Text>
                <View style={styles.mealSubInfo}>
                  <View style={styles.caloriesBadge}>
                    <Text style={styles.caloriesText}>450 kcal</Text>
                  </View>
                </View>
              </View>

              {/* Horário */}
              <View style={styles.timeContainer}>
                <View style={styles.timeIconContainer}>
                  <AntDesign name="clockcircleo" size={20} color="#55b7fe" />
                </View>
                <Text style={styles.timeText}>08:00</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Conteúdo expandido */}
        {press && (
          <Animated.View
            style={[
              styles.expandedContent,
              {
                opacity: rotateAnim,
                transform: [
                  {
                    scaleY: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.expandedCard}>
              <View style={styles.mealDetails}>
                {/* Lista de alimentos */}
                <View style={styles.foodList}>
                  <QN_AlimentDisplay />
                  <QN_AlimentDisplay />
                </View>

                {/* Informações nutricionais */}
                <View style={styles.nutritionContainer}>
                  <Text style={styles.nutritionTitle}>
                    Informações Nutricionais
                  </Text>
                  <View style={styles.nutritionGrid}>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>Calorias</Text>
                      <Text style={styles.nutritionValue}>450 kcal</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>Proteínas</Text>
                      <Text style={styles.nutritionValue}>25g</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>Carboidratos</Text>
                      <Text style={styles.nutritionValue}>35g</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>Gorduras</Text>
                      <Text style={styles.nutritionValue}>15g</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.camera}>
                  <Entypo name="camera" color={"#55b7fe"} size={25} />
                </View>
              </View>
            </View>
          </Animated.View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 4,
  },
  pressableContainer: {
    width: "100%",
  },
  mainCard: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientBorder: {
    borderRadius: 16,
    padding: 2,
  },
  cardContent: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 70,
  },
  expandIcon: {
    marginRight: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  mealInfo: {
    flex: 1,
    paddingHorizontal: 8,
  },
  mealText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 4,
    lineHeight: 20,
  },
  mealSubInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  caloriesBadge: {
    backgroundColor: "#48bb78",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  caloriesText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
  },
  timeContainer: {
    alignItems: "center",
    gap: 4,
  },
  timeIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: "#55b7fe",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  expandedContent: {
    marginTop: 8,
    overflow: "hidden",
  },
  expandedCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mealDetails: {
    padding: 20,
    gap: 20,
  },
  foodList: {
    gap: 12,
  },
  nutritionContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
  },
  nutritionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 12,
    textAlign: "center",
  },
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  nutritionItem: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.1)",
  },
  nutritionLabel: {
    fontSize: 12,
    color: "#718096",
    marginBottom: 4,
    textAlign: "center",
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#55b7fe",
    textAlign: "center",
  },
  camera: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#d0d1d1",
    borderRadius: "50",
  },
});
