import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Memberships({ navigation }) {
  return (
    <View style={styles.body}>
      <Image source={require("../images/m-options.jpg")} style={styles.image} />
      <TouchableOpacity
        style={styles.body}
        onPress={() => navigation.navigate("ContactUs")}
      >
        <Text style={{ color: "grey", padding: 10 }}>
          To request your membership, please send us your full name, email and
          in the message box, include your mailing address and choice of
          membership then we'll send you the next steps.
        </Text>
        <Text style={{ color: "#d4af37" }}>Gold: $100.00</Text>
        <Text style={{ color: "#C0C0C0" }}>Silver: $75.00</Text>
        <Text style={{ color: "#b08d57" }}>Bronze: $50.00</Text>

        <FontAwesome5
          name="envelope"
          size={30}
          color="grey"
          style={{ marginVertical: 10 }}
        />
      </TouchableOpacity>
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
    color: "white",
  },
  image: {
    width: 400,
    height: 420,
    borderRadius: 10,
    marginVertical: 25,
  },
  contactButton: {},
});
