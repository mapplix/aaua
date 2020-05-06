import React, { Component } from 'react';
import WebView from 'react-native-webview';
import {connect} from 'react-redux'

class LiqPayComponent extends Component {
    render() {
        return (
            <WebView
                source={{html: this.props.html}}
                style={{marginTop: 20}}
            />
        );
    }
}

const mapStateToProps = (AAUA_Card) => {
    return {
        html: AAUA_Card.page
    }
}

export default connect(mapStateToProps)(LiqPayComponent);
