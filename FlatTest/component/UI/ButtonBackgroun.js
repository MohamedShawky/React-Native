import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Platform, TouchableNativeFeedback } from 'react-native';

const buttonCustome = props => {

    const content = (<View style={[styles.container, { backgroundColor: props.color }]}>
        <Text >{props.children}</Text>
    </View>);

    ////////render for diff os 
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onButtonPress}>
                {content}
            </TouchableNativeFeedback>);
    }
    return (
        <TouchableOpacity onPress={props.onButtonPress}>
            {content}
        </TouchableOpacity>);

};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'

    }
});

export default buttonCustome;