import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { listReservations } from "../graphql/queries";
import {
  createReservation as createReservationMutation,
  updateReservation as updateReservationMutation,
} from "../graphql/mutations";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const times = [
  {
    id: 1,
    time: "9:00 PM",
  },
  {
    id: 2,
    time: "9:30 PM",
  },
  {
    id: 3,
    time: "10:00 PM",
  },
  {
    id: 4,
    time: "10:30 PM",
  },
  {
    id: 5,
    time: "11:00 PM",
  },
  {
    id: 6,
    time: "11:30 PM",
  },
  {
    id: 7,
    time: "12:00 PM",
  },
];

export default function ReserverVip({ navigation, fetchReservations }) {
  // const [currentTime, setCurrentTime] = useState(new Date(Date.now()));

  // const [date, setDate] = useState(new Date());

  // const [time, setTime] = useState(new Date(Date.now()));

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [party, setParty] = useState(1);

  const [tablesAvailable, setTablesAvailable] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(-1);

  const [selectedTime, setSelectedTime] = useState(-1);

  const [reservations, setReservations] = useState([]);

  const handleDateClick = (index) => {
    setDate(reservations[index].date);
    setSelectedDate(index);
    setSelectedTime(-1); //Reset time selection
    setTime(""); //Reset time selection
    setTablesAvailable(reservations[index].available);
    console.log("Date selected is" + " ", index);
  };

  const handleTimeClick = (index) => {
    setSelectedTime(index);
    setTime(times[index].time);
    console.log(selectedTime);
    console.log("Time Selected is" + " ", index);
  };

  const makeReservation = async (event) => {
    event.preventDefault();
    console.log(date);
    const apiData = await API.graphql({
      query: listReservations,
      variables: {
        filter: {
          date: {
            eq: date,
          },
          party: {
            eq: 0,
          },
        },
      },
    });
    const reservationsFromAPI = apiData.data.listReservations.items;
    const tablesAvailableIds = reservationsFromAPI.map((item) => item.id);
    const tablesAvailable = tablesAvailableIds.length;
    const tablesNeeded = Math.ceil(party / 5);

    const data = {
      time: time,
      party: party,
      user: Auth.user.attributes.email,
      status: "reserved",
      name: "Luis",
    };

    if (tablesAvailable < tablesNeeded) {
      //If there are no sufficient tables available for total number of guests
      alert(
        "Not enough availability for party of " +
          party +
          ". Please reduce party size or check availability for another date."
      );
    } else {
      for (let i = 0; i < tablesNeeded; i++) {
        data["id"] = tablesAvailableIds[i];
        await API.graphql({
          query: updateReservationMutation,
          variables: { input: data },
        }).then(setModalVisible(true));
      }
    }
    setSelectedDate(-1);
    setSelectedTime(-1);
    setParty(1);
  };

  async function fetchReservations() {
    const apiData = await API.graphql({
      query: listReservations,
      variables: {
        filter: {
          date: {
            // ge: 'Mon',
          },
        },
      },
    });
    const dateNow = new Date(Date.now());
    const year = dateNow.getFullYear();
    const reservationsFromAPI = apiData.data.listReservations.items.filter(
      (reservation) =>
        Date.parse(reservation.date + " " + year + " 00:30:00") > Date.now()
    );
    reservationsFromAPI.sort((a, b) => {
      return Date.parse(a.date + " " + year) > Date.parse(b.date + " " + year);
    });
    const uniqueDates = [
      ...new Set(reservationsFromAPI.map((item) => item.date)), // Filter unique dates
    ];
    const dates = []; // Array to store objects for each unique date
    uniqueDates.forEach((element, index) => {
      // Push each unique date in an object and assigned ID
      dates.push({ date: element, id: index });
    });
    reservationsFromAPI.forEach((element) => {
      // Add the number of available slots/tables for each unique date
      if (element.status == "open") {
        const ind = dates.findIndex((object) => {
          return object.date == element.date;
        });
        if (ind >= 0) {
          dates[ind]["available"]
            ? (dates[ind]["available"] = dates[ind]["available"] + 1)
            : (dates[ind]["available"] = dates[ind]["available"] = 1);
        }
      }
    });
    console.log(dates);
    setReservations(dates);
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleIncrement = () => {
    if (party < 25) {
      setParty(party + 1);
      console.log(party);
    }
  };

  const handleDecrease = () => {
    if (party > 1) {
      setParty(party - 1);
      console.log(party);
    }
  };

  const goToReservations = () => {
    navigation.navigate("Reservations");
    setModalVisible(false);
  };

  const goToContactUs = () => {
    navigation.navigate("ContactUs");
  };

  const goToMoreInfo = () => {
    navigation.navigate("MoreInfo");
    setModalVisible(false);
  };

  return (
    <SafeAreaView as="form" style={styles.body}>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Your VIP Reservation Confirmation
            </Text>
            <Text style={styles.confirmationText}>
              {/* On {date.toDateString()} at{" "}
              {time.toLocaleTimeString(["en-US"], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {"\n"} For {party} guest(s) */}
              On {date} at {time}
              {"\n"}For {party} guest(s)
            </Text>
            <TouchableOpacity onPress={goToContactUs}>
              <Text style={styles.modalCaption}>
                The next step to secure your reservation is by sending a $55.75
                deposit via ATH Movil to Kweens1211, otherwise, please{" "}
                <Text style={{ color: "red", textDecorationLine: "underline" }}>
                  contact us{" "}
                </Text>
                directly.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToMoreInfo}>
              <Text style={styles.modalCaption}>
                Please read our reservation rules{" "}
                <Text style={{ color: "red", textDecorationLine: "underline" }}>
                  here
                </Text>
                .
              </Text>
            </TouchableOpacity>
          </View>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </Modal>

      <View style={styles.slotsContainer}>
        <Text style={styles.text}>Select a date</Text>
        <ScrollView contentContainerStyle={styles.dateBox} horizontal={true}>
          {reservations.map((item, index) => (
            <View style={styles.slots} key={item.id} id={item.id}>
              <Pressable
                value={date}
                onPress={() => handleDateClick(index)}
                style={{
                  backgroundColor: selectedDate === index ? "red" : "#080808",
                  borderRadius: 10,
                  borderWidth: 0.5,
                }}
              >
                <Text style={styles.dateTimeSlot}>{item.date}</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
      {date ? (
        <View style={styles.slotsContainer}>
          <Text style={styles.text}>Arrival time</Text>
          {tablesAvailable >= 1 ? (
            <ScrollView
              contentContainerStyle={styles.dateBox}
              horizontal={true}
            >
              {times.map((item, index) => (
                <View style={styles.slots} key={item.id} id={item.id}>
                  <Pressable
                    value={time}
                    onPress={() => handleTimeClick(index)}
                    style={{
                      backgroundColor:
                        selectedTime === index ? "red" : "#080808",
                      borderRadius: 10,
                    }}
                  >
                    <Text style={styles.dateTimeSlot}>{item.time}</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.dateBox2}>
              <Text style={{ color: "white", textAlign: "center" }}>
                Sorry, there are no tables available on this date. {"\n"}Please
                select another date.
              </Text>
            </View>
          )}
        </View>
      ) : null}
      <View style={styles.guestContainer}>
        <Text style={styles.text}>Number of guests</Text>
        <View style={styles.guestBox}>
          <Pressable onPress={handleDecrease}>
            <FontAwesome5 name="user-minus" size={20} color="grey" />
          </Pressable>
          <Text style={{ color: "white", fontSize: 20, marginHorizontal: 15 }}>
            {party ? party : 1}
          </Text>

          <Pressable onPress={handleIncrement}>
            <FontAwesome5 name="user-plus" size={20} color="grey" />
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {date && time ? (
          <View style={styles.submitButton}>
            <Button
              onPress={makeReservation}
              title="Reserve Now"
              color="white"
            />
          </View>
        ) : (
          <View style={styles.submitButton2}>
            <Button
              disabled={true}
              onPress={makeReservation}
              title="Reserve Now"
              color="white"
            />
          </View>
        )}
        <View style={styles.reservationHomeButton}>
          <Button
            onPress={goToReservations}
            title="My Reservations"
            color="white"
          />
        </View>

        <View style={styles.reservationHomeButton}>
          <Button onPress={goToMoreInfo} title="More Info" color="white" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#999999",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 20,
  },
  slotsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 150,
  },
  guestContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 400,
  },
  dateBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171717",
    borderRadius: 10,
    padding: 10,
  },
  dateBox2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171717",
    borderRadius: 10,
    paddingVertical: 20,
    width: 375,
  },
  slots: {
    padding: 10,
    borderRadius: 10,
  },
  dateTimeSlot: {
    color: "white",
    fontSize: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  guestBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#171717",
    paddingVertical: 20,
    borderRadius: 10,
    width: 375,
  },
  submitButton: {
    backgroundColor: "red",
    borderRadius: 10,
    width: 200,
    marginVertical: 10,
  },
  submitButton2: {
    backgroundColor: "#171717",
    borderRadius: 10,
    width: 200,
    marginVertical: 10,
  },
  reservationHomeButton: {
    backgroundColor: "red",
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
  },
  resList: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "red",
    borderRadius: 10,
    marginVertical: 10,
    width: 300,
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "black",
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    width: 375,
    paddingBottom: 50,
  },
  modalText: {
    fontSize: 26,
    color: "#999999",
    marginVertical: 20,
    fontWeight: "bold",
  },
  modalCaption: {
    color: "grey",
    fontSize: 18,
    marginVertical: 10,
    textAlign: "left",
  },
  confirmationText: {
    color: "white",
    fontSize: 20,
    marginVertical: 20,
  },
  textStyle: {
    color: "red",
    marginVertical: 20,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
