import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions, AsyncStorage } from 'react-native';

import startTabs from '../MainTabs/mainScreen';

import DefaultInput from '../../UI/DefaultInput';

import HeadingText from '../../UI/HeadingText';
import MainText from '../../UI/MainText';
import ButtonBackground from '../../UI/ButtonBackgroun';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {

    // state = {
    //     resStyle :{
    //         passwordContainer : 'row',
    //         passwordWraper : 'flex-start',
    //         passwordWidth : '100%'
    //     }
    // }
    //better responsive design
    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscap',
        email: '',
        password : ''
    }

    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyle)
        // this.setState ({
        //     resStyle :{
        //         passwordContainer : Dimensions.get('window').height > 500 ? 'column': 'row',
        //         passwordWraper : Dimensions.get('window').height > 500 ? 'flex-start': 'space-between',
        //         passwordWidth : Dimensions.get('window').height > 500 ? '100%': '45%'
        //     }
        // })

        // this.setState({
        //     viewMode : Dimensions.get('window').height >500 ? 'portrait' : 'landscap'
        // });
        // })

    }



    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle)

    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscap'
        });

    }

    async setKey(value) {
        try {
            await AsyncStorage.setItem('@MySuperStore:key', value);
            this.setState({ name: value });
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }
   

    loginHandler =  () => {
        alert('ddddddddddddddddddd');

        //move to next screen with Tabs
        // startTabs();

      
    
        try {
             AsyncStorage.setItem('@MySuperStore:key',JSON.stringify(this.state.email)  ).then(
                 
             )
            
        } catch (error) {
            console.log("Error retrieving data" + error);
        }


        startTabs();




    }



    render() {

        let headText = null;
        if (this.state.viewMode === 'portrait') {
            headText = (
                <HeadingText> Please Log In </HeadingText>

            );

        }
        return (
            <ImageBackground source={backgroundImage} style={styles.image}>
                <View style={styles.container}>
                    {headText}
                    <ButtonBackground color='#eee' onPress={() => { alert('hello') }}>Switch To Login</ButtonBackground>

                    <View style={styles.inputContainer}>
                        <DefaultInput
                            placeholder='Your Email Adress'
                            style={styles.input}
                            onChangeText={(val)=>{this.setState({email:val})}}
                            value={this.state.email}

                        />
                        {/* <TextInput
                         placeholder='Your Email Adress'
                         style={styles.input}
                         onChangeText={(val)=>{this.setState({email:val})}}
                         value={this.state.email}/> */}

                        <View style={this.state.viewMode === 'portrait'
                            ? styles.portraitPasswordContainer
                            : styles.landscapPasswordContainer}>




                            <View style={this.state.viewMode === 'portrait' 
                                ? styles.portraitPasswordWrap 
                                : styles.landscapPasswordWrap}>


                                <DefaultInput
                                    placeholder='Your Password'
                                    style={styles.input}
                                    onChange={(value) => this.setState({ password: value })}
                                    value={this.state.password} />


                            </View  >







                            <View style={this.state.viewMode === 'portrait'
                                ? styles.portraitPasswordWrap
                                : styles.landscapPasswordWrap} >
                                <DefaultInput placeholder='Confirm Password' style={styles.input} />
                            </View>
                        </View>
                    </View>


                    <ButtonBackground onButtonPress={this.loginHandler} color='#eee'>Submit</ButtonBackground>

                </View>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    image: {
        width: '100%',
        flex: 1
    },
    // passwordContainer :{
    //     flexDirection : Dimensions.get('window').height > 500 ? 'column': 'row',
    //     justifyContent : 'space-between'
    // },
    // passwordWraper :{
    //     width : Dimensions.get('window').height >500 ? '100%':'45%'
    // }
    landscapPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },

    landscapPasswordWrap: {
        width: '45%'
    },

    portraitPasswordWrap: {
        width: '100%'
    },

});


export default AuthScreen;