import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/PlacesActions";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue));
    props.navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add place",
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
