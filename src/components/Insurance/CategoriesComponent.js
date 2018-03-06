import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {
    MainCard,
    CardItem,
    CardComponent,
    ButtonRoundet,
    LabelOnInput,
    ModalCard,
    Spiner,
    Header
} from '../common';
import CategoryItem from './CategoryItem';
import {RATIO} from '../../styles/constants'
import {Actions} from 'react-native-router-flux';

class CategoriesComponent extends Component {

    render() {
        return (
            <MainCard>
                <Header burger >
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