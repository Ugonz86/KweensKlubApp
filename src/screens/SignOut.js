import React from "react";
import { Button, View, Text, StyleSheet, Pressable } from "react-native";
import { Auth } from "aws-amplify";

function SignOut({ updateAuthState, str }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState("loggedOut");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }
  return (
    <View style={styles.body}>
          <Text style={styles.text}>Confirm sign out</Text>
                <Pressable
              onPress={signOut}
              style={styles.buttonStyle}
                // style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
            >
                <Text style={styles.btntext}>
                    Sign Out
                </Text>
            </Pressable>
          {/* <Button title="Sign Out" onPress={signOut} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "black",
    height: "100%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
      fontSize: 40,
      fontWeight: "bold",
  },
  buttonStyle: {
      
    //   borderWidth: 2,
    //   background: 'rgb(255,0,0)',
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5
    },
    btntext: {
        fontSize: 20,
        color: 'white'
    }
});

export default SignOut;
