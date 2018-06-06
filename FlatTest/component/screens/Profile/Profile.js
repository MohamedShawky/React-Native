





// import React, { Component } from 'react';
// import { View, Image, Icon,Text,TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
// import { add_place } from '../../stroe/actions/index';

// import myTextInput from '../../WrapperInput/WraperInput';
// import PlaceInput from '../../PlaceInput/PlaceInput'
// import firebase from '../../firebase/config.js';
// import PickImage from '../../PickImage/PickImage'
// import {Button, Icon,Text} from 'native-base';
// import * as Actions from '../../stroe/actions/Places'
import React, { Component } from "react";
import { View, Image, Dimensions, TouchableOpacity, Share, StyleSheet, Platform, Modal, AsyncStorage } from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { Field, reduxForm, } from 'redux-form';
import { Button, Text, Form, Icon, Content, Picker, Textarea, Item, Segment, Left, Container, Header, Body, Title } from "native-base";
import background from '../../assets/background.jpg'


class Profile extends Component {

    state = {
        placeName: '',
        isLogout: false

    }
    logout = () => {

        this.setState({ isLogout: true })
    }
    onModal = () => {
        AsyncStorage.removeItem('@MySuperStore:key').then((value) => {

            this.props.navigator.resetTo({
                screen: 'AuthScreenPlace',
            })
            this.setState({ isLogout: false })
        })
    }


    onModalClose = () => {

        this.setState({ isLogout: false })
    }


    render() {

        const { navigator } = this.props;
        if (this.state.isLogout) {
            return (
                <Modal
                    visible={this.state.isLogout !== false}
                    animationType="slide"
                    onRequestClose={() => { alert('Stay log in') }}
                >
                    <View style={styles.container} >
                        <View style={{ height: '20%', backgroundColor: '#fff' }}>
                            <Header hasTabs >
                                <Body style={{alignItems:'center'}}>
                                    <Title>Are you sure to log out</Title>
                                </Body>
                            </Header>
                            {/* <Text style={styles.textContainerModal} >  Are you sure to log out</Text> */}

                        </View>
                        <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                            <View style={{ margin: 20 }}>
                                <Button
                                    style={{ backgroundColor: "#8E35A1" }}
                                    rounded
                                    info
                                    onPress={this.onModal}
                                >
                                    <Text>Logout</Text>
                                    <Icon name="md-log-out" style={{marginRight:10, fontSize: 20, color: "#fff" }} />
                                </Button>
                            </View>
                            <View>
                                <Button iconLeft rounded info onPress={this.onModalClose}>
                                    <Text>Close</Text>
                                    <Icon name="md-close" style={{marginRight:10, fontSize: 20, color: "#fff" }} />
                                </Button>
                            </View>
                        </View>
                    </View>

                </Modal>
            );

        }
        return (
            <View style={styles.container}>
                {/* <Text>profile </Text> */}
                {/* '#404258' */}
                {/* <View style={{ flex: 1, margin: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 15, paddingVertical: 40, paddingHorizontal: 20, backgroundColor: '#fff', padding: 50 }}> */}


                <View style={{
                    height: '60%',
                    backgroundColor: "#fff",
                }} >
                    <View style={{
                        height: "40%",
                        width: "100%",
                        backgroundColor: "#734278"
                    }}>
                    </View>
                    <View style={{
                        position: "absolute",
                        top: 80, left: 150,
                        width: 100, height: 100,
                        // borderColor: "green",
                        borderRadius: 50,
                        alignItems: "center"
                    }}>
                        {/* check for img if exist or not */}
                        <Image source={background} style = {{padding : 30, width:100, height:100, borderRadius:50,borderWidth:5, borderColor:'#fff'}}/>

                        {/* <Icon name="ios-person" style={{ fontSize: 80, color: "black" }} /> */}
                    </View>
                    <View style={{ marginTop: 60, backgroundColor: '#fff' }}>
                        <View style={{ alignItems: 'center', margin: 5 }}>
                            <Text>{this.props.selectedPlace.name}</Text>
                        </View>

                        <View style={{ alignItems: 'center', margin: 5 }}>
                            <Text>{this.props.selectedPlace.email}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 20, backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button
                            style={{ backgroundColor: "#8E35A1" }}
                            rounded
                            info
                            onPress={() => alert("follow clicked")}
                        >
                            <Text>Follow</Text>
                            <Icon name="md-person-add" style={{marginRight:10, fontSize: 20, color: "#fff" }} />
                        </Button>
                        <Button iconLeft rounded info onPress={() => alert("follow clicked")}>
                            <Text>Like</Text>
                            <Icon name="md-thumbs-up" style={{marginRight:10, fontSize: 20, color: "#fff" }} />
                        </Button>
                    </View>

                </View>

                <Container>
                    {/* <Header hasTabs>
                    <Body>
                        <Title>Hello</Title>
                    </Body>
                </Header> 
                 */}
                    <Segment style={{ backgroundColor: '#734278' }}>
                        <Button first >
                            <Text>Python</Text>
                        </Button>
                        <Button>
                            <Text>Android</Text>
                        </Button>
                        <Button last active>
                            <Text>Reac-Native</Text>
                        </Button>
                    </Segment>

                    {/* <Content padder>
                        <Text>hi mohamed</Text>
                    </Content> */}
                </Container>
                <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', marginBottom: 30 }}>
                    <View style={{ alignItems: 'center', }}>
                        <Button
                            iconLeft
                            rounded
                            info
                            onPress={this.logout}>
                            <Text>Logout</Text>
                            <Icon name="md-log-out" style={{marginRight:10, fontSize: 20, color: "#fff" }} />
                        </Button>
                    </View>
                </View>


            </ View >

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

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
    logoutButton: {
        justifyContent: 'center',
        // alignItems:'center',
        marginBottom: 10,
        // marginLeft:20,
        marginLeft: 100,
        marginTop: 200,
        width: 200,
        height: 30,
        borderColor: 'black',
        // borderWidth:5,
        borderRadius: 100
    },

    closeButton: {
        justifyContent: 'center',
        // alignItems:'center',
        marginBottom: 10,
        // marginLeft:20,
        marginLeft: 100,
        width: 200,
        height: 30,
        borderColor: 'black',
        // borderWidth:5,
        borderRadius: 100
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
        fontWeight: 'bold'
        // fontSize : 26,


    }
});






export default Profile;














// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
// import Icon from "react-native-vector-icons/Ionicons";

// import PickImage from '../../PickImage/PickImage';

// class Profile extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={{ backgroundColor: 'orange', width: '100%', height: 50 }}>
//                     <Text style={{ textAlign: 'center', marginTop: 20 }}>
//                         Profile
//                     </Text>

//                 </View>

//                 <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', height: 200, alignItems: 'center' }}>
//                     <TouchableOpacity onPress={() => { alert('imagePicker') }}>
//                         <View >
//                             <Text style={{ paddingTop: 20, paddingLeft: 7, backgroundColor: '#eee', width: 60, height: 60, borderRadius: 30, borderColor: 'green', borderWidth: 1 }}>   <Icon
//                                 name="ios-camera-outline"
//                                 size={30}
//                                 color="#aaa"
//                                 style={{ marginBottom: 10 }}
//                             /></Text>


//                         </View>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{ backgroundColor: '#eee', width: '100%', height: 70 }}>
//                     <Text style={{ textAlign: 'center', marginTop: 20 }}>
//                         Name
//                     </Text>
//                 </View>
//                 <View style={{ backgroundColor: '#aaa', width: '100%', height: 70, marginTop: 5 }}>
//                     <Text style={{ textAlign: 'center', marginTop: 20 }}>
//                         Email
//                     </Text>
//                 </View>
//                 <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', height: '50%' }}>
//                     <TouchableHighlight onPress={() => { alert('jj') }}>
//                         {/* <Text style={{  paddingTop:20,paddingLeft:7, backgroundColor : 'red', width : 60, height:60, borderRadius :30, borderColor : 'green', borderWidth:1}}> Logout</Text> */}
//                         <View style={styles.drawerItem}>
//                             <Text > Logout</Text>
//                             <Icon
//                                 name='md-log-out'
//                                 size={30}
//                                 color="#aaa"
//                                 style={{ position: 'absolute', bottom: 10, }}

//                             />


//                         </View>
//                     </TouchableHighlight>
//                 </View>

//             </View>
//         )
//     }
// }

// export default Profile;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     drawerItem: {
//         // position: 'absolute',
//         alignItems: 'center',
//         paddingTop: 40,
//         //    justifyContent:'center',
//         width: 60,
//         height: 60,

//         backgroundColor: "#eee",
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: 'green',

//     },
// })