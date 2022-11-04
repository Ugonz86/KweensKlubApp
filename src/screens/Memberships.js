import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function Memberships({ navigation }) {
  return (
    <View style={styles.body}>
      <Image source={require("../images/m-options.jpg")} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          To request your membership, please send us your full name, email, and
          phone number. In addition, in the message box, include your mailing
          address and choice of membership then we'll send you the next steps.
        </Text>
        <Text style={{ color: "#d4af37" }}>Gold: $400.00</Text>
        <Text style={{ color: "#C0C0C0" }}>Silver: $200.00</Text>
        <Text style={{ color: "#b08d57" }}>Bronze: $100.00</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("ContactUs")}
        >
          <Text style={{ color: "white", marginVertical: 10, fontSize: 20 }}>
            Request Membership
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text>
          <Text style={{ fontWeight: "bold", color: "white" }}></Text>
          <Text>Duration: 3 years</Text>
          <Text>No lines</Text>
          <Text>Exclusive VIP area access</Text>
          <Text>1 guest included</Text>
          <Text>20% discount</Text>
        </Text>
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
  },
  text: {
    color: "grey",
    padding: 10,
    justifyContent: "space-evenly",
  },
  image: {
    width: 375,
    height: 400,
    borderRadius: 10,
    marginVertical: 15,
  },
  textContainer: {
    alignItems: "center",
    borderRadius: 5,
    width: 400,
    padding: 10,
  },
});
