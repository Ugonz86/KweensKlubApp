import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  Platform,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ReserverVip() {
  const [currentTime, setCurrentTime] = useState(new Date(Date.now()));
  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));

  const [addUser, setAddUser] = useState(1);

  const [tablesAvailable, setTablesAvailable] = useState(4);

  function showDatePicker() {
    setDatePicker(true);
  }

  function showTimePicker() {
    setTimePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  const handleIncrement = () => {
    if (addUser < 10) {
      setAddUser(addUser + 1);
      console.log(addUser);
    }
  };

  const handleDecrease = () => {
    if (addUser > 1) {
      setAddUser(addUser - 1);
      console.log(addUser);
    }
  };

  const handleSubmit = (data, e) => {
    // e.preventDefault();
    //Somehow implement the username(email) in the notification you will send
   
      setAddUser();
      setDate();
      setTime();
      console.log(addUser, "Guests", date.toDateString(), time.toLocaleTimeString(["en-US"], { hour: '2-digit', minute: '2-digit' }), "data submitted");
      
   
    handleTables();
  };

  const handleReservation = () => {
    //if tablesAvailable is > 0 and addUser > 1,
    //set date, time and guest number selected, 
    //then decrement the current table number 
    //and submit to userReservation.
  };

  const handleTables = () => {
    if (tablesAvailable < 4 || tablesAvailable > 1) {
      setTablesAvailable(tablesAvailable - 1);
    } 
  }

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.text}>Date</Text>
      <View style={styles.dateBox}>
        {datePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
            textColor="white"
            // dateFormat="day month"
            minimumDate={new Date(Date.now())}
            // maximumDate={new Date(2023, 30, 1)}
          />
        )}

        {timePicker && (
          <DateTimePicker
            value={time}
            mode={"time"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={false}
            onChange={onTimeSelected}
            style={styles.datePicker}
            textColor="white"
            minuteInterval={30}
          />
        )}

        {!datePicker && (
          <View style={{ margin: 10 }}>
            <Button
              title="Select Date"
              color="grey"
              onPress={showDatePicker}
            ></Button>
          </View>
        )}

        {!timePicker && (
          <View style={{ margin: 10 }}>
            <Button
              title="Select Time"
              color="grey"
              onPress={showTimePicker}
            ></Button>
          </View>
        )}

        <Text style={styles.text2}>
          Selection: {date ? date.toDateString() : currentTime.toDateString()}, {time ? time.toLocaleTimeString(["en-US"], { hour: '2-digit', minute: '2-digit' }) : currentTime.toLocaleTimeString("en-US")}
        </Text>
      </View>

      <Text style={styles.text}>Guests</Text>

      <View style={styles.guestBox}>
        <Pressable onPress={handleIncrement}>
          <FontAwesome5 name="user-plus" size={20} color="grey" />
        </Pressable>

        <Text style={{ color: "red", fontSize: 20, marginHorizontal: 15 }}>
          {addUser ? addUser : 1}
        </Text>

        <Pressable onPress={handleDecrease}>
          <FontAwesome5 name="user-minus" size={20} color="grey" />
        </Pressable>
      </View>

      <Text style={styles.text}>Table Availability</Text>
      <View style={styles.tableBox}>
        <Text style={styles.table}>{tablesAvailable ? tablesAvailable : 4}</Text>
      </View>
      <View style={styles.reserveButton}>
        <Button onPress={handleSubmit} title="Reserve" color="white" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: 400
  },
  text: {
    color: "grey",
    fontSize: 25,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 15,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 20,
  },
  dateBox: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#080808",
    borderRadius: 10,
    marginVertical: 20,
    width: 400,
  },
  guestBox: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#080808",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    marginVertical: 20,
    width: 400,
  },
  tableBox: {
    backgroundColor: "#080808",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    marginVertical: 20,
    width: 400,
    color: "white",
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 160,
    display: "flex",
    color: "white",
  },
  table: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
  },
  reserveButton: {
    backgroundColor: "red",
    borderRadius: 10,
    marginVertical: 20,
  },
});
