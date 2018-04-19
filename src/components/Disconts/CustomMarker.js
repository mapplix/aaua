import React, {Component} from 'react';
import {View, Text, Image, Animated, WebView} from 'react-native';
import {BASE_URL} from '../../Actions/constants';

class CustomMarker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0)
        };
    };

    onNavigationChange(event){
        console.log(event)
    }

    render() {
        const {title, img} = this.props;
        const uri = BASE_URL+img;
        return(
            <View style={{
                flex:1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 210,
                width: 210,
                maxWidth: 600
            }}>
                    <WebView
                        style={{
                            flex:1,
                            alignSelf: 'stretch',
                            width: 200,
                            height: 200,
                            maxWidth: 600
                         }}
                        javaScriptEnabled={false}
                        domStorageEnabled={false}
                        startInLoadingState={false}
                        scalesPageToFit={false}
                        scrollEnabled={true}
                        source={{ html: "<html><div><img src='"+uri+"' height='300' width='300'/></div></html>" }}
                    />
                <Text>
                    {title}
                </Text>
            </View>
        )
    }
}
export default CustomMarker;