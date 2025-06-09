import { useAuth } from "@/src/context/AuthContext";
import { FlatList, StyleSheet, View } from "react-native";
import QN_DietDisplay_Day from "@/src/components/QN_Components/QN_DietDisplay_Day";
import { Dimensions } from "react-native";

export default function Diets() {
  const { getToken, isAuthenticated, doLogout } = useAuth();
  const date = new Date();

  const SCREEN_WIDTH = Dimensions.get("window").width;

  const days = [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="end"
        decelerationRate="fast"
        bounces={false}
        overScrollMode="never"
        initialScrollIndex={date.getDay()}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        renderItem={({ item }) => <QN_DietDisplay_Day day={item.id} />}
        ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
