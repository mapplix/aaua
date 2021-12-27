import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Share} from 'react-native';
import {
    MainCard,
    CardItem,
    LabelOnInput,
    ButtonRoundet,
    Header
} from '../common';
import {RATIO, WIDTH_RATIO} from '../../styles/constants';
import {sendInvitation, changePhone} from '../../actions/InviteFriendAction';
import {connect} from 'react-redux';
import {showAlert} from '../Modals';

class InviteFriendComponent extends Component {

    onChangeText(text) {
        text.replace(/\s/g,'');
        this.props.changePhone(text.trim());
    }

    onSubmit() {
        const {token, phone} = this.props;
        this.props.sendInvitation(phone.replace(/\s/g,''))
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.error != null) {
            showAlert(
                'Ошибка',
                nextProps.error,
                'Закрыть'
            )    
        }
    }

    shareLink() {
        Share.share({
            message: 'https://aaua.com.ua',
            url: 'https://aaua.com.ua',
            title: 'Наше приложение'
        }, {
            // Android only:
            dialogTitle: 'Поделиться с друзьями',
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    }

    render() {
        const {textStyle, textContainerStyle, buttonContainer} = styles;
        return (
            <MainCard>
                <Header back>
                    ПРИВЕДИТЕ ДРУГА
                </Header>
                <CardItem style={textContainerStyle}>
                        <Text style={textStyle}>
                            Приведите друга
                        </Text>
                        <Text style={textStyle}>
                            и получите бонус
                        </Text>
                </CardItem>
                <CardItem style={{
                    flex:0,
                    height: 122 * RATIO,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',

                }}>
                    <LabelOnInput
                        label={'Номер телефона или E-mail'}
                        placeholder={'Ввести'}
                        onChangeText={this.onChangeText.bind(this)}
                        value={this.props.email}
                    />
                </CardItem>
                <CardItem style={buttonContainer}>
                    <ButtonRoundet
                        style={{
                            backgroundColor: '#ffc200',
                            borderColor: '#ffc200',
                            marginRight: 82 * WIDTH_RATIO,
                            marginLeft: 82 * WIDTH_RATIO,
                            flex:0,
                            height: 43
                        }}
                        textStyle={{color: '#1b1b1b'}}
                        onPress={this.onSubmit.bind(this)}
                    >
                        Отправить
                    </ButtonRoundet>
                </CardItem>
                <CardItem style={[
                    textContainerStyle,
                    {
                        flex:0,
                        height: 96 * RATIO,
                    }
                ]}>
                    <Text style={textStyle}>
                        или
                    </Text>
                </CardItem>
                <CardItem style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flex:0,
                    height: 96 * RATIO,
                }}>
                    <TouchableOpacity
                        onPress={this.shareLink.bind(this)} >
                        <Image style={{
                            width: 75,
                            height: 75
                        }}
                               source={require('../../images/icons/share_round.png')}>

                        </Image>
                    </TouchableOpacity>
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    textContainerStyle: {
        flex:0,
        height: 135 * RATIO,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'SFUIText-Bold',
        fontSize: 23,
        color: '#1b1b1b'
    },
    buttonContainer: {
        flex:0,
        height: 69 * RATIO,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonWrapper: {
        height: 43,
    }
}

const mapStateToProps = ({auth, inviteFriend}) => {
    return {
        phone: inviteFriend.phone,
        error: inviteFriend.error,
        loading: inviteFriend.loading,
    }
}

export default connect(mapStateToProps,{sendInvitation, changePhone})(InviteFriendComponent);