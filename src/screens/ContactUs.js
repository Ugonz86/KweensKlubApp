import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { API } from "aws-amplify";
import { createCandidate } from "../graphql/mutations";

export default function App() {
  let renderCount = 0;
  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  renderCount++;

  const message = watch("message");
  // console.log(watch(message))

  const onSubmit = async (data, e) => {
    e.preventDefault();

    if (data) {
      try {
        await API.graphql({
          query: createCandidate,
          variables: {
            input: data,
          },
        }).then(
          alert("Your message has been submitted. Thank you!"),
          console.log("success!")
        );
      } catch {
        alert(errors);
        console.log("error");
      }
    } else {
      alert("Please make sure your entries are valid!");
      console.log("invalid");
    }
    console.log(data);
  };

  return (
    <View style={styles.container}>
      {errors.name && (
        <Text style={{ color: "red" }}>This field is required.</Text>
      )}
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
          minLength: 5,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Full Name"
            {...register("name")}
          />
        )}
      />

      {errors.email && (
        <Text style={{ color: "red" }}>This field is required.</Text>
      )}
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          maxLength: 25,
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            {...register("email")}
          />
        )}
      />

      {errors.message && (
        <Text style={{ color: "red" }}>This field is required.</Text>
      )}
      <Controller
        name="message"
        defaultValue=""
        control={control}
        renderCount={renderCount}
        rules={{
          required: true,
          minLength: 50,
          maxLength: 500,
          validation: {},
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.msg}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
            placeholder="Message"
            {...register("message")}
          />
        )}
      />
      <Text style={{ fontSize: 13, color: "grey" }}>{message.length}/500</Text>
      <View style={styles.submitButton}>
        <Button
          color="white"
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "lightgrey",
    width: 350,
    height: 40,
    marginVertical: 20,
    borderRadius: 5,
    paddingLeft: 10,
  },
  msg: {
    backgroundColor: "lightgrey",
    width: 350,
    height: 200,
    marginVertical: 20,
    borderRadius: 5,
    paddingTop: 10,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "red",
    borderRadius: 5,
    top: 50,
  },
});
