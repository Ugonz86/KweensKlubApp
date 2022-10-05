import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Feed() {
  return (
    <View style={styles.body}>
      <Image source={require("../images/flyer.jpeg")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 400,
    height: 500,
    // resizeMode: 'contain',
    borderRadius: 10,
  },
});
