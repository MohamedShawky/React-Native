import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultInput from '../UI/DefaultInput';

// class PlaceInput extends Component {
//   state = {
//     placeName: ""
//   };

//   placeNameChangedHandler = val => {
//     this.setState({
//       placeName: val
//     });
//   };

//   // placeSubmitHandler = () => {
//   //   if (this.state.placeName.trim() === "") {
//   //     return;
//   //   }

//   //   this.props.onPlaceAdded(this.state.placeName);
//   // };

//   render() {
//     return (
//       // <View style={styles.inputContainer}>
//       //   <TextInput
//       //     placeholder="An awesome place"
//       //     value={this.state.placeName}
//       //     onChangeText={this.placeNameChangedHandler}
//       //     style={styles.placeInput}
//       //   />
//       //   <Button
//       //     title="Add"
//       //     style={styles.placeButton}
//       //     onPress={this.placeSubmitHandler}
//       //   />
//       // </View>
//       <DefaultInput placeholder='Entre Place To Share' 
//       value = {this.state.placeName} 
//       onChangeText = {this.placeNameChangedHandler}/> 
//     );
//   }
// }

const placeInput = props =>{

  return(
    <DefaultInput placeholder='Entre Place To Share' 
      value = {props.placeName} 
      onChangeText = {props.onChangeText}/> 
  );

};


export default placeInput;
