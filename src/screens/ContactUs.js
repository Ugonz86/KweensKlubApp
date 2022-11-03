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
    resetField,
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
        );
      } catch {
        alert(errors);
      }
    } else {
      alert("Please make sure your entries are valid!");
    }
    resetField("name");
    resetField("email");
    resetField("message");
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>
          If you would like to provide us with any feedback, request special
          information or submit a business proposal, please fill out this form
          and let us know about it.
        </Text>
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
              placeholderTextColor="grey"
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
            maxLength: 50,
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
              placeholderTextColor="grey"
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
            required: {
              value: true,
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              minLength={100}
              maxLength={500}
              style={styles.msg}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={true}
              placeholder="Message"
              placeholderTextColor="grey"
              {...register("message")}
            />
          )}
        />
        <Text style={{ fontSize: 13, color: "grey" }}>
          {message.length}/500
        </Text>
      </View>
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
  body: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 375,
  },
  title: {
    width: 375,
    borderRadius: 5,
    color: "lightgrey",
    marginVertical: 10,
    padding: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "lightgrey",
    width: 375,
    height: 40,
    marginVertical: 20,
    borderRadius: 5,
    paddingLeft: 10,
  },
  msg: {
    backgroundColor: "lightgrey",
    width: 375,
    height: 200,
    marginVertical: 20,
    borderRadius: 5,
    paddingTop: 10,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "red",
    borderRadius: 5,
    width: 200
  },
});
