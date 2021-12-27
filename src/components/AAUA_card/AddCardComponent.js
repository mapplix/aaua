import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {changeCardNumber, addCard} from '../../actions/AAUA_CardAction';
import {
    MainCard,
    CardItem,
    ButtonRoundet,
    Header,
    CreditCardInput
} from '../common';
import {showAlert} from '../Modals'

class AddCardComponent extends Component {

    onCodeChange(text) {
        this.props.changeCardNumber(text)
    }

    onPress() {
        const validNumber = this.props.card_number.replace(/\-/g,'');
        const card = {
            "token" : this.props.token,
            "number" : validNumber
        };
        this.props.addCard(card)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addCardError != null) {
            showAlert(
                'Ошибка',
                nextProps.addCardError,
                'Закрыть',
            )
        }
    }

    render() {
        return (
            <MainCard>
                <Header back >
                    {"ДОБАВЛЕНИЕ КАРТЫ"}
                </Header>
                <CardItem style={{
                    flex: 0,
                    height: 230,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems:'flex-start',
                }}>
                    <CreditCardInput
                        label={'Номер карты'}
                        value={this.props.card_number}
                        onChangeText={this.onCodeChange.bind(this)}
                        placeholder={'XXXX XXXX XXXX XXX'}
                    />
                </CardItem>
                <CardItem style={{
                    marginTop: 57
                }}>
                    <ButtonRoundet
                        style={{
                            marginRight: 45,
                            marginLeft: 45,
                            height: 45
                        }}
                        onPress={this.onPress.bind(this)}
                    >
                        Добавить карту
                    </ButtonRoundet>
                </CardItem>
            </MainCard>
        )
    }
}

const mapStateToProps = ({AAUA_Card, auth}) => {
    return {
        token: auth.user.token,
        card_number: AAUA_Card.card_number,
        addCardError: AAUA_Card.addCardError
    }
}

export default connect(mapStateToProps, {changeCardNumber, addCard})(AddCardComponent);
