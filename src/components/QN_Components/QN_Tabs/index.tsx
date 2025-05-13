import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

interface QN_TabsProps {
  tabs: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  path?: string;
}

export default function QN_Tabs({ tabs, value, setValue, path }: QN_TabsProps) {
  const tabWidth = 100 / tabs.length;
  return (
    <View
      style={[
        styles.container,
        path ? styles.withBorder : styles.withBackground,
      ]}
    >
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setValue(tab)}
            style={[
              styles.tab,
              value === tab ? styles.selectedTab : null,
              { width: `${tabWidth}%` },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                value === tab ? styles.selectedTabText : null,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  withBackground: {
    backgroundColor: "#55b7fe",
  },
  withBorder: {
    borderWidth: 1,
    borderColor: "#000",
  },
  scrollViewContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 0,
    borderRadius: 10,
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "center",
  },
  selectedTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    width: "100%",
    fontFamily: "Montserrat-Regular",
  },
  selectedTabText: {
    color: "black",
    fontWeight: "bold",
  },
});
