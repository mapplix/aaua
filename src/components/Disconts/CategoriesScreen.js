import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CardItem, Spiner} from '../common'
import Item from './Item';
import {RATIO} from '../../styles/constants';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loadCategories} from '../../Actions/DiscountsAction';

class CategoriesScreen extends Component {

    componentWillMount() {
        const {loadCategories, token} = this.props;
        loadCategories(token);
    }

    renderItems() {
        const categories = {...this.props.categories};
        for (var i = 0; i <= categories.length; i + 3) {
            this.renderRow(categories.slice(i, i+3))
        }
    }

    renderRow(items) {
        console.log(items)
        /*return (
            <CardItem style={{

                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                {items.map( item => {
                    return (
                        <Item
                            onPress={Actions.discontsMap}
                            imageSrc={require('../../images/icons/sto.png')}
                        >
                            {
                                item.title
                            }
                        </Item>
                    )
                })}
            </CardItem>
        )*/
    }

    renderContent() {
        const {loading, categories} = this.props
        if (loading) {
            return (
                <ScrollView style={{
                    paddingLeft: 22,
                    paddingRight: 22,
                }}>
                    { }
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
        return (
            <Spiner />
        )
    }

    render() {
        return (
                this.renderContent()
        )
    }
}

const mapStateToProps = ({auth, discounts}) => {
    return {
        token: auth.user.token,
        categories: discounts.categories,
        loading: false
    }
}

export default connect(mapStateToProps, {loadCategories})(CategoriesScreen);