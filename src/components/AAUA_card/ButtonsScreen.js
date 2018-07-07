import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    ModalCard,
    Spiner
} from '../common';
import CardComponent from './CardComponent';
import {Actions} from 'react-native-router-flux';
import {RATIO, WIDTH_RATIO} from '../../styles/constants'
import {getMyCard, orderCard} from '../../Actions/AAUA_CardAction';
import {connect} from 'react-redux';
import {DEVICE_OS, iOS} from '../../Actions/constants';
import QRCode from 'react-native-qrcode';
import Modal from 'react-native-modalbox';

class ButtonsScreen extends Component {

    state = {
        isOpen: false,
    };

    onAddCardPressed() {
        Actions.add_aaua_card();
    }

    onOrderCard() {
        Actions.order_aaua_card();
    }

    componentWillMount() {
        if (this.props.orderVirtualCardSuccess) {
            this.showAlert();
        }
        // this.props.getMyCard(this.props.token);
    }

    orderVirtualCard() {
        const orderData = {
            "token": this.props.token,
            "isvirtual": 1
        }
        console.log('order virtual card')
        this.props.orderCard(orderData);
    }

    showAlert() {
        Alert.alert(
            'Ваша виртуальная карта создана',
            'Спасибо за заказ',
            [
                {
                    text: 'Закрыть', onPress: () => {Actions.AAUA_main();}
                },
            ],
            { cancelable: false }
        )
    }

    componentWillReceiveProps(nextProp) {
        console.log('componentWillReceiveProps AAUA main', this.props.orderVirtualCardSuccess, nextProp.orderVirtualCardSuccess)
        if (nextProp.orderVirtualCardSuccess) {
            this.showAlert();
        }
    }

    render() {
        console.log(this.props);
        const {modal, modalTextContainer, modalText} = styles;
        return (
            <MainCard>
                <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
                    {"КАРТА AAUA"}
                </Header>
                <CardItem style={{
                    flex: 4,
                    paddingTop: 21 * RATIO,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start'
                }}>
                    <CardComponent
                        style={{
                            marginLeft: 14 * WIDTH_RATIO,
                            marginRight: 12 * WIDTH_RATIO,
                        }}
                        isDisabled={this.props.myCards != null}
                        imageSrc={require('../../images/icons/add_card.png')}
                        onPress={this.onAddCardPressed.bind(this)}
                    >
                        Добавить карту
                    </CardComponent>
                    <CardComponent
                        style={{
                            marginRight: 14 * WIDTH_RATIO,
                        }}
                        imageParentStyle={{
                            height: 62 * RATIO,
                            width: 62 * WIDTH_RATIO
                        }}
                        isDisabled={this.props.myCards != null}
                        imageSrc={require('../../images/icons/order_card.png')}
                        onPress={() => this.setState({isOpen: true})}
                    >
                        Заказать карту
                    </CardComponent>
                </CardItem>
                <CardItem
                    style={{
                        flex: 5,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                >
                    {
                        // this.renderQR()
                    }
                </CardItem>
                <Modal style={modal}
                       position={"bottom"}
                       ref={"modal"}
                       isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})}
                >
                    <ModalCard style={{
                        flexDirection: 'column',
                        height: 150
                    }}>
                        <TouchableOpacity
                            isDisabled={true}
                            onPress={this.orderVirtualCard.bind(this)}
                            style={modalTextContainer}
                        >
                            <Text style={modalText}>
                                Заказать виртуальную карту
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalTextContainer}
                                          onPress={() => {
                                              Actions.order_aaua_card()
                                          }}
                        >
                            <Text style={modalText}>
                                Заказать карту
                            </Text>
                        </TouchableOpacity>
                    </ModalCard>
                    <ModalCard style={{
                        height: 50,
                    }}>
                        <TouchableOpacity
                            onPress={() => this.setState({isOpen: false})}
                            style={modalTextContainer}>
                            <Text style={[modalText, {color: '#ffc200'}]}>
                                Закрыть
                            </Text>
                        </TouchableOpacity>
                    </ModalCard>
                </Modal>
            </MainCard>
        )
    }
}

const styles = {
    modal: {
        height: 270,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    modalText: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 19,
        color:'#423485'
    },
    modalTextContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    }
}

const mapStateToProps = ({AAUA_Card, auth}) => {
    return {
        user: auth.user,
        token: auth.user.token,
        myCards: AAUA_Card.myCards,
        orderVirtualCardSuccess: AAUA_Card.orderVirtualCardSuccess,
        loading: AAUA_Card.loading,
    }
}

export default connect(mapStateToProps,{getMyCard, orderCard})(ButtonsScreen);