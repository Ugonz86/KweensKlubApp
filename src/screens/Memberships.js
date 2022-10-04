import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Frame from '../images/Frame.png';
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-community/masked-view";

export default class Memberships extends React.Component {
  render() {
    return (
      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 60,
                color: 'black',
                fontWeight: 'bold'
              }}
            >
              Basic Mask
            </Text>
          </View>
        }
      >
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} />
        <View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
        <View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
        <View style={{ flex: 1, height: '100%', backgroundColor: '#e1e1e1' }} />
      </MaskedView>
    )
  }
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
    fontSize: 40,
    fontWeight: "bold",

    color: "white",
  },
  image: {
    width: 400,
    height: 420,
    // resizeMode: 'contain',
    borderRadius: 10,
  },
  contactButton: {
    // top: 50,
    // backgroundColor: "transparent",
    // borderRadius: 5,
    // padding: 10,
    opacity: 0,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
        },
  },
});
