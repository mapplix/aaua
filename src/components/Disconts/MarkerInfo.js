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
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        key={service.name}
                    >
                        <Text>
                            {service.name}
                        </Text>
                        <Text>
                            {service.price}
                        </Text>
                    </View>
                )
            })
        }
    }

    render() {
        console.log(this.props.contacts);

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


        return (
            <MainCard>
                <Header back>
                    {this.props.title || ''}
                </Header>
                <CardItem>
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
                                width: 300,
                                height: 300
                            }}
                            source={{uri: BASE_URL+this.props.img}}
                        />

                    </View>
                    <View
                        style={{
                            flex:4,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}
                    >
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
                        <Text>
                            {this.props.website}
                        </Text>
                    </View>
                </CardItem>
                <CardItem>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                    }}>
                        {
                            this.renderServices()
                        }
                    </View>
                </CardItem>
            </MainCard>
        )
    }
}

export default MarkerInfo;