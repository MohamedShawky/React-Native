import React, {Component} from "react";
import {  View, Image, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {deletePlace, add_place} from '../../stroe/actions/index';
import background from '../../assets/background.jpg'


class PlaceDetail extends Component{

  onDeleteHandler =()=>{
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render(){
    return (
      <View style={styles.modalContainer}>
        <View>
          <Image source={background} style={styles.placeImage} />
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
          <Text style={styles.placeName}>{this.props.selectedPlace.email}</Text>
        </View>
        <View>
          <TouchableOpacity onPress = {this.onDeleteHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );

  }

}
 


const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  }
});

const mapDispatchToProp = dispatch =>{
  return{

    onDeletePlace : (key)=>dispatch(deletePlace(key))


  }
}

export default connect(null, mapDispatchToProp) (PlaceDetail);
