import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CardItem, Spiner} from '../common';
import Card from './Card';
import {Actions} from 'react-native-router-flux';
import {RATIO} from '../../styles/constants';
import {loadCards, selectCard} from '../../Actions/DiscountsAction';
import {connect} from 'react-redux';
import {BASE_URL} from '../../Actions/constants';

class DiscontsListComponent extends Component {


    componentWillMount() {
        const {loadCards, token} = this.props;
        loadCards(token);
    }

    renderRow(items) {
        return items.map( (item) => {
            return (
                <Card
                    key={item.id}
                    onPress={() => this.props.selectCard(item)}
                    imageSrc={{uri:BASE_URL+item.logo}}
                />
            )
        })
    }

    renderRows() {
        const cards = [...this.props.cards];
        var i = 0;
        var rows = [];
        while (i < cards.length) {
            rows.push(cards.slice(i, i + 2))
            i = i + 2;
        }
        return rows.map( (row, index) => {
            return (
                <CardItem style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 27 * RATIO,
                }}
                key={index}
                >
                    {
                        this.renderRow(row)
                    }
                </CardItem>
            )
        })
    }

    renderContent() {
        if (!this.props.loading) {
            return (
                <ScrollView style={{
                    flex: 1
                }}>
                    {this.renderRows()}
                </ScrollView>
            )
        } else {
            return (
                <Spiner />
            )
        }
    }

    render() {
        return this.renderContent();
    }
}

const mapStateToProps = ({auth, discounts}) => {
    return {
        token: auth.user.token,
        cards: discounts.discountsCards,
        loading: discounts.loadingCards
    }
}

export default connect(mapStateToProps, {loadCards, selectCard})(DiscontsListComponent);