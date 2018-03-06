import React from 'react';
import {View, Text} from 'react-native';
import {MainCard, CardItem, Header} from '../../common';

const LicenceComponent = () => {
    return (
        <MainCard>
            <Header back>
                Лицензия
            </Header>
            <CardItem>
                <View>
                    <Text>
                        Здесь будет тескт лицензии
                    </Text>
                </View>
            </CardItem>
        </MainCard>
    )
}

export default LicenceComponent;