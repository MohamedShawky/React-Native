import React, { Component } from 'react';
import { View, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from "react-native-vector-icons/Ionicons";
import firebase from '../../firebase/config.js';
import { Button, Text, Form, Icon, Picker, Container, Right } from "native-base";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { add_place } from '../../stroe/actions/index';

import myTextInput from '../../WrapperInput/WraperInput';
import PlaceInput from '../../PlaceInput/PlaceInput'
import PickImage from '../../PickImage/PickImage';

import * as Actions from '../../stroe/actions/Places'

const validate = values => {
  const errors = {}
  if (!values.placeName) {
    errors.placeName = 'Required'
  } else if (values.placeName.length > 15) {
    errors.placeName = 'Must be 15 characters or less'

  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  // alert(JSON.stringify(errors))
  return errors;

}

const renderField = ({ label, placeholder, meta: { touched, error, warning, asyncValidating },
  input: { onChange, ...restInput } }) => {
  return (
    <View >
      <View style={styles.input}>
        <TextInput
          underlineColorAndroid='transparent'

          onChangeText={onChange} {...restInput} placeholder={placeholder}
        >
        </TextInput>
        {/* <myTextInput/> */}
      </View>
      {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>))}
    </View>);
};

// const renderImage = ({ label, placeholder, meta: { touched, error, warning, asyncValidating },
//   input: { onChange, ...restInput } }) => {
//     return (
//       // <View style = {styles.container}>
//       //     <View style={styles.placeholder}>
//       //         <Image source = {this.state.imagePicked} style={styles.image} />
//       //     </View>

//       //     <View style={styles.buttons}>
//       //         <Button title='Pick Image'
//       //             onPress={this.getImageHandler}></Button>
//       //     </View>
//       // </View>
//       <PickImage />
//     )
// };


class ReduxForm extends Component {
  state = {
    placeName: '',
    email: '',
    gender: 'MALE',
    selected: 'key1',
    genderIndex: 1,
    image: {
      value: null,
      isValid: false
    }
  }
  radioData = [
    { label: 'femal', value: 'FEMALE' }, { label: 'male', value: 'MALE' }
  ]


  onSubmit = async (values) => {
    // alert(''+JSON.stringify(values))
    // values.name = this.setState({placeName:placeName});
    values.image = this.state.image.value;
    // const snap = await firebase.storage().ref('/places/').child('image/jpg').putString(values.image)
    // alert(JSON.stringify(snap.downloadURL))
    values.gender = this.state.gender;
    values.selected = this.state.selected;

    
    // alert(JSON.stringify(values))
    this.props.add_place(values.placeName, values.email,values.gender,values.selected, values.image);
    //   firebase.database().ref('/places/').push({
    //     name: values.placeName
    // });
    // alert(''+JSON.stringify(this.state.image.value))

    this.props.navigator.pop();


  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  imagePickHandler = image => {
    this.setState(prevState => {
      return {
        image: {
          ...prevState.image,
          value: image,
          isValid: true
        }
      }
    });
  }

  renderRadio() {
    return (
      <RadioForm style={{ marginRight: 10, marginTop: 30, marginBottom: 30, justifyContent: 'space-around', alignItems: 'center', paddingBottom: 7 }}
        formHorizontal={true}
      >
        {this.radioData.map((obj, i) => {
          const onPress = (value, index) => {
            this.setState({
              gender: value,
              genderIndex: index
            });

          }

          return (


            <RadioButton labelHorizontal={true} key={i} >
              {/*  You can set RadioButtonLabel before RadioButtonInput */}
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={this.state.value3Index === i}
                onPress={onPress}
                borderWidth={1}
                buttonInnerColor={'#e74c3c'}
                buttonOuterColor={this.state.genderIndex === i ? '#2196f3' : 'red'}
                buttonSize={20}
                buttonOuterSize={20}
                buttonStyle={{ borderWidth: 2 }}
                buttonWrapStyle={{ marginLeft: 10 }}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={onPress}
                labelStyle={{ fontSize: 20, color: 'grey' }}

              />
            </RadioButton>
          )
        })}
      </RadioForm>
    );
  }
  render() {

    const { handleSubmit } = this.props;
    return (
      <View style={styles.contaier}>
        <View style={{}}>

          <PickImage onImagePick={this.imagePickHandler} />
        </View>

        <Field
          name='placeName'
          placeholder='Please Entre Your Name'

          component={renderField}
        />


        <Field
          name='email'
          placeholder='Please Entre Your Mail n '
          component={renderField}
        />
        {this.renderRadio()}
        <View style={{ marginLeft: 200, width: '50%', height: 100 } }>
          <Container >
            <Form>
              <Picker
                mode="dropdown"
                iosHeader="Select your SIM"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="developer" value="key0" />
                <Picker.Item label="photographer" value="key1" />

              </Picker>
            </Form>
          </Container> 
          </View>
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={handleSubmit(this.onSubmit.bind(this))}>
            <View style={styles.drawerItem}>
              <Icon
                name="ios-checkmark-circle-outline"
                size={30}
                color="#aaa"
                style={{ margin: 10 }}
              />
              <Text >Submit</Text>
            </View>
          </TouchableOpacity> */}
          <View style={styles.drawerItem}>

            <Button
              iconLeft
              rounded
              style={{
                color: 'steelblue'
              }}
              onPress={handleSubmit(this.onSubmit.bind(this))}
            >
              <Text>Submit</Text>
              <Icon name="ios-checkmark-circle-outline" style={{ marginRight: 10, fontSize: 30, color: "#fff" }} />
            </Button>
          </View>
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
  input: {
    justifyContent: 'center',
    width: "90%",
    height: 40,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 10,
    // paddingTop:20,
    backgroundColor: "#eee",
    borderColor: 'steelblue'
  },
  drawerItem: {
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#eee"
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
  form: 'ReduxForm', // a unique name for this form
  validate
})(ReduxForm);



export default connect(null, Actions)(form);



