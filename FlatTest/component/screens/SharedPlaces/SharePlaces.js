import React, { Component } from 'react';
import { View, Text, Image, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import  {connect}  from 'react-redux';
import { add_place } from '../../stroe/actions/index';


import HeadingText from '../../UI/HeadingText';
import MainText from '../../UI/MainText';
import PickImage from '../../PickImage/PickImage';
import PickMap from '../../PickMap/PickMap';
import PlaceInput from '../../PlaceInput/PlaceInput';

class SharePlaces extends Component {

    static navigatorStyle = {
        navBarButtonColor : "orange"
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
      }
    
      onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
          if (event.id === "sideDrawerToggle") {
            this.props.navigator.toggleDrawer({
              side: "left"
            });
          }
        }
      };

    state = {
        placeName: '',
        location :{
            value : null,
            isValid : false
        },
        image :{
            value : null,
            isValid : false
        }
    };

    placeNameChangedHandler = val => {
        this.setState({
            placeName: val
        });
    };

    onHandlerPlaceAdd = () => {

        this.props.navigator.push({
            screen : {
                screen : 'AuthScreenPlace',
            
              }
        })
        // if(this.state.placeName.trim() !== ''){
        //     this.props.addPlace(
        //         this.state.placeName,
        //         this.state.location.value,
        //         this.state.image.value
        //     );

        // }
       
    }

    locationPickedHandler = location =>{
        this.setState(prevState =>{
            return{
                location :{
                    ...prevState.location,
                    value : location,
                    isValid : true

                }
            }

        });
    }

    imagePickHandler = image =>{
        this.setState(prevState =>{
            return{
                image:{
                    ...prevState.image,
                    value : image,
                    isValid : true
                }
            }
        });
    }
    render() {
        return (


            <ScrollView>
                <View style={styles.container}>
                    {/* <MainText> */}
                        <HeadingText>Share place Screen</HeadingText>
                    {/* </MainText> */}
                    <PickImage onImagePick = {this.imagePickHandler}/>
                    <PickMap onLocationPick = {this.locationPickedHandler}/>
                    {/* <DefaultInput placeholder='Entre Place To Share' /> */}
                    <PlaceInput 
                        placeName={this.state.placeName}
                        onChangeText = {this.placeNameChangedHandler} />

                    <View style={styles.buttons}>
                        <Button title='Share Place'
                            onPress={this.onHandlerPlaceAdd}></Button>
                    </View>
                </View>
            </ScrollView>


            // <PlaceInput onPlaceAdded = {this.onHandlerPlaceAdd}/>


        );
    }

}

const mapDispatchToProp = dispatch => {

    return {
        addPlace: (placeName, location, image) => dispatch(add_place(placeName, location, image)),
    };



};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150

    },
    image: {
        width: '100%',
        height: '100%'

    },
    buttons: {
        margin: 8
    }
});

export default connect(null, mapDispatchToProp)(SharePlaces);