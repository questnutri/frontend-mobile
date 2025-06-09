import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Water() {
  const [currentIntake, setCurrentIntake] = useState(0);
  const [dailyGoal] = useState(2500); // Meta diária em ml
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  // Opções de quantidade pré-definidas
  const quickAmounts = [100, 200, 250, 300, 500, 750];

  // Calcular progresso
  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  const remainingAmount = Math.max(dailyGoal - currentIntake, 0);

  const handleAddWater = () => {
    setCurrentIntake((prev) => prev + selectedAmount);
  };

  const handleSubtractWater = () => {
    setCurrentIntake((prev) => Math.max(0, prev - selectedAmount));
  };

  const handleSubmit = async () => {
    if (currentIntake === 0) {
      Alert.alert(
        "Atenção",
        "Adicione alguma quantidade de água antes de enviar."
      );
      return;
    }

    setIsSubmitting(true);

    // Simular envio para API
    setTimeout(() => {
      setLastSubmitted(new Date());
      setIsSubmitting(false);
      Alert.alert(
        "Sucesso!",
        `Registro de ${currentIntake}ml enviado com sucesso!`,
        [{ text: "OK" }]
      );

      // Aqui você faria a chamada real para sua API
      console.log("Enviando dados:", {
        amount: currentIntake,
        date: new Date().toISOString(),
        goalReached: currentIntake >= dailyGoal,
      });
    }, 1500);
  };

  const handleReset = () => {
    Alert.alert(
      "Resetar dados",
      "Tem certeza que deseja resetar o registro de hoje?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Resetar",
          style: "destructive",
          onPress: () => {
            setCurrentIntake(0);
            setLastSubmitted(null);
          },
        },
      ]
    );
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const ProgressBar = ({ percentage }) => (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#55b7fe", "#55b7fe"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="water" size={32} color="white" />
            <Text style={styles.headerTitle}>Controle de Água</Text>
          </View>
          <View style={styles.headerStats}>
            <Text style={styles.headerSubtitle}>Hoje</Text>
            <Text style={styles.headerAmount}>{currentIntake}ml</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progresso do dia</Text>
            <Text style={styles.progressPercentage}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>

          <ProgressBar percentage={progressPercentage} />

          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>0ml</Text>
            <View style={styles.goalLabel}>
              <Ionicons name="flag" size={14} color="#6B7280" />
              <Text style={styles.progressLabel}>{dailyGoal}ml</Text>
            </View>
          </View>
        </View>

        {/* Goal Status */}
        <View style={styles.statusCard}>
          {currentIntake >= dailyGoal ? (
            <View style={styles.statusContent}>
              <Text style={styles.statusEmoji}>🎉</Text>
              <Text style={styles.statusTitle}>Parabéns! Meta atingida!</Text>
              <Text style={styles.statusSubtitle}>
                Você bebeu {currentIntake - dailyGoal}ml a mais que o objetivo
              </Text>
            </View>
          ) : (
            <View style={styles.statusContent}>
              <Text style={styles.statusEmoji}>💧</Text>
              <Text style={styles.statusTitle}>
                Ainda faltam {remainingAmount}ml
              </Text>
              <Text style={styles.statusSubtitle}>Continue hidratado!</Text>
            </View>
          )}
        </View>

        {/* Quick Amount Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantidade rápida:</Text>
          <View style={styles.quickAmountsGrid}>
            {quickAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                onPress={() => setSelectedAmount(amount)}
                style={[
                  styles.quickAmountButton,
                  selectedAmount === amount && styles.quickAmountButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.quickAmountText,
                    selectedAmount === amount && styles.quickAmountTextSelected,
                  ]}
                >
                  {amount}ml
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom Amount Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantidade personalizada:</Text>
          <View style={styles.customAmountContainer}>
            <TouchableOpacity
              onPress={handleSubtractWater}
              style={[styles.amountButton, styles.subtractButton]}
              disabled={currentIntake === 0}
            >
              <Ionicons name="remove" size={24} color="#EF4444" />
            </TouchableOpacity>

            <View style={styles.amountInputContainer}>
              <TextInput
                value={selectedAmount.toString()}
                onChangeText={(text) =>
                  setSelectedAmount(Math.max(0, parseInt(text) || 0))
                }
                style={styles.amountInput}
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={styles.amountUnit}>ml</Text>
            </View>

            <TouchableOpacity
              onPress={handleAddWater}
              style={[styles.amountButton, styles.addButton]}
            >
              <Ionicons name="add" size={24} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting || currentIntake === 0}
            style={[
              styles.submitButton,
              (isSubmitting || currentIntake === 0) && styles.disabledButton,
            ]}
          >
            <LinearGradient
              colors={["#3B82F6", "#06B6D4"]}
              style={styles.submitButtonGradient}
            >
              {isSubmitting ? (
                <View style={styles.submitButtonContent}>
                  <ActivityIndicator size="small" color="white" />
                  <Text style={styles.submitButtonText}>Enviando...</Text>
                </View>
              ) : (
                <View style={styles.submitButtonContent}>
                  <Ionicons name="send" size={20} color="white" />
                  <Text style={styles.submitButtonText}>Enviar Registro</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Ionicons name="refresh" size={18} color="#6B7280" />
            <Text style={styles.resetButtonText}>Resetar</Text>
          </TouchableOpacity>
        </View>

        {/* Last Submitted */}
        {lastSubmitted && (
          <View style={styles.lastSubmittedCard}>
            <View style={styles.lastSubmittedContent}>
              <View style={styles.statusIndicator} />
              <Text style={styles.lastSubmittedText}>
                Último envio: {formatTime(lastSubmitted)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F9FF",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 12,
  },
  headerStats: {
    alignItems: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
  },
  headerAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#55b7fe",
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    width: "100%",
    height: 16,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#55b7fe",
    borderRadius: 8,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  goalLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statusContent: {
    alignItems: "center",
  },
  statusEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#55b7fe",
    marginBottom: 8,
    textAlign: "center",
  },
  statusSubtitle: {
    fontSize: 14,
    color: "#55b7fe",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 12,
  },
  quickAmountsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickAmountButton: {
    flex: 1,
    minWidth: (SCREEN_WIDTH - 64) / 3 - 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  quickAmountButtonSelected: {
    borderColor: "#55b7fe",
    backgroundColor: "#EFF6FF",
  },
  quickAmountText: {
    fontSize: 14,
    color: "#374151",
  },
  quickAmountTextSelected: {
    color: "#1E40AF",
    fontWeight: "600",
  },
  customAmountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  amountButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  subtractButton: {
    backgroundColor: "#FEF2F2",
  },
  addButton: {
    backgroundColor: "#EFF6FF",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  amountInput: {
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    fontSize: 16,
  },
  amountUnit: {
    fontSize: 16,
    color: "#6B7280",
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  submitButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  submitButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  resetButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    gap: 8,
  },
  resetButtonText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "500",
  },
  lastSubmittedCard: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  lastSubmittedContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    backgroundColor: "#10B981",
    borderRadius: 4,
    marginRight: 8,
  },
  lastSubmittedText: {
    fontSize: 14,
    color: "#065F46",
  },
});
