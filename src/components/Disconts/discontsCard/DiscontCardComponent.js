import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {MainCard, CardItem, Header} from '../../common';
import {RATIO, WIDTH_RATIO} from '../../../styles/constants';
import {connect} from 'react-redux';
import {BASE_URL} from '../../../Actions/constants';

class DiscontCardComponent extends Component {

    render() {
        const {selectedCard} = this.props;
        const {imageStyle} = styles;
        return (
            <MainCard>
                <Header back>
                    {
                        selectedCard.title
                    }
                </Header>
                <CardItem
                    style={{
                        flex: 0,
                        height: 119 * RATIO,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        style={imageStyle}
                        source={{uri:BASE_URL+selectedCard.logo}}
                    />
                </CardItem>
                <CardItem
                    style={{
                        flex: 0,
                        height: 86 * RATIO,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffc200'
                    }}
                    >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            fontFamily: 'SFUIText-Regular',
                            fontSize: 29,
                            color: '#1b1b1b'
                        }}>
                            Бонусы:
                        </Text>
                        <Text style={{
                            fontFamily: 'SFUIText-Bold',
                            fontSize: 31,
                            color: '#1b1b1b'
                        }}>
                            {
                                selectedCard.sale
                            }
                        </Text>
                    </View>
                </CardItem>
                <CardItem
                style={{
                    // backgroundColor: '#289',
                    flex: 0,
                    height: 207 * RATIO,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: 74
                }}>
                    <View style={{
                        flex:1,
                        marginLeft: 12 * RATIO
                    }}>
                        <Image
                            style={{
                                flex: 1,
                                height: 138,
                                width: null
                            }}
                            source={{uri:BASE_URL+selectedCard.code}}
                        />
                    </View>
                </CardItem>
                <CardItem>
                    <Text style={{
                        fontFamily:'SFUIText-Medium',
                        fontSize: 29 * WIDTH_RATIO,
                        color: '#1b1b1b',
                        marginTop: 33,
                        marginLeft: 33 * WIDTH_RATIO,
                        marginRight: 25 * WIDTH_RATIO,
                    }}>
                        2830000003562805
                    </Text>
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    imageStyle: {
        height: 60,
        width: 232
    }
}

const mapStateToProps = ({auth, discounts}) => {
    return {
        token: auth.user.token,
        selectedCard: discounts.selectedCard
    }
}

export default connect(mapStateToProps)(DiscontCardComponent);