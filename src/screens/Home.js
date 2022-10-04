// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { Auth } from 'aws-amplify';

// export default function Home({ updateAuthState }) {
//   async function signOut() {
//     try {
//       await Auth.signOut();
//       updateAuthState('loggedOut');
//     } catch (error) {
//       console.log('Error signing out: ', error);
//     }
//   }
//   return (
//     <View style={styles.container}>
//           <Text> 💙 + 💛</Text>
//           <Text> H E L L O   W O R L D</Text>
//       <Button title="Sign Out" color="tomato" onPress={signOut} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: 20
//   }
// });

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "./Feed";
import Landing from "./Landing";
import ContactUs from "./ContactUs";
import SignOut from "./SignOut";
import Memberships from "./Memberships";
import Events from "./Events";
import ReserveVip from "./ReserveVip";
import AboutUs from "./AboutUs";
// import Modal from "./Modal";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Button, Pressable, Text, Image, View } from "react-native";
import { Auth, autoShowTooltip } from "aws-amplify";
// import CustomSidebarMenu from '../components/CustomSidebarMenu';
const Drawer = createDrawerNavigator();

// function BarImage() {
//   return (
//     <View>
//       <Image source={require("../images/kklogo2.png")} style={styles.image} />
//     </View>
//   );
// }

function Home({ updateAuthState, navigation }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState("loggedOut");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }

  // const onPressHandler = () => {
  //   // navigation.navigate('Screen_B');
  //   navigation.navigate("Landing");
  // };

  return (
    <NavigationContainer independent={true} style={styles.navContainer}>
      <Drawer.Navigator
        initialRouteName="Feed"
        // drawerPosition="left"
        // drawerType="front"
        // edgeWidth={200}
        // hideStatusBar={false}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "black",
            width: 450,
            paddingTop: 100,
          },
          // headerTitle: '',

          //*****Header LOGO */
          //   headerTitle: () => (
          //     <Image
          //       style={styles.logo}
          //       source={require("../images/kklogo2.png")}
          //     />
          //   ),

          headerShown: true,
          swipeEnabled: true,
          gestureEnabled: true,
          headerTitleAlign: "center",

          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTintColor: "#999999",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      >
        {/* <Drawer.Screen
          name="Landing"
          component={Landing}
          screenOptions={{
            fontSize: 40,
          }}
          options={{
            labelStyle: {
              fontSize: 40,
            },
            title: "",
            drawerActiveBackgroundColor: "transparent",
            drawerInactiveTintColor: "#999999",
            // drawerActiveTintColor: "white",
            drawerLabelStyle: {
              fontSize: 20,
            },
            drawerIcon: () => (
              // <FontAwesome5
              //   name="home"
              //   size={focused ? 60 : 40}
              //   color={focused ? "red" : "#999999"}
              // />
              <Image
                source={require("../images/kklogo2.png")}
                // color={focused ? "red" : "#999999"}
                style={styles.logo}
              />
            ),
          }}
        /> */}

        <Drawer.Screen
          //   drawerContentOptions={{
          //     // activeTintColor: "yellow",

          //     labelStyle: {
          //     //   fontSize: 100,
          //       color: "yellow",
          //     },
          //   }}
          name="Feed"
          component={Feed}
          options={{
            title: "Upcoming Event",
            drawerActiveBackgroundColor: "#1b1b1b",
            drawerInactiveTintColor: "#999999",
            drawerActiveTintColor: "white",
            drawerLabelStyle: { fontSize: 20 },
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="house-user"
                size={focused ? 60 : 40}
                color={focused ? "red" : "#999999"}
                style={{ marginRight: 40 }}
              />
              // <Image source={require('../images/Frame.png')} style={styles.image} />
            ),
          }}
        />

        <Drawer.Screen
          name="Events"
          component={Events}
          options={{
            title: "Events",
            drawerActiveBackgroundColor: "#1b1b1b",
            drawerInactiveTintColor: "#999999",
            drawerActiveTintColor: "white",
            drawerLabelStyle: { fontSize: 20 },
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="calendar-alt"
                size={focused ? 60 : 40}
                color={focused ? "red" : "#999999"}
                style={{ marginRight: 50 }}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Memberships"
          component={Memberships}
          options={{
            title: "Memberships",
            drawerActiveBackgroundColor: "#1b1b1b",
            drawerInactiveTintColor: "#999999",
            drawerActiveTintColor: "white",
            drawerLabelStyle: { fontSize: 20 },
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="address-card"
                size={focused ? 60 : 40}
                color={focused ? "red" : "#999999"}
                style={{ marginRight: 40 }}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="ReserveVip"
          component={ReserveVip}
          options={{
            title: "Reserve VIP",
            drawerActiveBackgroundColor: "#1b1b1b",
            drawerInactiveTintColor: "#999999",
            drawerActiveTintColor: "white",
            drawerLabelStyle: { fontSize: 20 },
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="gem"
                size={focused ? 60 : 40}
                color={focused ? "red" : "#999999"}
                style={{ marginRight: 40 }}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            title: "About Us",
            drawerActiveBackgroundColor: "#1b1b1b",
            drawerInactiveTintColor: "#999999",
            drawerActiveTintColor: "white",
            drawerLabelStyle: { fontSize: 20 },
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="dna"
                size={focused ? 60 : 40}
                color={focused ? "red" : "#999999"}
                style={{ marginRight: 52 }}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            title: "Contact Us",
            drawerActiveBackgroundColor: "#1b1b1b",
            drawerInactiveTintColor: "#999999",
            drawerActiveTintColor: "white",
            drawerLabelStyle: { fontSize: 20 },
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="envelope"
                size={focused ? 60 : 40}
                color={focused ? "red" : "#999999"}
                style={{ marginRight: 46 }}
              />
            ),
          }}
        />

        {/* <Drawer.Screen
          name="Modal"
          component={Modal}
          options={{
            title: "Modal",
            drawerActiveBackgroundColor: "#1b1b1b",
            drawerInactiveTintColor: "#999999",
            drawerActiveTintColor: "white",
            drawerLabelStyle: { fontSize: 20 },
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="envelope"
                size={focused ? 60 : 40}
                color={focused ? "red" : "#999999"}
                style={{ marginRight: 46 }}
              />
            ),
          }}
        /> */}

        <Drawer.Screen
          name="SignOut"
          component={SignOut}
          screenOptions={{
            fontSize: 40,
          }}
          options={{
            labelStyle: {
              fontSize: 40,
            },
            title: "Sign Out",
            drawerActiveBackgroundColor: "#1b1b1b",
            drawerInactiveTintColor: "#999999",
            drawerActiveTintColor: "white",
            drawerLabelStyle: { fontSize: 20 },
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="sign-out-alt"
                size={focused ? 60 : 40}
                color={focused ? "red" : "#999999"}
                style={{ marginRight: 46 }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
      {/* <Button title="Sign Out" color="primary" onPress={signOut} /> */}

      <Pressable
        onPress={signOut}
        style={styles.signOut}
        // style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
      >
        <Text style={styles.text}>Sign Out</Text>
      </Pressable>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    // top: 50
    
  },
  signOut: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "black",
  },
  text: {
    color: "#999999",
    fontSize: 20,
  },
  logo: {
    width: 60,
    height: 60,
    tintColor: "white",
    marginBottom: 80,
    alignSelf: "center",
  },
  // logoHeader: {
  //   backgroundColor: 'black',
  //   height: 130,
  //   // top: 12,
  //   paddingTop: 50,
  //   alignItems: 'center',
  //   justifyContent:'center'
  // }
});

export default Home;
