import React, {Component} from 'react';
import {View, WebView} from 'react-native';
import {
    MainCard,
    CardItem,
    Header
} from './common';

export default class ImageContent extends Component {

    render() {
console.log(this.props);
        let html = `<html lang="he">
                        <head>
                        <meta charset="utf-8">
                        </head>
                        
                        <body>
                        ${this.props.image.content}
                        </body>
                        
                        </html>`;

        return (
            <MainCard>
                <Header back>
                    {this.props.image.title || ''}
                </Header>
                <CardItem>
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
                        source={{ html: html, baseUrl:'' }}
                    />
                </CardItem>
            </MainCard>
        )
    }
}