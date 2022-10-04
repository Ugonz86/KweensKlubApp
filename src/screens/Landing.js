import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image, ActivityIndicator } from "react-native";

export default function ScreenA({ navigation }) {
  // const [show, setShow] = useState(false);

  // const onPressHandler = () => {
  //   // navigation.navigate('Screen_B');
  //   navigation.navigate('Feed');
  // };

  // useEffect(() => {
  //   setTimeout(() => setShow(true), 10000);
  // }, []);

  return (
    <View style={styles.body}>
      
      <Image source={require('../images/kklogo2.png')} style={styles.logo} />
     
      <Text style={styles.text}>Welcome Kween!</Text>
      
      {/* <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "black" : "red",
          borderRadius: 5,
          padding: 10,
        })}
      >
        <Text style={styles.buttonText}>Upcoming Event</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // marginTop: 50,
    // paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    // height: "100%",
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
        tintColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }
});
