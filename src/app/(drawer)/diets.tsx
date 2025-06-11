import { useAuth } from "@/src/context/AuthContext";
import { FlatList, StyleSheet, View } from "react-native";
import QN_DietDisplay_Day from "@/src/components/QN_Components/QN_DietDisplay_Day";
import { Dimensions } from "react-native";
import { useUser } from "@/src/hooks/useUser";
import { MealType } from "@/src/models/Meal.interface";

export default function Diets() {
  const { getToken, isAuthenticated, doLogout } = useAuth();
  const { user } = useUser();
  const date = new Date();
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const days = Array.from({ length: 7 }, (_, i) => ({ id: i.toString() }));
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
        renderItem={({ item }) => {
          const dayName = weekDays[parseInt(item.id)];
          const allMeals: MealType[] = user?.diets?.[0]?.meals ?? [];
          const mealsForDay = allMeals.filter((meal) =>
            meal.daysOfWeek.includes(dayName)
          );

          return <QN_DietDisplay_Day day={item.id} meals={mealsForDay} />;
        }}
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
