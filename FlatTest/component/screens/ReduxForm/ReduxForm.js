import React, { Component } from 'react';
import { View, Text, Image, Button, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { add_place } from '../../stroe/actions/index';

import myTextInput from '../../WrapperInput/WraperInput';
import PlaceInput from '../../PlaceInput/PlaceInput'
import firebase from '../../firebase/config.js';

import * as Actions from '../../stroe/actions/Places'
class ReduxForm extends Component {
  state = {
    placeName: ''
  }
  onSubmit = (values) => {
    // alert(''+JSON.stringify(values))
    // values.name = this.setState({placeName:placeName});
   
    
    this.props.add_place(values.placeName);
    //   firebase.database().ref('/places/').push({
    //     name: values.placeName
    // });

    this.props.navigator.pop();

  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.contaier}>

        <Field
          name='placeName'
          component={myTextInput}
        />

        <View style={styles.container}>
          <TouchableOpacity onPress={handleSubmit(this.onSubmit.bind(this))}>
            <Text style={styles.button}>Submit</Text>
          </TouchableOpacity>
        </View>


      </ View>

    );
  }
}
const styles = StyleSheet.create({
  contaier: {
    flex: 1,
 


  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'



  },
  button: {
    backgroundColor: 'orange',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 5,
    textAlign: 'center',
    width: 250
  },
});





// Decorate the form component
const form = reduxForm({
  form: 'ReduxForm' // a unique name for this form
})(ReduxForm);



export default connect(null, Actions)(form);



