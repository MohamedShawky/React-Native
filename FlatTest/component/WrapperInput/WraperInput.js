import React from 'react';
import { TextInput, View, Text, StyleSheet,TouchableOpacity } from 'react-native';

/**
 * to be wrapped with redux-form Field component
 */
const myTextInput = (props) => {
    const { input, ...inputProps } = props;

    return (
        <View style={styles.input}>
            <TextInput
                {...inputProps}
                onChangeText={input.onChange}
                placeholder='Please Entre Your Name'

                value={input.value}
            />
           
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        height: 37,
        width: '100%'
      },
  
});

export default myTextInput;