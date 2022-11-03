import React, { useState, useEffect } from "react";
import { API, Storage, Auth } from "aws-amplify";
import Amplify from "aws-amplify";
import { listReservations } from "../graphql/queries";
import {
  deleteReservation as deleteReservationMutation,
  updateReservation as updateReservationMutation,
} from "../graphql/mutations";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";

export default function Reservations({ navigation }) {
  const [userName, setUserName] = useState(Auth.user.username);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    const apiData = await API.graphql({
      query: listReservations,
      variables: {
        filter: {
          user: {
            eq: Auth.user.attributes.email,
          },
        },
      },
    });
    const reservationsFromAPI = apiData.data.listReservations.items;
    console.log(reservationsFromAPI);
    const consolidatedReservations = [];
    reservationsFromAPI.forEach((reservation) => {
      // Search if consolidatedReservations already has a reservation with the same date;
      // ind will be -1 if no reservation with the same date is found
      let ind = consolidatedReservations.findIndex((item) => {
        return (
          item.date == reservation.date && item.status == reservation.status
        );
      });

      if (ind < 0) {
        //Create object for consolidated reservation and added to new array
        consolidatedReservations.push({
          date: reservation.date,
          party: reservation.party,
          time: reservation.time,
          status: reservation.status,
          consolidatedIDs: [reservation.id],
        });
      } else {
        //If consolidated reservation already exists, then add reservation ID from dynamo DB to consolidatedIDs prop
        consolidatedReservations[ind]["consolidatedIDs"].push(reservation.id);
      }
    });
    console.log(consolidatedReservations);

    setReservations(consolidatedReservations);
  }

  async function cancelReservation(ids) {
    const data = {
      status: "canceled",
    };
    for (let i = 0; i < ids.length; i++) {
      data["id"] = ids[i];
      console.log(data);
      await API.graphql({
        query: updateReservationMutation,
        variables: { input: data },
      });
    }
    alert("Your reservation has been canceled!");
    fetchReservations();
  }

  const onPressHandler = () => {
    navigation.navigate("ReserveVip");
    // navigation.goBack();
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            // color: "white",
            // flex: 1,
            fontSize: 20,
            // backgroundColor: "yellow",
            width: 400,
            padding: 10,
            marginVertical: 10,
          }}
        >
          {reservations.map((res, index) => (
            <View
              key={index}
              id={index}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <View style={styles.resContainer}>
                <Text style={{ color: "white" }}>
                  Your reservation on {res.date} at {res.time}
                  {"\n"}
                  {"\n"} Party of: {res.party} guests
                  {"\n"}
                </Text>
                <Text style={{ color: "grey", marginVertical: 5 }}>
                  To modify your reservation, please contact us at
                  support@kweensklub.com.
                </Text>

                {res.status == "canceled" ? (
                  <Text style={styles.cancelled}> Canceled </Text>
                ) : (
                  <Pressable
                    onPress={() => cancelReservation(res.consolidatedIDs)}
                    style={styles.reserveVIPbutton}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <Pressable onPress={onPressHandler} style={styles.reserveVIPbutton}>
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
    // height: '100%',
  },
  container: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
  },
  reserveVIPbutton: {
    backgroundColor: "red",
    borderRadius: 10,
    // marginBottom: 20,
    width: 100,
    // textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  resContainer: {
    backgroundColor: "#171717",
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    width: 375,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelled: {
    color: "red",
    padding: 10,
  },
});
