import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "./Feed";
import ContactUs from "./ContactUs";
import SignOut from "./SignOut";
import Memberships from "./Memberships";
import Events from "./Events";
import ReserveVip from "./ReserveVip";
import AboutUs from "./AboutUs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Pressable, Text, TouchableOpacity } from "react-native";
import { Auth, autoShowTooltip } from "aws-amplify";

const Drawer = createDrawerNavigator();

function Home({ updateAuthState, navigation }) {
  // const onPressHandler = () => {
  //   navigation.navigate("SignOut");
  // };

  // async function signOut() {
  //   try {
  //     await Auth.signOut();
  //     updateAuthState("loggedOut");
  //   } catch (error) {
  //     console.log("Error signing out: ", error);
  //   }
  // }

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
          // gestureEnabled: true,
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
      {/* <TouchableOpacity
        onPress={onPressHandler}
        style={styles.signOut}
      >
        <FontAwesome5 name="sign-out-alt" size={25} color={"#999999"} />
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity> */}
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navContainer: {},
  signOut: {
    alignItems: "center",
    justifyContent: "center",
    // padding: 40,
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
});

export default Home;
