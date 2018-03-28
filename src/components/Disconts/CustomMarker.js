import React, {Component} from 'react';
import {View, Text, Image, Animated} from 'react-native';
import {BASE_URL} from '../../Actions/constants';
import {Spiner} from '../common';

class CustomMarker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0)
        };
    };

    render() {
        const {title, img} = this.props;
        const uri = BASE_URL+img;
console.log(uri);
        return(
            <View style={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    flex:1,
                    alignSelf: 'stretch',
                    minHeight: 150,
                    minWidth: 150,
                    backgroundColor: '#289',
                }}>
                    <Image
                        resizeMode={'cover'}
                        style={{

                            flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined
                        }}
                        source={{uri: uri}}
                        // source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                </View>
                <Text>
                    {title}
                </Text>
            </View>
        )
    }
}
export default CustomMarker;