import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";

export default function EventsView() {
  const [data, setData] = useState([
    {
      id: 1,
      day: 1,
      month: "Jan",
      performer: "Valentina",
      time: "10:00 pm to 1:00 am",
      description: "Enter event description here.",
      promo: require("../images/valentina.png"),
    },
    {
      id: 2,
      day: 2,
      month: "Feb",
      performer: "Vangie",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: require("../images/vangie.png"),
    },
    {
      id: 3,
      day: 3,
      month: "Mar",
      performer: "Alexis Mateo",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: require("../images/alexismateo.png"),
    },
    {
      id: 4,
      day: 4,
      month: "Apr",
      performer: "Alyssa Hunter",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: require("../images/alyssahunter.png"),
    },
    {
      id: 5,
      day: 5,
      month: "May",
      performer: "Bianca Del Rio",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: "",
      promo: require("../images/bianca.png"),
    },
    {
      id: 6,
      day: 6,
      month: "Jun",
      performer: "Jorgeous",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: require("../images/jorgeous.png"),
    },
    {
      id: 7,
      day: 7,
      month: "Jul",
      performer: "Shangela",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: require("../images/shangela.png"),
    },
    {
      id: 8,
      day: 8,
      month: "Aug",
      performer: "Katya",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: "", //image
    },
    {
      id: 9,
      day: 9,
      month: "Sep",
      performer: "Trixie Matell",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: "", //image
    },
    {
      id: 10,
      day: 10,
      month: "Oct",
      performer: "Jujubee",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: "", //image
    },
    {
      id: 11,
      day: 11,
      month: "Nov",
      performer: "Jada Essence Hall",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: "", //image
    },
    {
      id: 12,
      day: 12,
      month: "Dec",
      performer: "Monet X Change",
      time: "10:00 pm - 1:00 am",
      description: "Lorem ipsum dolor sit amet, elit consectetur",
      promo: "", //image
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const eventClickListener = (event) => {
    console.log(event, "SUCCESS");
    setSelectedEvent(event);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
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
              On {selectedEvent.month} {selectedEvent.day}
              {"\n"}
              Guest Performer - {selectedEvent.performer}
              {"\n"}
              From {selectedEvent.time}
              {"\n"}
              {"\n"}
              Event Details: {"\n"}
              {selectedEvent.description}
              {"\n"}
            </Text>
            <Image style={styles.image} source={selectedEvent.promo} />
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        enableEmptySections={true}
        style={styles.eventList}
        data={data}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => eventClickListener(item)}>
              <View style={styles.eventBox}>
                <View style={styles.eventDate}>
                  <Text style={styles.eventDay}>{item.day}</Text>
                  <Text style={styles.eventMonth}>{item.month}</Text>
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTime}>{item.time}</Text>
                  <Text style={styles.userName}>{item.performer}</Text>
                  <Text style={styles.description}>
                    Click for event details
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingBottom: 50,
    width: '100%'
  },
  eventList: {
    // marginTop: 20,
  },
  eventBox: {
    width: 400,
    padding: 20,
    flexDirection: "row",
  },
  eventDate: {
    flexDirection: "column",
  },
  eventDay: {
    fontSize: 50,
    color: "white",
    fontWeight: "600",
  },
  eventMonth: {
    fontSize: 16,
    color: "#999999",
    fontWeight: "600",
  },
  eventContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
    backgroundColor: "#080808",
    padding: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  description: {
    fontSize: 15,
    color: "#999999",
  },
  eventTime: {
    fontSize: 18,
    color: "white",
  },
  userName: {
    fontSize: 16,
    color: "red",
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080808",
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    width: 386,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "white",
    width: 60,
    borderRadius: 10,
  },
  textStyle: {
    color: "red",
    textAlign: "center",
    shadowColor: "red",
    fontSize: 15,
    shadowRadius: 3,
    shadowOpacity: 3,
    shadowOffset: 3,
  },
  modalText: {
    fontSize: 20,
    color: "white",
    marginBottom: 15,
  },
  image: {
    // resizeMode: 'contain',
    height: 400,
    width: 300,
    marginBottom: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
  },
});

// console.disableYellowBox = true;
