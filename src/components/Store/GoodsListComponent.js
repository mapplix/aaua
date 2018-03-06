import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    CardComponent,
    Icon,
    ButtonRoundet} from '../common';
import {WIDTH_RATIO, RATIO} from '../../styles/constants';
import GoodsComponent from './GoodsComponent';
import {Actions} from 'react-native-router-flux';

class GoodsListComponent extends Component {
    render() {
        const {
            cardItemStyle,
            componentStyle,
            iconStyle,
            titleStyle,
            titleContainer,
            isPresentContainer,
            isPresentText} = styles;
        return (
            <MainCard>
                <Header back basket>
                    автомасла
                </Header>
                <ScrollView style={{
                    marginTop: 21
                }}>
                    <CardItem style={cardItemStyle}>
                        <GoodsComponent
                            onPress={() => Actions.detail()}
                            imageSrc={require('../../images/avtoOil.png')}
                            price={1750}
                            isPresent
                        >
                            Моторное масло Shell Helix HX7 10W-40
                        </GoodsComponent>
                        <GoodsComponent
                            imageSrc={require('../../images/avtoOil.png')}
                            price={1750}
                        >
                            Моторное масло Shell Helix HX7 10W-40
                        </GoodsComponent>
                    </CardItem>
                    <CardItem style={cardItemStyle}>
                        <GoodsComponent
                            imageSrc={require('../../images/avtoOil.png')}
                            price={1750}
                            isPresent
                        >
                            Моторное масло Shell Helix HX7 10W-40
                        </GoodsComponent>
                        <GoodsComponent
                            imageSrc={require('../../images/avtoOil.png')}
                            price={1750}
                        >
                            Моторное масло Shell Helix HX7 10W-40
                        </GoodsComponent>
                    </CardItem>
                    <CardItem style={cardItemStyle}>
                        <GoodsComponent
                            imageSrc={require('../../images/avtoOil.png')}
                            price={1750}
                            isPresent
                        >
                            Моторное масло Shell Helix HX7 10W-40
                        </GoodsComponent>
                        <GoodsComponent
                            imageSrc={require('../../images/avtoOil.png')}
                            price={1750}
                        >
                            Моторное масло Shell Helix HX7 10W-40
                        </GoodsComponent>
                    </CardItem>
                    <CardItem style={cardItemStyle}>
                        <GoodsComponent
                            imageSrc={require('../../images/avtoOil.png')}
                            price={1750}
                            isPresent
                        >
                            Моторное масло Shell Helix HX7 10W-40
                        </GoodsComponent>
                        <GoodsComponent
                            imageSrc={require('../../images/avtoOil.png')}
                            price={1750}
                        >
                            Моторное масло Shell Helix HX7 10W-40
                        </GoodsComponent>
                    </CardItem>
                </ScrollView>
            </MainCard>
        )
    }
}

const styles = {
    cardItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14 * RATIO,
        marginLeft: 14 * WIDTH_RATIO,
        marginRight: 12 * WIDTH_RATIO,
    },
    componentStyle: {
        marginRight: WIDTH_RATIO < 1 ? 3 : 6 * WIDTH_RATIO
    },
    iconStyle: {
        marginLeft: 24 * WIDTH_RATIO,
        marginRight: 22 * WIDTH_RATIO,
        marginTop: 19 * RATIO,
        width: 114 * WIDTH_RATIO,
        height: 114 * RATIO
    },
    titleContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#282',
        maxWidth: 160 * WIDTH_RATIO
    },
    titleStyle: {
        alignSelf: 'center',
        fontFamily: 'SFUIText-Regular',
        fontSize: 11,
        color: '#1b1b1b'
    },
    isPresentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    isPresentText: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 10,
        color: '#2fc047'
    }
}

export default GoodsListComponent;