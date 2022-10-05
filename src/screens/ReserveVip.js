import { StyleSheet, View, Text } from "react-native";

export default function ReserverVip() {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "black",
    height: "100%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 20,
  },
});
