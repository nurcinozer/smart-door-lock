import React, { useEffect, useState } from "react";
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
import { auth } from "../firebase";

const Home = ({ navigation }) => {
  const [lock, setLock] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
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
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              margin: "-50%",
              textAlign: "left",
              width: "100%",
              left: 10,
              fontSize: SIZES.extraLarge,
              fontWeight: "bold",
            }}
          >
            Lock/Unlock Door
          </Text>
          {isLoggedIn && (
            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
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
                  onPress={() => setLock(!lock)}
                >
                  {lock ? (
                    <Image source={require("../assets/icons/lock.png")} />
                  ) : (
                    <Image source={require("../assets/icons/unlock.png")} />
                  )}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {lock ? "Unlock" : "Lock"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", marginTop: 50}}
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
          )}
          {!isLoggedIn && (
            <Text>You should login or register to lock/unlock door</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
