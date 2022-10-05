import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

export default function AboutUs({ navigation }) {
  // const onPressHandler = () => {
  //   navigation.navigate("Feed");
  //   // navigation.goBack();
  // };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Coming Soon</Text>

      {/* <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "black" : "red",
          borderRadius: 5,
          padding: 10,
        })}
      >
        <Text style={styles.buttonText}>Home</Text>
      </Pressable> */}
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
