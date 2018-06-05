import React, {Component} from 'react';
import {View, WebView, FlatList} from 'react-native';
import {
    MainCard,
    CardItem,
    Header
} from './common';
import {WIDTH, HEIGHT} from '../styles/constants';
import Swiper from 'react-native-swiper';

export default class ImageContent extends Component {


    renderContent() {

        return this.props.images.map( image => {
            let html = `<html lang="he">
                    <head>
                    <meta charset="utf-8">
                    </head>
                    
                    <body>
                    ${image.content}
                    </body>
                    
                    </html>`;
            return (
                <View
                    key={image.id}
                    style={{
                        flex:1,
                        alignSelf: 'stretch',
                        width: WIDTH,
                        height: HEIGHT,
                    }}
                >
                    <WebView
                        style={{
                            width: WIDTH,
                            height: HEIGHT,
                        }}
                        automaticallyAdjustContentInsets = {false}
                        source={{ html: html, baseUrl:'' }}
                    />
                </View>
            )
        })

    }

    render() {
console.log('-- render image content --', this.props);

        return (
            <MainCard>
                <Header back/>
                <CardItem>
                    <Swiper
                        index={this.props.index}
                        style={{flex:1}}
                        showsPagination={false}
                        showsButtons={true}>
                        {
                            this.renderContent()
                        }
                    </Swiper>
                </CardItem>
            </MainCard>
        )
    }
}