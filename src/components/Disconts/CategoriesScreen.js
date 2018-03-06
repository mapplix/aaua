import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {MainCard, CardItem, Header} from '../common'
import Item from './Item';
import {RATIO} from '../../styles/constants';
import {Actions} from 'react-native-router-flux';

class CategoriesScreen extends Component {

    render() {
        return (
                <ScrollView style={{
                    paddingLeft: 22,
                    paddingRight: 22,
                }}>
                    <CardItem style={{

                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Item
                            onPress={Actions.discontsMap}
                            imageSrc={require('../../images/icons/sto.png')}
                        >
                            СТО
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/tyres.png')}
                        >
                            Шиномонтаж
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/carWash.png')}
                        >
                            Мойка
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/trc.png')}
                        >
                            Торговые центры
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/mall.png')}
                        >
                            Супермаркет
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/farmacy.png')}
                        >
                            Аптека
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/clinics.png')}
                        >
                            Клиники
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/dantists.png')}
                        >
                            Стоматология
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/dryCleaning.png')}
                        >
                            Химчистка
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/rest.png')}
                        >
                            Отдых
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/beauty.png')}
                        >
                            Красота и здоровье
                        </Item>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/allAvto.png')}
                        >
                            Все для авто
                        </Item>
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/rest.png')}
                        />
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/beauty.png')}
                        />
                        <Item
                            onPress={() => console.log('dfsfsdfsdf')}
                            imageSrc={require('../../images/icons/allAvto.png')}
                        />
                    </CardItem>
                </ScrollView>
        )
    }
}

export default CategoriesScreen;