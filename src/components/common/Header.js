import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Icon} from './'

class Header extends Component{

    renderLeftButton() {
        if (this.props.back) {
            return (
                <TouchableOpacity
                    style={{

                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: '#382'
                    }}
                    onPress={Actions.pop}
                >
                    <Icon
                        style={{
                            width: 18,
                            height: 12
                        }}
                        imageSrc={require('../../images/icons/backButton.png')}
                        />
                </TouchableOpacity>
            )
        }
        if (this.props.burger) {
            return (
                <TouchableOpacity
                    style={{
                        paddingTop:25,
                        paddingRight:25,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={Actions.drawerOpen}
                >
                    <Icon
                        style={{
                            width: 17,
                            height: 17
                        }}
                        imageSrc={require('../../images/icons/bar.png')}
                    />
                </TouchableOpacity>
            )
        }
    }

    renderRightButton() {
        if (this.props.wallet) {
            return (
                <TouchableOpacity
                    style={{
                        paddingTop:25,
                        paddingRight:25,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={Actions.drawerOpen}
                >
                    <Icon
                        imageSrc={require('../../images/icons/wallet_header.png')}
                    />
                </TouchableOpacity>
            )
        }
        if (this.props.basket) {
            return (
                <TouchableOpacity
                    style={{
                        paddingTop:25,
                        paddingRight:25,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={Actions.drawerOpen}
                >
                    <Icon
                        imageSrc={require('../../images/icons/basket.png')}
                    />
                </TouchableOpacity>
            )
        }

        return (
            <View></View>
        )
    }

    render() {
        const {textStyle, viewStyle, buttonContainer} = style;
        return (
            <View style={viewStyle}>
                <View style={buttonContainer}>
                    {this.renderLeftButton()}
                </View>
                <View>
                    <Text style={textStyle}>
                        {
                            this.props.children.toUpperCase()
                        }
                    </Text>
                </View>
                <View style={buttonContainer}>
                    {this.renderRightButton()}
                </View>
            </View>
        )
    }
}

const style = {
    textStyle: {
        fontFamily: 'SFUIText-Bold',
        fontSize: 13,
        color:'#1b1b1b',
    },
    buttonContainer: {
        // backgroundColor: '#9f9f96',
        width: 70,
        height: 56,
        // paddingBottom:13.3,
        paddingLeft:15.6,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    viewStyle: {
        elevation:5,
        backgroundColor: '#fafafa',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 56,
        paddingBottom: 15,
        marginBottom:1,
        borderBottomWidth:1,
        borderColor: '#fafafa',
        shadowColor: '#fafafa',
        shadowOffset: {width:2, height: 2},
        shadowOpacity: 0.2
    }
}

export {Header};
