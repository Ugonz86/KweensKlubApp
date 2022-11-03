import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { listEvents } from "../graphql/queries";
import { API, Storage, Auth } from "aws-amplify";

Auth.currentAuthenticatedUser().then((user) => {
  console.log("Hello!", user.attributes.email);

})

export default function Feed({ navigation }) {
  const [event, setEvent] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const apiData = await API.graphql({
      query: listEvents,
      variables: {
        filter: {},
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

    setEvent(eventsFromAPI[0]);
    console.log(eventsFromAPI[0]);
  }

  const onPressHandler = () => {
    navigation.navigate("ReserveVip");
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      {event ? (
        <View style={styles.container}>
          <Text style={styles.date}>{event.date}</Text>
          <Image source={{ uri: event.image }} style={styles.image} />
          <Pressable style={styles.buttonContainer} onPress={onPressHandler}>
            <Text style={styles.button}>Reserve VIP</Text>
          </Pressable>
          <View style={styles.container}>
            {/* <Text style={styles.content}>{event.content}</Text> */}
 
          </View>
        </View>
      ) : (
        <Text style={{ color: "white" }}>Stay tuned.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
  },
  container: {
    // flex: 1,
    // position: "absolute",
    // backgroundColor: "black",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    marginVertical: 20,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    width: 375,
    height: 470,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonContainer: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  button: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
