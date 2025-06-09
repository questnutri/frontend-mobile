import React, { useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import QN_MealDisplay from "../QN_MealDisplay";
import { FoodModalProvider } from "@/src/context/FoodContext";
import FoodInfoModal from "../QN_FoodInfomation";
import { LinearGradient } from "expo-linear-gradient";

interface QN_DietDisplay_DayProps {
  day: string;
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
}

const DAYS_OF_WEEK_BR = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;

// Memoize screen width to avoid recalculation
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function QN_DietDisplay_Day({
  day,
  onNavigateLeft,
  onNavigateRight,
}: QN_DietDisplay_DayProps) {
  // Memoize date calculation to avoid recalculation on every render
  const formattedDate = useMemo(() => {
    const calculateDateOfWeek = (dayString: string): string => {
      const itemDay = parseInt(dayString, 10);

      // Validate day input
      if (isNaN(itemDay) || itemDay < 0 || itemDay > 6) {
        return "Data inválida";
      }

      const today = new Date();
      const currentDay = today.getDay();

      // Calculate difference and adjust date
      const diff = itemDay - currentDay;
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + diff);

      // Format date string
      const dayName = DAYS_OF_WEEK_BR[targetDate.getDay()];
      const dayNumber = targetDate.getDate().toString().padStart(2, "0");
      const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");

      return `${dayName} - ${dayNumber}/${month}`;
    };

    return calculateDateOfWeek(day);
  }, [day]);

  const handleLeftNavigation = () => {
    onNavigateLeft?.();
  };

  const handleRightNavigation = () => {
    onNavigateRight?.();
  };

  return (
    <FoodModalProvider>
      <View style={[styles.container, { width: SCREEN_WIDTH }]}>
        <LinearGradient
          colors={["#55b7fe", "#83cbfe"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <View style={styles.content}>
            {/* Header with improved design */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={handleLeftNavigation}
                activeOpacity={0.7}
                accessibilityLabel="Dia anterior"
                accessibilityRole="button"
              >
                <AntDesign name="caretleft" size={20} color="#ffffff" />
              </TouchableOpacity>

              <View style={styles.dateContainer}>
                <Text
                  style={styles.dayOfWeek}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {formattedDate}
                </Text>
                <View style={styles.dateUnderline} />
              </View>

              <TouchableOpacity
                style={styles.navigationButton}
                onPress={handleRightNavigation}
                activeOpacity={0.7}
                accessibilityLabel="Próximo dia"
                accessibilityRole="button"
              >
                <AntDesign name="caretright" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Body with enhanced styling and ScrollView */}
            <ScrollView
              style={styles.body}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.mealsContainer}>
                <QN_MealDisplay />
                <QN_MealDisplay />
              </View>
            </ScrollView>

            <FoodInfoModal />
          </View>
        </LinearGradient>
      </View>
    </FoodModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  gradientBackground: {
    borderRadius: 20,
    shadowColor: "#000",
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    padding: 20,
    gap: 20,
    position: "relative",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  navigationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  dateContainer: {
    alignItems: "center",
    gap: 8,
    flex: 1,
    paddingHorizontal: 16,
  },
  dayOfWeek: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dateUnderline: {
    width: 60,
    height: 3,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    opacity: 0.8,
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mealsContainer: {
    gap: 5,
    paddingBottom: 10,
  },
});

// Estilos adicionais otimizados para os componentes filhos
export const enhancedStyles = StyleSheet.create({
  // Card base para QN_MealDisplay
  mealCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  // Título das refeições
  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 12,
    letterSpacing: 0.3,
  },

  // Container para itens de comida
  foodItemContainer: {
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#55b7fe",
  },

  // Texto dos itens de comida
  foodItemText: {
    fontSize: 16,
    color: "#4a5568",
    lineHeight: 20,
  },

  // Badge para calorias
  caloriesBadge: {
    backgroundColor: "#48bb78",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  caloriesText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});

// Export constants for use in other components
export { DAYS_OF_WEEK_BR, SCREEN_WIDTH };
