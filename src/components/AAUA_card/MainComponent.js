import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {
    MainCard,
    CardItem,
    Header
} from '../common';
import CardComponent from './CardComponent';
import {Actions} from 'react-native-router-flux';
import {RATIO, WIDTH_RATIO} from '../../styles/constants'
import {getMyCard} from '../../Actions/AAUA_CardAction';
import {connect} from 'react-redux';

class MainComponent extends Component {

    onAddCardPressed() {
        Actions.add_aaua_card();
        console.log('add card pressed');
    }

    onOrderCard() {
        Actions.order_aaua_card();
    }

    render() {
        console.log(this.props.myCards);
        return (
            <MainCard>
                <Header burger >
                    {"КАРТА AAUA"}
                </Header>
                <CardItem style={{
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
                        imageSrc={require('../../images/icons/add_card.png')}
                        onPress={this.onAddCardPressed.bind(this)}
                    >
                        Добавить карту
                    </CardComponent>
                    <CardComponent
                        style={{
                            marginRight: 14 * WIDTH_RATIO,
                        }}
                        imageParentStyle ={{
                            height: 62 * RATIO,
                            width: 62 * WIDTH_RATIO
                        }}
                        imageSrc={require('../../images/icons/order_card.png')}
                        onPress={this.onOrderCard.bind(this)}
                    >
                        Заказать карту
                    </CardComponent>
                </CardItem>
            </MainCard>
        )
    }
}

const mapStateToProps = ({AAUA_Card, auth}) => {
    return {
        user: auth.user,
        token: auth.user.token,
        myCards: AAUA_Card.myCards
    }
}

export default connect(mapStateToProps,{getMyCard})(MainComponent);