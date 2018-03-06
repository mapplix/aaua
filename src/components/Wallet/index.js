import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {
    MainCard,
    CardItem,
    BottomMenu,
    ButtonRoundet,
    BottomMenuItem,
    Header,
} from '../common';
import {RATIO} from '../../styles/constants';

const WalletComponent = () => {

    addToBalance = () => {
        console.log('add to balance')
    }

    const {amountContainer, amountStyle, textStyle} = styles;
    return (
        <MainCard>
            <Header burger wallet>
                {"Кошелек"}
            </Header>
            <CardItem style={{
                // marginTop: 151,
                height: 230 * RATIO,
                flex: 0,
                flexDirection: 'column',
                justifyContent:'flex-end',
                alignItems: 'center'
            }}>
                <View style={amountContainer}>
                    <Text style={amountStyle}>
                        245
                    </Text>
                    <Text style={textStyle}>
                        гривен
                    </Text>
                </View>
            </CardItem>
            <CardItem style={{
                marginTop: 61,
                paddingRight: 45,
                paddingLeft: 45,
            }}>
                <ButtonRoundet
                    style={{
                        height: 45,
                        backgroundColor: '#FFC200',
                        borderColor:'#FFC200'
                    }}
                    textStyle={{color:'#1B1B1B'}}
                    onPress={this.addToBalance}
                >
                    Пополнить баланс
                </ButtonRoundet>
            </CardItem>
            {/*<CardItem style={{
                maxHeight: 70,
                bottom: 2
            }}>
                <BottomMenu>
                    <BottomMenuItem
                        imageSrc={require('../../images/icons/wog.png')}
                    >
                        Бонусы WOG
                    </BottomMenuItem>
                    <BottomMenuItem
                        imageSrc={require('../../images/icons/aaua.png')}
                    >
                        Бонусы AAUA
                    </BottomMenuItem>
                    <BottomMenuItem
                        imageSrc={require('../../images/icons/mail.png')}
                    >
                        Уведомления
                    </BottomMenuItem>
                </BottomMenu>
            </CardItem>*/}
        </MainCard>
    )
}

const styles = {
    amountContainer: {
        // backgroundColor: '#61c9eb',
        // alignSelf:'stretch',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    amountStyle: {
        fontFamily: 'SFUIText-Bold',
        fontSize: 70,
        color:'#1B1B1B',
        marginBottom: 8
    },
    textStyle: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 17,
        color:'#1B1B1B'
    }
}

export default WalletComponent;