import React from 'react';
import {View } from 'react-native';
import WebView from 'react-native-webview';
import {WIDTH, HEIGHT} from '../../styles/constants';
import {Spiner} from '../common';
import {onPaymentSuccess} from '../../actions/StoreAction';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'

class PaymentComponent extends React.Component{

    onNavigationStateChange(navState) {
console.log('onNavigationStateChange');
        if (navState.url) {
            let index = navState.url.indexOf('http://aauaecommerce.mapplix.com/checkout-2/order-received/', '');

console.log(navState.url, index);
            if (index >= 0) {
                Actions.basketList({isPaymentSuccess: true});
            }
        }
    }

    componentDidMount() {
        console.log('payment webview did mount', this.props);
    }

    render() {
console.log('render webview');
        return (
            <View style={{
                flex: 1,
                // backgroundColor: '#723'
            }}>
                {/*<Text> Payment </Text>*/}
                <WebView
                    source={{uri: this.props.url}}
                    style={{
                        width: WIDTH,
                        height: HEIGHT,
                        // backgroundColor: '#278',
                        marginTop: 20}}
                    renderLoading={() => <Spiner />}
                    onNavigationStateChange={ this.onNavigationStateChange.bind(this) }
                />
            </View>
        )
    }
}

let mapStateToProps = () => {
    return{}
}

export default connect(mapStateToProps, {onPaymentSuccess})(PaymentComponent);
