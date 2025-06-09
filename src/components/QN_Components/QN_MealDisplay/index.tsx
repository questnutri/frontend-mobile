import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  Alert,
  Image,
} from "react-native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import QN_AlimentDisplay from "../QN_AlimentDisplay";
import { LinearGradient } from "expo-linear-gradient";

export default function QN_MealDisplay() {
  const [press, setPress] = useState(false);
  const [rotateAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: press ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [press]);

  // Função para verificar permissões
  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || libraryStatus !== "granted") {
      Alert.alert(
        "Permissões necessárias",
        "Precisamos de acesso à câmera e galeria para esta funcionalidade.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  // Função para tirar foto
  const takePhoto = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        console.log("Foto tirada:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao tirar foto:", error);
      Alert.alert("Erro", "Não foi possível tirar a foto.");
    }
  };

  // Função para selecionar da galeria
  const pickImage = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        console.log("Imagem selecionada:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

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

                {/* Seção de foto melhorada */}
                <View style={styles.cameraActions}>
                  <Text style={styles.cameraTitle}>
                    Adicionar Foto da Refeição
                  </Text>

                  {/* Mostra a imagem selecionada */}
                  {selectedImage && (
                    <View style={styles.imagePreview}>
                      <Image
                        source={{ uri: selectedImage }}
                        style={styles.previewImage}
                      />
                      <Pressable
                        style={styles.removeImageButton}
                        onPress={() => setSelectedImage(null)}
                      >
                        <AntDesign name="close" size={16} color="#ff4757" />
                      </Pressable>
                    </View>
                  )}

                  <View style={styles.cameraButtons}>
                    <Pressable style={styles.cameraButton} onPress={takePhoto}>
                      <Entypo name="camera" color="#55b7fe" size={24} />
                      <Text style={styles.buttonText}>Câmera</Text>
                    </Pressable>

                    <Pressable style={styles.cameraButton} onPress={pickImage}>
                      <FontAwesome name="photo" color="#55b7fe" size={24} />
                      <Text style={styles.buttonText}>Galeria</Text>
                    </Pressable>
                  </View>
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
  // Novos estilos para a câmera
  cameraActions: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  cameraTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 12,
    textAlign: "center",
  },
  imagePreview: {
    position: "relative",
    marginBottom: 16,
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cameraButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  cameraButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    minWidth: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(85, 183, 254, 0.2)",
  },
  buttonText: {
    fontSize: 12,
    color: "#55b7fe",
    fontWeight: "500",
    marginTop: 6,
    textAlign: "center",
  },
});
