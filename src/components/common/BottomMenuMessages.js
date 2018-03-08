import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon, BottomMenuCounter} from '../common';
import MapComponent from "../Disconts/MapComponent";

class BottomMenuMessages extends Component {


    renderCounter() {
        if (this.props.counter > 0) {
            return (
                <BottomMenuCounter>
                    {this.props.counter}
                </BottomMenuCounter>
            )
        }
    }

    render() {
        const {counter, imageSrc, onPress} = this.props;
        const {textContainer, textStyle} = styles;
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[textContainer, this.props.style]}
            >
                <View>
                    <Icon
                        style={{
                            height: 24,
                            width: 36
                        }}
                        imageSrc={this.props.imageSrc}
                    />

                    <Text style={textStyle}>
                        {this.props.children}
                    </Text>
                </View>
                <View style={{
                    height: 50,
                    // backgroundColor: '#16ff11',
                }}>
                    {this.renderCounter()}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = {
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 11,
        color: '#1b1b1b'
    }
}

export {BottomMenuMessages}
