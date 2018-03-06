import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CardItem} from '../common';
import Card from './Card';
import {Actions} from 'react-native-router-flux';
import {RATIO} from '../../styles/constants';

class DiscontsListComponent extends Component {

    render() {
        return (
                <ScrollView style={{
                    flex: 1
                }}>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginTop: 27 * RATIO,
                    }}>
                        <Card
                            onPress={() => Actions.discontCard}
                            imageSrc={require('../../images/silpo.png')}
                        />
                        <Card
                            onPress={ Actions.discontCard}
                            imageSrc={require('../../images/marketopt.png')}
                        />
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/silpo.png')}
                        />
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/marketopt.png')}
                        />
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/silpo.png')}
                        />
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/marketopt.png')}
                        />
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/silpo.png')}
                        />
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/marketopt.png')}
                        />
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/silpo.png')}
                        />
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/marketopt.png')}
                        />
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/silpo.png')}
                        />
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/marketopt.png')}
                        />
                    </CardItem>
                    <CardItem style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/silpo.png')}
                        />
                        <Card
                            onPress={() => console.log('fjfjgjkg')}
                            imageSrc={require('../../images/marketopt.png')}
                        />
                    </CardItem>
                </ScrollView>
        )
    }
}

export default DiscontsListComponent;