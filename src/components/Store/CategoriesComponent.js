import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {MainCard, CardItem, Header} from '../common';
import Item from './Item';
import {Actions} from 'react-native-router-flux';

class CategoriesComponent extends Component {

    render() {
        return (
            <MainCard>
                <Header burger basket>
                    Магазин
                </Header>
                <ScrollView>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Item
                            onPress={Actions.specialOffer}
                            imageSrc={require('../../images/icons/special_offers.png')}
                        >
                            Спецпредложение AAUA
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={
                                require('../../images/icons/advokat.png')
                            }
                        >
                            Пакет юридических{"\n"} услуг
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/tech_support.png')}
                        >
                            Пакет технической{"\n"} поддержки в дороге
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/fuel.png')}
                        >
                            Топливо
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/mobil.png')}
                        >
                            Мобильная связь
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/auto_goods.png')}
                        >
                            Товары для авто
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>

                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/tyres.png')}
                        >
                            Шины
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/disks.png')}
                        >
                            Диски
                        </Item>
                        <Item
                            onPress={Actions.goods}
                            imageSrc={require('../../images/icons/auto_oils.png')}
                        >
                            Автомасла
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>

                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/auto_cleaning.png')}
                        >
                            Автохимия
                        </Item>
                    </CardItem>
                </ScrollView>
            </MainCard>
        )
    }
}

export default CategoriesComponent;