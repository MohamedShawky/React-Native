import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet} from 'react-native'
// import imageBackground from '../assets/background.jpg';
import imageBackground from '../assets/background.jpg';

import ImagePicker from 'react-native-image-picker';


class PickImage extends Component {

    state = {
        imagePicked : null
    }

    getImageHandler = ()=>{

        ImagePicker.showImagePicker(({title : 'Choose Photo'}), response =>{

            if(response.didCancel){
                alert('user cancel image');
            }else if(response.error){
                alert('an error when choose image');
            }else {
                this.setState({
                    imagePicked : {uri : response.uri, base64 : response.data}
                });

                this.props.onImagePick({
                    uri : response.uri
                });
            }
        
        })

    }

    render() {
        return (
            <View style = {styles.container}>
                <View style={styles.placeholder}>
                    <Image source = {this.state.imagePicked} style={styles.image} />
                    {/* <Text>NNNN</Text> */}
                </View>

                <View style={styles.buttons}>
                    <Button title='Pick Image'
                        onPress={this.getImageHandler}></Button>
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
    image: {
        width : '100%',
        height : '100%'

    },
    buttons: {
        margin: 8
    }
});

export default PickImage;