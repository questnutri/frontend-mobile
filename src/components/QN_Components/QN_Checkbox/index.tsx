import { StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";

export default function QN_Checkbox({
  selected = true,
  isDisabled,
  onChange,
}: {
  selected?: boolean;
  isDisabled?: boolean;
  onChange?: () => void | Promise<void>;
}) {
  return (
    <View style={style.wrapper}>
      <View style={style.scaled}>
        <Checkbox
          status={selected ? "checked" : "unchecked"}
          disabled={isDisabled}
          onPress={onChange}
          color="red"
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "#55b7fe",
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  scaled: {
    transform: [{ scale: 0.7 }], // Ajuste esse valor conforme necessário
  },
});
