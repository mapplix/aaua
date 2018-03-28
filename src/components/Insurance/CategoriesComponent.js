import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {
    MainCard,
    CardItem,
    Header
} from '../common';
import CategoryItem from './CategoryItem';
import {RATIO} from '../../styles/constants'
import {Actions} from 'react-native-router-flux';
import {DEVICE_OS, iOS, Android} from '../../Actions/constants';

class CategoriesComponent extends Component {

    render() {
        return (
            <MainCard>
                <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
                    СТРАХОВАНИЕ
                </Header>
                <CardItem style={{
                    paddingTop: 21 * RATIO
                }}>
                    <CategoryItem
                        onPress={Actions.kaskoComponent}
                        imageSrc={require('../../images/kasko.png')}
                    >
                        КАСКО
                    </CategoryItem>
                </CardItem>
                <CardItem>
                    <CategoryItem
                        onPress={Actions.osagoComponent}
                        imageSrc={require('../../images/osago.png')}
                    >
                        ОСАГО
                    </CategoryItem>
                </CardItem>
            </MainCard>
        )
    }
}

export default CategoriesComponent;