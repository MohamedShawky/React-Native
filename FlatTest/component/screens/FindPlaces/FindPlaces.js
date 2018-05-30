import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Animated, Modal, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../PlaceList/PlaceList';
import firebase, { Firebase } from 'react-native-firebase'
import { getPlaces } from '../../stroe/actions/index'
import Notification from 'react-native-firebase';

import FCM, { NotificationActionType } from "react-native-fcm";

class FindPlaces extends Component {


    componentDidMount() {

        this.props.onLoadPlaces();

        // Build a channel
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');

        // Create the channel
        firebase.notifications().android.createChannel(channel);

        firebase.notifications().getInitialNotification();


    }





    showLocalNotification() {
        let notification = new firebase.notifications.Notification();
        notification = notification.setNotificationId(new Date().valueOf().toString())
            .setTitle('Wowwo')

        notification.android.setAutoCancel(true);

        notification.android.setPriority(firebase.notifications.Android.Priority.High);
        notification.android.setChannelId("test-channel");

        firebase.notifications().displayNotification(notification);
    }

    addHandler = () => {

        this.props.navigator.push({
            screen: 'ReduxForm',
        })

    }




    state = {
        placeLoad: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0),
        isLogout: false
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



    static navigatorStyle = {
        navBarButtonColor: "green"
    }

    onItemSelectedHandler = key => {

        const selplace = this.props.places.find(place => {
            return place.key === key;
        });

        this.props.navigator.push({
            screen: 'DetailScreen',
            title: selplace.name,
            passProps: {
                selectedPlace: selplace

            }
        });
    };

    placesLoadedHandler = () => {

    }

    placeListHandler = () => {
        // this.setState({
        //     placeLoad : true  it will be animated
        // })
        Animated.timing(
            this.state.removeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,

            }

        ).start(() => {
            this.setState({
                placeLoad: true,

            });
        }

        );

    }

    logout = () => {

        this.setState({ isLogout: true })
    }
    onModal = ()=>{
        AsyncStorage.removeItem('@MySuperStore:key').then((value)=>{

        this.props.navigator.resetTo({
            screen: 'AuthScreenPlace',
        })
        this.setState({isLogout:false})})
    }


    onModalClose = ()=>{
        this.setState({isLogout:false})
    }

    render() {

        let content = (
            <Animated.View
                style={{
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            scale: this.state.removeAnim.interpolate({

                                inputRange: [0, 1],
                                outputRange: [12, 1],
                            })
                        }
                    ]
                }}>
                <TouchableOpacity onPress={this.placeListHandler}>
                    <View style={styles.buttonSearch}>
                        <Text style={styles.textContainer}> FindPlaces </Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        if (this.state.isLogout) {
            return (
                <Modal
                    visible={this.state.isLogout !== false}
                    animationType="slide"
                    onRequestClose={()=>{alert('Stay log in')}}
                >
                    <View style={styles.container} >
                    <Text style = {styles.textContainerModal} color = 'red'>  Are you sure to log out</Text>

                        <View style = {styles.logoutButton}>
                            <Button title="Logout" color="red"  onPress={this.onModal}/>
                        </View>
                        <View style = {styles.closeButton}>
                            
                            <Button title="Close"  color='green'onPress={this.onModalClose}/>
                        </View>
                    </View>
                </Modal>
            );
            
        }

        // if (this.state.placeLoad) {
        //     content = (

        //         <PlaceList places={this.props.places} onItemSelected={this.onItemSelectedHandler} />

        //     );

        // }
        // let b = null;
        // if (this.state.placeLoad) {
        //     b = (<TouchableOpacity onPress={this.addHandler} >
        //         <View >
        //             <Text style={styles.textContainer}> Add Emp </Text>
        //         </View>
        //     </TouchableOpacity>);
        // }
        return (
            // <View style={this.state.placeLoad ? null : styles.buttonContainer}>

            //     {content}
            //     <View style={styles.floatinButton}>
            //         {b}
            //     </View>
            //     {/* <PlaceList places = {this.props.places} onItemSelected = {this.onItemSelectedHandler}/> */}

            // </View>
            <View style={styles.container}>

                <PlaceList places={this.props.places} onItemSelected={this.onItemSelectedHandler} />
                <View style={styles.floatinButton}>
                    <TouchableOpacity onPress={this.addHandler} >
                        <View >
                            <Text style={styles.textContainer}>Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <PlaceList places = {this.props.places} onItemSelected = {this.onItemSelectedHandler}/> */}
                <View style={styles.floatinButton1}>
                    <TouchableOpacity onPress={this.logout} >
                        <View >
                            <Text style={styles.textContainer}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        );
    }

}

const mapSetToState = state => {

    return {
        places: state.places.places
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    };
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    floatinButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#01a699',
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    container: {
        flex: 1,

    },
    logoutButton:{
        justifyContent:'center',
        // alignItems:'center',
        marginBottom: 10,
        // marginLeft:20,
        marginLeft:100,
        marginTop:200,
        width:200,
        height:30,
        borderColor:'black',
        // borderWidth:5,
        borderRadius:100
    },
    closeButton:{
        justifyContent:'center',
        // alignItems:'center',
        marginBottom: 10,
        // marginLeft:20,
        marginLeft:100,
        width:200,
        height:30,
        borderColor:'black',
        // borderWidth:5,
        borderRadius:100
    },
    floatinButton1: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 5,
        right: 180,
    },
    addButton: {
        flexDirection: 'column',
        justifyContent: "flex-end",

        // alignItems: "flex-end"

    },
    submitButton: {
      
        alignItems: "flex-end",
       
        backgroundColor: "orange",
        borderColor: "#555555",
        borderWidth: 33,
        borderRadius: 55,
        justifyContent: "flex-end",
        width: 150,
        height: 100
    },
    buttonSearch: {
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 15,
        padding: 10,


    },
    textContainer: {
        color: 'orange',
        textAlign: 'center',
        margin: 15
        // fontSize : 26,


    },
    textContainerModal: {
        color: 'black',
        textAlign: 'center',
        margin: 25,
        fontWeight :'bold'
        // fontSize : 26,


    }
});

export default connect(mapSetToState, mapDispatchToProps)(FindPlaces);