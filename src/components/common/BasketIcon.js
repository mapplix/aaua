import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Icon} from './Icon';

class BasketIcon extends React.Component {
    render() {
        console.log(this.props.countBasket)
        return (
        <TouchableOpacity
            style={{
                width:75,
                height:55,
                paddingBottom: 15,
                paddingRight: 10,
                justifyContent: 'center',
                alignItems: 'flex-end',
                flexDirection: 'row',
            }}
            onPress={Actions.basketList}
        >
            <View>
                <Icon
                    imageSrc={require('../../images/icons/basket.png')}
                />
                { this.props.countBasket > 0 ?
                    <View style={{
                        width: 15,
                        height: 15,
                        borderRadius: 7,
                        backgroundColor: '#e1a700',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: 2,
                        left: 22
                    }}>
                        <Text style={{
                            fontFamily: 'SFUIText-Medium',
                            color: '#1b1b1b',
                            fontSize: 9,
                            marginLeft: 3,
                            // marginRight: 2,
                            marginTop: 1,
                            minWidth: 12,
                        }}>
                            { this.props.countBasket}
                        </Text>
                    </View> : <View></View>
                }
            </View>
        </TouchableOpacity>
        )
    }
}

const mapStateToProps = ({basket}) => {
    return {
        countBasket: basket.countBasket,
    }
}

export default connect(mapStateToProps)(BasketIcon);