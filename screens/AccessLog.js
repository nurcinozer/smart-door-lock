import React from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { auth, firestore } from "../firebase";
import { useState, useEffect } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { SIZES } from "../constants";

const AccessLog = ({ navigation }) => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setInfo((arr) => [...arr, data]);
        });
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "start",
            top: 70,
          }}
        >
          <Text
            style={{ fontSize: SIZES.extraLarge, fontWeight: "bold", left: 10 }}
          >
            Access Log
          </Text>
          <ScrollView
            style={{
              top: 20,
              maxHeight: 600,
            }}
          >
            {info &&
              info.length > 0 &&
              info.map((log, index) => {
                return (
                  <ListItem key={index} bottomDivider>
                    <Avatar
                      source={{
                        uri: "https://gravatar.com/avatar/8a41c8482a1875f91bd972a6210432dc?s=400&d=robohash&r=x",
                      }}
                    />
                    <ListItem.Content>
                      <ListItem.Title>{log.displayName}</ListItem.Title>
                      <ListItem.Subtitle>{log.createdAt}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                );
              })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AccessLog;
