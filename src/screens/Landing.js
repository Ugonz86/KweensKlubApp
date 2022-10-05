import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function ScreenA({ navigation }) {
  return (
    <View style={styles.body}>
      <Image source={require("../images/kklogo2.png")} style={styles.logo} />
      <Text style={styles.text}>Welcome Kween!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 30,
    color: "white",
  },
  logo: {
    height: 150,
    width: 150,
    tintColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
