import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from 'native-base';

const MyText = props => {
    const numberOfLines = props.numberOfLines || 1;
    return (
        <Text 
        {...props} 
        numberOfLines={numberOfLines}
        style={[props.style, styles.text]} 
        >
        {props.children}
        </Text>
    );
};
MyText.propTypes = {
    uppercase: PropTypes.bool,
    note: PropTypes.bool,
    };
    const styles = StyleSheet.create({
    text: {
        color:'#fff'
    },
})
export {MyText};
