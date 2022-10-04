import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Frame from '../images/Frame.png';

export default function Feed({ navigation }) {
  // const onPressHandler = () => {
  //   // navigation.navigate('Screen_B');
  //   navigation.toggleDrawer();
  // };

  return (
    <View style={styles.body}>
          <Image source={require('../images/flyer.jpeg')} style={styles.image} />
          {/* <FontAwesome5
                name="image"
              color="red"
              size="80"
              /> */}
      {/* <Text style={styles.text}>Upcoming event</Text> */}
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
    color: 'white'
    
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 400,
    height: 500,
    // flex: .5,
    // resizeMode: 'contain',
    borderRadius: 10
  }
});
