import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

class MapButton extends Component {

    render() {
        const {onPress, children} = this.props;
        const {buttonStyle, textStyle} = style;
        return (
            <TouchableOpacity
                style={[buttonStyle, this.props.style]}
                onPress={onPress}
            >
                <Text style={[textStyle, this.props.textStyle]}>
                    {children}
                </Text>
            </TouchableOpacity>
        )
    }
}

const style = {
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#1b1b1b',
        fontSize: 12,
        marginLeft: 12,
        marginRight: 12,
    },
    buttonStyle: {
        height: 31,
        marginLeft: 3,
        marginLeft: 3,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#e9e9e9',
        justifyContent: 'center',
        alignItems: 'center',
        }
    }

export {MapButton};