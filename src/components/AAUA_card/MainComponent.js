import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {
    Spiner
} from '../common';
import {getMyCard, orderCard} from '../../Actions/AAUA_CardAction';
import {connect} from 'react-redux';
import ButtonsScreen from './ButtonsScreen';
import QRcode from './QRcode';

class MainComponent extends Component {

    componentWillMount() {
        this.props.getMyCard(this.props.token);
    }

    render() {
        if (this.props.loading) {
            return (
                <Spiner size={'large'}/>
            )
        } else {
            if (this.props.myCards != null) {
                return (
                    <QRcode />
                )
            } else {
                return (
                    <ButtonsScreen />
                )
            }
        }
    }
}

const mapStateToProps = ({AAUA_Card, auth}) => {
    return {
        user: auth.user,
        token: auth.user.token,
        myCards: AAUA_Card.myCards,
        orderCardSuccess: AAUA_Card.orderCardSuccess,
        loading: AAUA_Card.loading,
    }
}

export default connect(mapStateToProps,{getMyCard, orderCard})(MainComponent);