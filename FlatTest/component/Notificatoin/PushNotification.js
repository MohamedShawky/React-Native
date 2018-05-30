import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,

} from "react-native";

import firebase from 'react-native-firebase'

import Notification from 'react-native-firebase';

import FCM, { NotificationActionType } from "react-native-fcm";

class PushNotification extends Component {

    componentDidMount() {
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
            const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('testNofification');

            firebase.notifications().android.createChannel(channel);

            firebase.notifications().displayNotification(notification);
            this.showLocalNotification(notification);


        });
        this.notificationListener = firebase.notifications().onNotification((Notification) => {
            // Process your notification as required
        });
    }




    showLocalNotification(notification) {
        FCM.presentLocalNotification({
            title: notification.title,
            body: notification.body,
            priority: "high",
            show_in_foreground: true,
            local: true
        });
    }


    render() {

        return {

        }
    }

}

export default PushNotification;





import {
    Platform, AsyncStorage,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

// screen related book keeping

var user;
var type;

try {
    AsyncStorage.setItem('type', 'Student');
    AsyncStorage.getItem('user', (result) => {
        user = result;
        type = AsyncStorage.getItem('type');
    });
    console.log(AsyncStorage.getItem('type'));
} catch (error) {
    console.log(error);
}

if (user == null) {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'example.welcome',
            title: 'Navigation',
            
        },
       
    });
    
} else {
    Navigation.startSingleScreenApp({
        screen: {
            screen: "example.stuInitial",

            passProps: {
                user: user._bodyInit,
                type: type,
            },  
        },
        
        disableOpenGesture: false,
    });
}



