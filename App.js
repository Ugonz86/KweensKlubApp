import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import Amplify, { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import awsmobile from "./aws-exports";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import ConfirmSignUp from "./src/screens/ConfirmSignUp";
import Home from "./src/screens/Home";
// import Navigation from "./Navigation";
import Landing from "./src/screens/Landing";
import Messages from "./src/screens/ContactUs";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
// import { createDrawerNavigator } from "@react-navigation/drawer";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

Amplify.configure(awsmobile);

// import { withAuthenticator } from 'aws-amplify-react-native';

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthenticationNavigator = (props) => {
  return (
    <AuthenticationStack.Navigator headerShown={"none"} >
      <AuthenticationStack.Screen name="Sign In" options={{
          
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {(screenProps) => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} options={{
          title: 'Sign Up',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <AppStack.Navigator headerMode={"none"}>
      <AppStack.Screen name="Home">
        {(screenProps) => (
          <Home {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

const Initializing = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 100000);
    return () => clearTimeout(timer);
  }, []);

  console.log('initializing...')
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'black' }}>
      {/* <ActivityIndicator size="large" color="red"/> */}
      {show ? <ActivityIndicator size="large" color="red" /> : <Landing />}
    </View>
  );
};

// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState("initializing");

  // const [fontLoaded, setFontLoaded] = useState(false);
  // if(!fontLoaded) {
  //   return <AppLoading
  //     startAsync = { fetchFonts }
  //     onError = { console.warn }
  //     onFinish = { () => setFontLoaded(true) }
  //   />
  // }

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log("✅ User is signed in");
      setUserLoggedIn("loggedIn");
    } catch (err) {
      console.log("❌ User is not signed in");
      setUserLoggedIn("loggedOut");
    }
  }

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
      <NavigationContainer>
        {isUserLoggedIn === "initializing" && <Initializing />}
        {isUserLoggedIn === "loggedIn" && (
          <AppNavigator updateAuthState={updateAuthState} />
        )}
        {isUserLoggedIn === "loggedOut" && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
        )}
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "black",
    
}
});

export default App;
