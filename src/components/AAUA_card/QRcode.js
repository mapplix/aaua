import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {MainCard, CardItem} from '../common';
import QRCode from 'react-native-qrcode';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class QRcode extends Component {

    render() {

        const {container, text} = styles;
        const {card} = this.props;
        return (
            <MainCard style={
                container
            }>
                <CardItem
                    style={{
                        backgroundColor: '#294',
                        flex: 1
                    }}
                >
                    <TouchableOpacity onPress={Actions.AAUA_main}>
                        <Text
                            style={{
                                fontSize: 30,
                                color: '#bcbcb3'
                            }}
                        >
                            X
                        </Text>
                    </TouchableOpacity>
                </CardItem>
                <CardItem
                    style={{
                        backgroundColor: '#294',
                        justifyContent: 'center',
                        flex: 2
                    }}
                >
                    <Text
                        style={text}
                    >
                        Это Ваша карта “AAUA”. Чтобы ею воспользоваться, покажите этот экран оператору
                    </Text>
                </CardItem>
                <CardItem
                    style={{
                        backgroundColor:'#294',
                        flex: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            borderColor: '#ffc200',
                            borderWidth: 5
                        }}
                    >
                        <View
                            style={{
                                borderColor: '#fff',
                                borderWidth: 5
                            }}
                        >
                            <QRCode
                                value={card}
                                size={250}
                                bgColor='#000'
                                fgColor='white'/>
                        </View>
                    </View>
                </CardItem>
                <CardItem
                    style={{
                        backgroundColor: '#294',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flex: 2
                    }}
                >
                    <Text
                        style={[text, {fontSize: 22}]}
                    >
                        {card}
                    </Text>
                </CardItem>
            </MainCard>
        )
    }
}

const mapStateToProps = ({AAUA_Card}) => {
    return {
        card: AAUA_Card.myCards
    }
}

export default connect(mapStateToProps)(QRcode)

const styles = {
    container: {
        backgroundColor: '#294',
        paddingLeft: 30,
        paddingRight: 30,
    },
    text: {
        // backgroundColor: '#294',
        color: '#bcbcb3',
        fontSize: 18,
        alignSelf: 'center'
    }
}