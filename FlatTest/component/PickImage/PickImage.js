import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import firebase from '../firebase/config';

// import imageBackground from '../assets/background.jpg';
import imageBackground from '../assets/background.jpg';

import ImagePicker from 'react-native-image-picker';


class PickImage extends Component {

    state = {
        imagePicked: null
    }

    getImageHandler = () => {

        ImagePicker.showImagePicker(({ title: 'Choose Photo' }), response => {

            if (response.didCancel) {
                alert('user cancel image');
            } else if (response.error) {
                alert(JSON.stringify(response.error));
            } else {
                this.setState({
                    imagePicked: { uri: response.uri }
                });

                this.props.onImagePick({
                    uri: response.uri, base64 : response.data
                });
            }

        })

    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.getImageHandler}>
                    <View style={styles.placeholder}>
                        <Image source={this.state.imagePicked} style={{width:100,height:100, borderRadius:50,padding : 40}} />
                        <View style={styles.drawerItem}>
                            <Icon
                                name="ios-camera-outline"
                                size={40}
                                color="#aaa"
                                style={{ marginTop: 10 }}
                            />
                        </View>
                        {/* <Text>NNNN</Text> */}
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },

    placeholder: {
       
        backgroundColor: '#eee',
        width: 100,
        height: 100,
        borderRadius: 50,


    },
    image: {
        width: '100%',
        height: '100%'

    },
    drawerItem: {
        justifyContent: 'center',
        alignItems: "center",
        margin:20,
     
        backgroundColor: "#eee",
        borderRadius: 2,

    },
    buttons: {
        margin: 8
    }
});

export default PickImage;