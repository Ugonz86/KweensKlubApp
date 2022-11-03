import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";

export default function MoreInfo({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate("ReserveVip");
  };
  const goToContactUs = () => {
    navigation.navigate("ContactUs");
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text>
            {" "}
            Reservations Rules{"\n"}
            {"\n"}
          </Text>
          <TouchableOpacity onPress={goToContactUs}>
            <Text style={styles.text}>
              1. Each VIP space has a maximum allowance of 5 guests. If the
              party is greater than 5 guests, you will need to input the amount
              of guests. If the party is greater than 25, please{" "}
              <Text style={{ color: "red", textDecorationLine: "underline" }}>
                contact us
              </Text>{" "}
              and we'll offer a package that will adjust to your needs.
            </Text>
          </TouchableOpacity>
          <Text>
            2. The guest must submit their reservation by or prior to 12:30 am.
            If the guest does not show or shows up later thant the reserved
            time, the reservation will be cancelled and the deposit will not be
            transferred to future reservations.{"\n"}
            {"\n"}
          </Text>
          <Text>
            3. Upon reservation confirmation, the guest will have direct access
            to the VIP line to pay the cover. Prices may vary per event and will
            not be included with the reservation cost.{"\n"}
            {"\n"}
          </Text>
          <Text>
            4. Only the amount of guests selected in the confirmed reservation
            will be have access to the VIP space. The cost for additional guests
            is $15.00.{"\n"}
            {"\n"}
          </Text>
          <Text>
            5. In case of property damages in the VIP space reserved, the party
            host will be charged automatically for the cost of the damages
            incurred.{"\n"}
            {"\n"}
          </Text>
          <Text>
            6. We expect an appropriate conduct from all guests. Any
            innapropriate incident may cause VIP or club suspension, depending
            on the severity of the case. We are not required to issue refunds.
            {"\n"}
            {"\n"}
          </Text>

          <Text>
            7. Kweens Klub reserves the right of admission.{"\n"}
            {"\n"}
          </Text>
        </Text>
      </View>
      <Pressable style={styles.reserveVIPbutton} onPress={onPressHandler}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  container: {
    height: '100%',
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10
  },
  text: {
    color: "white",
    fontSize: 14,
    padding: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
  },
  reserveVIPbutton: {
    backgroundColor: "red",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
