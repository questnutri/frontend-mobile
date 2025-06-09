import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { useFoodModal } from "../../../context/FoodContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function FoodInfoModal() {
  const { isVisible, foodData, closeModal } = useFoodModal();

  if (!foodData) return null;

  const nutritionalData = [
    {
      label: "Valor energético",
      value: foodData.nutritionalInfo.energy,
      icon: "flash",
    },
    {
      label: "Carboidratos",
      value: foodData.nutritionalInfo.carbs,
      icon: "nutrition",
    },
    {
      label: "Proteínas",
      value: foodData.nutritionalInfo.protein,
      icon: "fitness",
    },
    {
      label: "Gorduras totais",
      value: foodData.nutritionalInfo.totalFat,
      icon: "water",
    },
    {
      label: "Gorduras Saturadas",
      value: foodData.nutritionalInfo.saturatedFat,
      icon: "warning",
    },
    {
      label: "Fibra alimentar",
      value: foodData.nutritionalInfo.fiber,
      icon: "leaf",
    },
    { label: "Sódio", value: foodData.nutritionalInfo.sodium, icon: "medical" },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header Compacto */}
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <AntDesign name="close" color="black" size={20} />
            </TouchableOpacity>

            <Text style={styles.foodName} numberOfLines={2}>
              {foodData.foodName}
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Ionicons name="flame" size={16} color="#ff6b6b" />
                <Text style={styles.statNumber}>{foodData.calories}</Text>
                <Text style={styles.statLabel}>kcal</Text>
              </View>
              <View style={styles.statBox}>
                <Ionicons name="restaurant" size={16} color="#4ecdc4" />
                <Text style={styles.statNumber}>{foodData.units}</Text>
                <Text style={styles.statLabel}>unidades</Text>
              </View>
            </View>
          </View>

          <ScrollView
            style={styles.modalBody}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Observação Compacta */}
            <View style={styles.observationSection}>
              <Text style={styles.sectionTitle}>
                <Ionicons
                  name="chatbubble-ellipses"
                  size={16}
                  color="#55b7fe"
                />{" "}
                Observação
              </Text>
              <Text style={styles.observationText}>{foodData.observation}</Text>
            </View>

            {/* Tabela Nutricional Compacta */}
            <View style={styles.nutritionalSection}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="bar-chart" size={16} color="#55b7fe" />{" "}
                Informações Nutricionais
              </Text>
              <Text style={styles.portionText}>Por 100g</Text>

              {nutritionalData.map((item, index) => (
                <View key={index} style={styles.nutritionalRow}>
                  <View style={styles.nutritionalLeft}>
                    <Ionicons name={item.icon} size={14} color="#95a5a6" />
                    <Text style={styles.nutritionalLabel}>{item.label}</Text>
                  </View>
                  <Text style={styles.nutritionalValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    flex: 1,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.85,
    width: width,
    flex: 1,
  },
  modalHeader: {
    backgroundColor: "#55b7fe",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 15,
    width: 32,
    height: 32,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  foodName: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    paddingRight: 40,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statBox: {
    alignItems: "center",
    backgroundColor: "#f8f9fa",

    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    minWidth: 80,
  },
  statNumber: {
    color: "black",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 2,
  },
  statLabel: {
    color: "rgba(0, 0, 0, 0.8)",
    fontSize: 11,
    marginTop: 1,
  },
  modalBody: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  observationSection: {
    margin: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#55b7fe",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 10,
  },
  observationText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#495057",
  },
  nutritionalSection: {
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  portionText: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 12,
    fontStyle: "italic",
  },
  nutritionalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  nutritionalLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nutritionalLabel: {
    fontSize: 14,
    color: "#495057",
    marginLeft: 8,
    flex: 1,
  },
  nutritionalValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    minWidth: 60,
    textAlign: "right",
  },
});
