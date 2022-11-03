import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "./Feed";
import ContactUs from "./ContactUs";
import Memberships from "./Memberships";
import Events from "./Events";
import ReserveVip from "./ReserveVip";
import Reservations from "./Reservations";
import MoreInfo from "./MoreInfo";
import AboutUs from "./AboutUs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Text, Image, View } from "react-native";
import { Auth } from "aws-amplify";

const Drawer = createDrawerNavigator();

function Home({ updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState("loggedOut");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }

  const SignOut = () => {
    signOut();
    console.log("Signed Out!");
  };

  return (

    <NavigationContainer independent={true} style={styles.navContainer}>
      <Drawer.Navigator
        initialRouteName="Feed"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "black",
            width: 450,
            paddingTop: 100,
          },
          headerShown: true,
          swipeEnabled: true,
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
        <Drawer.Screen
          name="Feed"
          component={Feed}
          options={{
            title: "Home",
            headerTitle: "Our next event",
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
            ),
          }}
        />

        <Drawer.Screen
          name="Events"
          component={Events}
          options={{
            title: "Upcoming Events",
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
          name="Reservations"
          component={Reservations}
          options={{
            title: "Reservations",
            drawerInactiveTintColor: "#999999",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />

        <Drawer.Screen
          name="MoreInfo"
          component={MoreInfo}
          options={{
            title: "More Info",
            drawerInactiveTintColor: "#999999",
            drawerItemStyle: {
              display: "none",
            },
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
        ></Drawer.Screen>
        

      </Drawer.Navigator>
    </NavigationContainer>
         

  );
}

const styles = StyleSheet.create({
  navContainer: {},
  signOut: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "black",
  },
  text: {
    color: "#999999",
    fontSize: 15,
  },
  // logo: {
  //   width: 60,
  //   height: 60,
  //   tintColor: "white",
  //   marginBottom: 80,
  //   alignSelf: "center",
  // },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    tintColor: "white",
  },
});

export default Home;
