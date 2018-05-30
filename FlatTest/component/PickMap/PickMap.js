import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';


class PickMap extends Component {

    state = {
        focusLocation :{
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta:
             Dimensions.get("window").width /
             Dimensions.get("window").height *
             0.0122
        },
        isLocated : false
    }

    pickLocationHandler = event =>{
        const coord = event.nativeEvent.coordinate;

        this.map.animateToRegion({
            ...this.state.focusLocation,
            latitude : coord.latitude,
            longitude : coord.longitude
        });
        this.setState(prevState =>{

            return{
                focusLocation : {
                    ...prevState.focusLocation,
                    latitude : coord.latitude,
                    longitude : coord.longitude,
                },
            isLocated : true
            }            
        });
        this.props.onLocationPick({
            latitude : coord.latitude,
            longitude : coord.longitude
        });
    }

    getLocatoinHandler = () =>{
      
        navigator.geolocation.getCurrentPosition(success =>{

            const coordEvent = {
                nativeEvent :{
                    coordinate :{
                        
                        latitude : success.coord.latitude,
                        longitude : success.coord.longitude,
                    }
                }
            };
            this.pickLocationHandler(coordEvent);

        }, error =>{
            alert('error')
        })

    }
    render() {
        let marker = null
        if(this.state.isLocated){

            marker = <MapView.Marker 
                        coordinate = {this.state.focusLocation} 
                    />

        }
        return (
            <View style = {styles.container}>
                <MapView 
                    initialRegion = {this.state.focusLocation}
                    // region={this.state.focusedLocation}
                    // region = {this.state.focusLocation} because we use animate that animat from curr positon to picked one
                    style = {styles.map}
                    onPress = {this.pickLocationHandler} 
                    ref = {ref => this.map  = ref}
                    >

                    
                    {marker}
                </MapView>
                <View style={styles.buttons}>
                    <Button title='Map Image'
                        onPress={this.getLocatoinHandler}></Button>
                </View>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    container : {
        width : '100%',
        alignItems : 'center'
    },

    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150

    },
   
    buttons: {
        margin: 8
    },
    map : {
        width : '100%',
        height : 250
    }
});

export default PickMap;