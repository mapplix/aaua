import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

class Filters extends React.Component {

    render() {

        let {container, component} = styles;
        return (
            <View>
                <View style={container}>
                    <TouchableOpacity
                        onPress={this.props.showOrders}
                        style={component}>
                        <View style={{
                            flexDirection:'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                source={require('../../images/icon_1_filter.png')}
                            />
                            <Text style={{
                                fontFamily: 'SFUIText-Medium',
                                color: '#1b1b1b',
                                fontSize: 16
                            }}>
                                Сортировка
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.props.showFilters}
                        style={component}>
                        <View style={{
                            flexDirection:'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                source={require('../../images/icon_2_filter.png')}
                            />
                            <Text style={{
                                fontFamily: 'SFUIText-Medium',
                                color: '#1b1b1b',
                                fontSize: 16
                            }}>
                                Фильтры
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    component: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}

export default Filters;