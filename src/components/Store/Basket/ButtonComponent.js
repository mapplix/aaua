import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ButtonRoundet} from '../../common';
import {RATIO} from '../../../styles/constants';

class ButtonComponent extends Component {

    increasCounter() {
        this.props.onAdd();
    }

    decreasCounter() {
        this.props.onDelete()
    }

    render() {
        const {
            container,
            textContainer,
            buttonContainer,
            priceText,
            bonusText,
            buttonStyle,
            buttonTextStyle
        } = styles;
        const {price, bonuses, count} = this.props;
        return (
            <View style={container}>
                <View style={textContainer}>
                    <View>
                        <Text style={priceText}>{price} грн </Text>
                    </View>
                    <View>
                        <Text style={bonusText}> {bonuses} бонусов</Text>
                    </View>
                </View>
                <View style={buttonContainer}>
                    <View style={{
                        height: 24,
                        width: 24
                    }}>
                        <ButtonRoundet
                            onPress={this.props.onDelete}
                            style={[buttonStyle, {
                                paddingLeft: 2,
                                paddingRight: 2,
                            }
                            ]}
                            textStyle={buttonTextStyle}
                        >
                            -
                        </ButtonRoundet>
                    </View>
                    <Text style={{
                        fontSize: 18,
                        color: '#1b1b1b',
                        fontWeight: '500'
                    }}>
                        {
                            count
                        }
                    </Text>
                    <View style={{
                        height: 24,
                        width: 24
                    }}>
                        <ButtonRoundet
                            onPress={this.props.onAdd}
                            style={buttonStyle}
                            textStyle={buttonTextStyle}
                        >
                            +
                        </ButtonRoundet>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        // backgroundColor: '#258',
        flex:2,
        // height: 37 * RATIO,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    textContainer: {
        flex:6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flex: 4,
        height: 27,
        marginRight: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#9f9f96',
        borderRadius: 12,
        padding: 1,
        paddingRight: 2

    },
    buttonStyle: {
        backgroundColor: '#ffc200',
        borderWidth: 1,
        borderRadius: 19,
        borderColor: '#ffc200',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        // paddingLeft: 2,
        // paddingRight: 2,
        // paddingTop: 4,
        paddingBottom: 7,
    },
    buttonTextStyle: {
        fontSize: 35,
        fontWeight: '400',
        color:'#fafafa'
    },
    priceText: {
        fontFamily: 'SFUIText-Bold',
        color: '#423486',
        fontSize: 15
    },
    dateContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    bonusText: {
        color: '#423486',
        fontSize: 10,
        fontWeight: '400'
    }
}

export default ButtonComponent;