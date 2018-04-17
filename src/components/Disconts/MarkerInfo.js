import React, {Component} from 'react';
import {View, Text, WebView, Image} from 'react-native';
import {MainCard, CardItem, Header} from '../common';
import {BASE_URL} from '../../Actions/constants';

class MarkerInfo extends Component {

    renderServices() {
        if (this.props.services) {
            return this.props.services.map( (service) => {
                return (
                    <View
                        style={{
                            flex:1,
                            alignSelf: 'stretch',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomColor: '#1b1b1b',
                            borderBottomWidth: 1,
                        }}
                        key={service.name}
                    >
                        <Text style={{
                            fontSize: 18
                        }}>
                            {service.name}
                        </Text>
                        <Text style={{
                            fontSize: 18
                        }}>
                            {service.price}
                        </Text>
                    </View>
                )
            })
        }
    }

    render() {
        const htmlSrc = `
            <!DOCTYPE html>
            <html lang="ru">
            <head>
            <meta charset="utf-8">
            <title>The Title</title>
            </head>
            
            <body>
            ${this.props.contacts}
            </body>
            
            </html>`;

        const {cardStyle} = styles;
console.log(this.props);
        return (
            <MainCard>
                <Header back>
                    {this.props.title || ''}
                </Header>
                <CardItem style={[cardStyle, {margin: 20}]}>
                    <View
                        style={{
                            flex:2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // backgroundColor:'#288'
                        }}
                    >
                        <Image
                            resizeMode='center'
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            source={{uri: BASE_URL+this.props.img}}
                        />

                    </View>
                    <View style={{
                        flex:4
                    }}>
                        <WebView
                            style={{
                                flex:1,
                                alignSelf: 'stretch',
                            }}
                            javaScriptEnabled={false}
                            domStorageEnabled={false}
                            startInLoadingState={false}
                            scalesPageToFit={false}
                            scrollEnabled={true}
                            source={{ html: htmlSrc, baseUrl:'' }}
                        />
                    </View>
                </CardItem>
                <CardItem>
                    <View style={[{
                        flex: 1,
                        justifyContent: 'flex-start',
                    }, cardStyle]}>
                        <View
                            style={{
                                flex:1,
                                alignSelf: 'stretch',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '500'
                            }}>
                                Назва послуги
                            </Text>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '500'
                            }}>
                                Скидка
                            </Text>
                        </View>
                        {
                            this.renderServices()
                        }
                        <View
                            style={{
                                flex:1,
                                alignSelf: 'stretch',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '500'
                            }}>
                                График {this.props.website}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex:1,
                                alignSelf: 'stretch',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400'
                            }}>
                                {this.props.website}
                            </Text>
                        </View>
                    </View>
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    cardStyle: {
        marginRight: 30,
        marginLeft: 30,
    }
}

export default MarkerInfo;