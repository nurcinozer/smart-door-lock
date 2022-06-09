import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth, firestore } from "../firebase";
import { useState, useRef, useEffect } from "react";
import { SIZES, styles1, styles2 } from "../constants";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShareKey = () => {
  const [verificationId, setVerificationId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);
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

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
      console.log(JSON.stringify(verificationId));
      AsyncStorage.setItem('token', JSON.stringify(verificationId))
      // AJOnW4TEPrObVvYN41FJ36hFytPfY9XkmPAFShXD2PN9kR9DsNb-y9LQV1Pwz9EDw5inrSKgXhV6XLSzXF5rv-5nkrZn8surf5C4GZQm5SAbxwD3j0_qNvpg0E5sSdfzzBNJf0aabT0FHSPc-c1AepgjkN0bpW1v9WBqZltTyBcRLtrd7fL3RUjWK1FPEbBKCroD_sXRPVwaoDXli8CbC0i2OIeZ6-wU1w10H7bbTzytEjdLtDOy7KY
  };

  // const confirmCode = () => {
  //   const credential = firebase.auth.PhoneAuthProvider.credential(
  //     verificationId,
  //     code
  //   );
  //   auth.signInWithCredential(credential).then((result) => {
  //     // Do something with the results here
  //     console.log(result);
  //   });
  // };

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
            Share Key
          </Text>
          {isLoggedIn && (
            <View style={styles1.inputContainer}>
              <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
                attemptInvisibleVerification={true}
              />
              {/* Phone Number Input */}
              <TextInput
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoCompleteType="tel"
                style={styles1.input}
              />
              <TouchableOpacity
                onPress={sendVerification}
                style={styles1.button}
              >
                <Text style={styles1.buttonText}>Share Key</Text>
              </TouchableOpacity>
              {/* Verification Code Input */}
              {/* <TextInput
          placeholder="Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles1.input}
        />
        <TouchableOpacity onPress={confirmCode}>
          <Text>Send Verification</Text>
        </TouchableOpacity> */}
            </View>
          )}
          {!isLoggedIn && (
            <Text>You should login or register to share key</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default ShareKey;
