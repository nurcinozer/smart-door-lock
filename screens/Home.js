import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
} from "react-native";
import { COLORS, SIZES, assets, styles1, styles2 } from "../constants";
import { Avatar } from "@rneui/themed";

const Home = ({ navigation }) => {
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
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              top: -45,
              left: 10,
            }}
          >
            <Text
              style={{
                fontSize: SIZES.extraLarge,
                fontWeight: "bold",
              }}
            >
              Home
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: "#0782F9",
                width: 200,
                padding: 15,
                paddingRight: 30,
                borderRadius: 10,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Image source={require("../assets/icons/unlock.png")} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Lock
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", top: -60 }}
          >
            <Avatar
              size="medium"
              rounded
              source={{ uri: "https://i.pravatar.cc/400" }}
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                last access 7.46AM by bilgesu
              </Text>
              <Text style={{ fontWeight: "bold" }}>door was unlocked</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
