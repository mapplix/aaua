import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
    MainCard,
    CardItem,
    Spiner,
    Header} from '../common';
import {connect} from 'react-redux';
import {getMessage} from '../../Actions/MessagesActions';

class MessageComponent extends Component {

    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min;
        return time;
    }

    componentWillMount() {
        const {getMessage, token, messageId} = this.props;
        getMessage(token, messageId)
    }

    renderContent() {
        const {
            titleContainer,
            textContainer,
            phoneText,
            textStyle,
            dateStyle
        } = styles;
        if (!this.props.loading) {
            const {message} = this.props;
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingLeft: 17,
                    paddingRight: 7,
                }}
                >
                    <View style={titleContainer}>
                        <View>
                            <Text style={phoneText}>
                                Уведомление
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View>
                                <Text style={dateStyle}>
                                    {
                                        this.timeConverter(message.created_at)
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={textContainer}>
                        <Text style={textStyle}>
                            {
                                message.text
                            }
                        </Text>
                    </View>
                </View>
            )
        }
        return ( <Spiner />)
    }

    render() {
        const {
            componentContainer
        } = styles;
        return (
            <MainCard>
                <Header back>
                    уведомление
                </Header>
                <CardItem
                    style={componentContainer}
                >
                    {
                        this.renderContent()
                    }
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    componentContainer: {
        marginLeft: 13,
        marginRight: 13,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    titleContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        height: 50,

    },
    phoneText: {
        fontSize: 13,
        fontFamily: 'SFUIText-Bold',
        color: '#423486'
    },
    notReaded: {
        fontSize: 10,
        fontFamily: 'SFUIText-Bold',
        color: '#1b1b1b'
    },
    textContainer: {
        // marginTop: 16,
        marginBottom: 13,
    },
    textStyle: {
        fontSize: 12,
        fontFamily: 'SFUIText-Regular',
        color: '#1b1b1b',
    },
    dateStyle: {
        fontSize: 11,
        fontFamily: 'SFUIText-Bold',
        color: '#423486'
    },
    readMore: {
        fontSize: 11,
        fontFamily: 'SFUIText-Medium',
        color: '#423486'
    },
    footerContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}

const mapStateToProps = ({auth, messages}) => {
    return {
        token: auth.user.token,
        message: messages.message,
        loading: messages.loading,
        messageError: messages.messageError,
    }
}

export default connect(mapStateToProps, {getMessage})(MessageComponent);