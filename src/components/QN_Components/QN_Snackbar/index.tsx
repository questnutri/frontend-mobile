import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";
import { Snackbar } from "react-native-paper";

interface Props_QN_Snackbar {
  show: boolean;
  setShow: (show: boolean) => void;
  status: "sucess" | "erro" | "warning";
  message: string;
  showCloseButton?: boolean;
}

export default function QN_Snackbar({
  show,
  setShow,
  status,
  message,
  showCloseButton = true,
}: Props_QN_Snackbar) {
  const iconStatus = () => {
    if (status === "sucess")
      return <AntDesign name="checkcircleo" color={"#fff"} size={25} />;
    if (status === "erro")
      return <AntDesign name="closecircleo" color={"#fff"} size={25} />;
    if (status === "warning")
      return <MaterialIcons name="error-outline" color={"#fff"} size={25} />;
    return null;
  };

  const backgroundColor =
    status === "sucess"
      ? "rgba(92, 206, 75, 0.8)"
      : status === "erro"
      ? "#c24848"
      : "rgb(234, 152, 75)";

  return (
    <Snackbar
      visible={show}
      onDismiss={() => setShow(false)}
      duration={6000}
      style={{
        backgroundColor,
        borderRadius: 10,
        paddingHorizontal: 0,
        paddingVertical: 7,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 15,
        }}
      >
        {iconStatus()}
        <Text style={{ color: "white", fontSize: 17, flex: 1 }}>{message}</Text>

        {showCloseButton && (
          <TouchableOpacity onPress={() => setShow(false)}>
            <AntDesign name="close" size={18} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </Snackbar>
  );
}
