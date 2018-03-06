import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {
    MainCard,
    CardItem,
    LabelOnInput,
    ButtonRoundet,
    Header
} from '../common';
import {RATIO, WIDTH_RATIO} from '../../styles/constants';

class InviteFriendComponent extends Component {
    render() {
        console.log(WIDTH_RATIO);
        const {textStyle, textContainerStyle, buttonContainer, buttonWrapper} = styles;
        return (
            <MainCard>
                <Header back>
                    ПРИВЕДИТЕ ДРУГА
                </Header>
                <CardItem style={textContainerStyle}>
                    {/*<View style={{*/}
                        {/*width: 230,*/}
                        {/*height: 56*/}
                    {/*}}>*/}
                        <Text style={textStyle}>
                            Приведите друга
                        </Text>
                        <Text style={textStyle}>
                            и получите бонус
                        </Text>
                    {/*</View>*/}
                </CardItem>
                <CardItem style={{
                    // backgroundColor: '#283',
                    flex:0,
                    height: 122 * RATIO,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',

                }}>
                    <LabelOnInput
                        // labelStyle={{width: 220}}
                        label={'Номер телефона или E-mail'}
                        placeholder={'Ввести'}
                        onChangeText={() => console.log('text changed')}
                        value={this.props.email}
                    />
                </CardItem>
                <CardItem style={buttonContainer}>
                    <ButtonRoundet
                        style={{
                            backgroundColor: '#ffc200',
                            borderColor: '#ffc200',
                            marginRight: 82 * WIDTH_RATIO,
                            marginLeft: 82 * WIDTH_RATIO,
                            flex:0,
                            height: 43
                        }}
                        textStyle={{color: '#1b1b1b'}}
                        onPress={() => console.log('send invite')}
                    >
                        Отправить
                    </ButtonRoundet>
                </CardItem>
                <CardItem style={[
                    textContainerStyle,
                    {
                        flex:0,
                        height: 96 * RATIO,
                    }
                ]}>
                    <Text style={textStyle}>
                        или
                    </Text>
                </CardItem>
                <CardItem style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flex:0,
                    height: 96 * RATIO,
                }}>

                    <Image style={{
                        width: 75,
                        height: 75
                    }}
                           source={require('../../images/icons/share_round.png')}>

                    </Image>
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    textContainerStyle: {

        flex:0,
        height: 135 * RATIO,
        // marginLeft: 66,
        // marginRight: 66,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'SFUIText-Bold',
        fontSize: 23,
        color: '#1b1b1b'
    },
    buttonContainer: {
        flex:0,
        height: 69 * RATIO,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonWrapper: {
        height: 43,
        // flex: 1
    }
}

export default InviteFriendComponent;