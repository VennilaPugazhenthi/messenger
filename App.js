import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  StatusBar,
  SafeAreaView,
  TextInput,
  Keyboard,
} from "react-native";
import axios from "axios";
import { GiftedChat } from "react-native-gifted-chat";

export default function App() {
  const sendMessages = (message) => {
    // axios
    //   .get("http://192.168.86.197:8080/kafka/produce", { message: "Expo" })
    //   .then(() => {
    //     console.log("Sent");
    //   })
    //   .catch((err) => {
    //     console.log("Error: ", err);
    //   });
    var config = {
      method: "get",
      url: "http://192.168.86.197:8080/kafka/produce",
      params: { message: `${message}` },
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMessages = () => {
    var config = {
      method: "get",
      url: "http://192.168.86.197:8080/kafka/messages",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setMessageList(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getMessages();
  }, []);

  const [messageList, setMessageList] = useState([]);
  const [value, onChangeText] = React.useState("");
  return (
    <View style={styles.container}>
      <Text>{messageList}</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />

      <Button
        title="Done"
        onPress={() => {
          Keyboard.dismiss();
        }}
      />
      <Button
        title="Send Message"
        onPress={() => {
          sendMessages(value);
          // sendMessages("text");
        }}
      />
      <Button
        title="Get Messages"
        onPress={() => {
          getMessages();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  nameInput: {
    height: 48,
    margin: 24,
    paddingHorizontal: 24,
    borderColor: "#111111",
    borderWidth: 1,
  },
});
