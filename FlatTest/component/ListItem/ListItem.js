import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import background from '../assets/background.jpg'

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      {/* <Image resizeMode="cover" source={props.placeImage} style={styles.placeImage} /> */}
      <Image resizeMode="cover" source={background} style={styles.placeImage} />

      <Text style = {styles.textContainerModal}>{props.placeName}</Text>
      <Text style = {styles.emailText}>{props.email}</Text>

    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "97%",
    padding: 5,
    margin:8,
    marginLeft:5,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    borderWidth:2,
  },
  placeImage: {
      marginRight: 8,
      height: 30,
      width: 30,
      borderRadius:15
  },
  textContainerModal: {
    color: 'black',
    textAlign: 'center',
    fontWeight :'normal',
    // fontSize : 26,

},
emailText:{
  textAlign:'center',
  margin : 10
}
});

export default listItem;
