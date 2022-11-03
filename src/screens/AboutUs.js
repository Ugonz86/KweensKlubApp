import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function AboutUs() {
  return (
    <View style={styles.body}>
      <Image
        source={require("../images/kklogo2.png")}
        style={styles.image}
      ></Image>
      <View style={styles.container}>
        <Text style={styles.text}>
          {"\t"}Kweens Klub (KK), located in the heart of Santurce in San Juan,
          Puerto Rico, is the premier LGBTIQ+ nightclub of the island. It all
          started as an idea of combining nightlight experiences from the south
          and the metropolitan area of Puerto Rico. The building was an
          abandoned structure rebuilded since March 2020 for the purpose of the
          current nightclub. The idea of the setting was progressive because
          many plans changed in the development. However, it turned out the best
          version out of the planning.
        </Text>
        <Text style={styles.text2}>
          We offer a variety of local beers and quality cocktails. Our main
          attraction are the drag shows where we bring international celebrity
          guests performers to our stage. The second floor allocates one of the
          biggest attributes to the local drag icons with all their pictures.
          Also, we provide an open outdoor space. KK was opened in December
          2021, and have become popular because of the quality of the spectacles
          and the huge dance floor.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  container: {
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    width: 375,
    borderWidth: 1,
    borderColor: "white",
    paddingBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
    textAlign: "justify",
    padding: 10,
  },
  text2: {
    color: "white",
    fontSize: 16,
    textAlign: "justify",
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    tintColor: "white",
    marginVertical: 30,
  },
});
