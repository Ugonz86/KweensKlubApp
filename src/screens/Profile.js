import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text> 💙 + 💛</Text>
      <Text> PROFILE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
});
