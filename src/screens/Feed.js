import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export default function Feed() {
  return (
    <View style={styles.body}>
      <Image source={require("../images/flyer.jpeg")} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Event Details Here</Text>
      </View>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 25,
  },
  image: {
    width: 400,
    height: 500,
    // resizeMode: 'stretch',
    borderRadius: 10,
    marginVertical: 15,
  },
  textContainer: {
    backgroundColor: '#080808',
    borderRadius: 5,
    width: 400,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  }
});
