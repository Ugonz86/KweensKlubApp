import React, { useState, useEffect } from "react";
import { API, Storage, Auth } from "aws-amplify";
import { listEvents } from "../graphql/queries";
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
  const [data, setData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  async function fetchEvents() {
    const apiData = await API.graphql({
      query: listEvents,
      variables: {
        filter: {

        },
      },
    });
    const eventsFromAPI = apiData.data.listEvents.items.filter(
      (event) => Date.parse(event.date + " " + event.year) > Date.now()
    );

    eventsFromAPI.sort((a, b) => {
      return (
        Date.parse(a.date + " " + a.year) > Date.parse(b.date + " " + b.year)
      );
    });

    const formatEvents = [];
    eventsFromAPI.forEach(async (event) => {
      if (!event.image && event.name) {
        const url = await Storage.get(event.name);
        event.image = url;

        return event;
      }
      const dat = new Date(event.date + " " + event.year);
      formatEvents.push({
        id: event.id,
        name: event.name,
        content: event.content,
        weekDay: dat.toLocaleString("default", { weekday: "short" }),
        day: dat.getDate(),
        month: dat.toLocaleString("default", { month: "short" }),
        startTime: event.startTime,
        endTime: event.endTime,
        year: event.year,
        image: event.image
      });      
    });
    setData(formatEvents);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventClickListener = (event) => {
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
              <Text style={{}}>
                <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                  On {selectedEvent.weekDay}, {selectedEvent.month} {selectedEvent.day}
                  {"\n"}
                </Text>
                <Text style={{ fontWeight: "bold", color: "red" }}>
                  {selectedEvent.name}
                </Text>
                {"\n"}
                From {selectedEvent.startTime} to {selectedEvent.endTime}
                {"\n"}
                {"\n"}
              </Text>
              {selectedEvent.content}
              {"\n"}
            </Text>
            <Image style={styles.image} source={{uri: selectedEvent.image}} />
          </View>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </Modal>
{data ? 
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
                  <Text style={styles.eventMonth}>{item.weekDay}</Text>
                  <Text style={styles.eventDay}>{item.day}</Text>
                  <Text style={styles.eventMonth}>{item.month}</Text>
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTime}>
                    {item.startTime}-{item.endTime}
                  </Text>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.description}>
                    Click for event details
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      /> : <Text style={{color: 'white', textAlign: 'center'}}>We are working on new events at the moment.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingBottom: 50,
  },
  eventList: {
  },
  eventBox: {
    width: 400,
    padding: 20,
    flexDirection: "row",
  },
  eventDate: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  eventDay: {
    fontSize: 30,
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
    borderWidth: 1,
    borderColor: "grey",
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
    fontWeight: "bold",
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080808",
    paddingBottom: 50,
  },
  modalView: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 375,
    borderRadius: 10,
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

    fontSize: 15,
  },
  modalText: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    padding: 10,
  },
  image: {
    height: 475,
    width: 375,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
  },
});
