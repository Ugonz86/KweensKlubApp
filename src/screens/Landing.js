import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { StyleSheet, View, Text, Image } from "react-native";

// Auth.currentAuthenticatedUser().then((user) => {
//   console.log("Hello!", user);

// })

export default function Landing({ navigation }) {
//   const [userName, setUserName] = useState();

// const hello = () => {
//   console.log(Auth)
// }

// useEffect(() => {
//   hello();
// }, []);

  return (
    <View style={styles.body}>
      {/* <Image source={require("../images/kklogo2.png")} style={styles.logo} /> */}
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
