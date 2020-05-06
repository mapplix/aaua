import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {
    Icon,
    ButtonRoundet} from '../common';
import {WIDTH_RATIO, RATIO} from '../../styles/constants';

class GoodsComponent extends Component {

    renderIsPresent() {
        if (this.props.isPresent) {
            return 'В наличии'
        }
        return 'Нет в наличии';
    }

    render() {
        const {
            componentStyle,
            iconStyle,
            titleStyle,
            titleContainer,
            isPresentContainer,
            isPresentText,
            footerStyle,
            priceText,
            bonusText,
            buttonText} = styles;
        const {
            imageSrc,
            price,
            bonus_price,
            children,
            isPresent,
            onPress,
            addToBasket
        } = this.props;
        return (
            <TouchableOpacity
                onPress={onPress}
                style={componentStyle}>
                <View>
                    <Icon
                        style={iconStyle}
                        imageSrc={imageSrc}
                    />
                </View>
                <View style={titleContainer}>
                    <Text style={titleStyle}>
                        {children}
                    </Text>
                </View>
                <View style={isPresentContainer}>
                    <Text style={[
                        isPresentText,
                        {color: isPresent ? '#2fc047' : '#e33c57'}
                    ]}>
                        { this.renderIsPresent()}
                    </Text>
                </View>
                <View style={footerStyle}>
                    <View>
                        <Text style={priceText}>
                            {price || 0} грн
                        </Text>
                        <Text style={bonusText}>
                            {bonus_price || 0} бонусов
                        </Text>
                    </View>
                    <View style={{
                        height: 25
                    }}>
                        <ButtonRoundet
                            onPress={addToBasket}
                            style= {{
                                backgroundColor: '#ffc200',
                                borderColor: '#ffc200',
                            }}
                            textStyle={buttonText}
                        >
                            Купить
                        </ButtonRoundet>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = {
    cardItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 14 * WIDTH_RATIO,
        marginRight: 12 * WIDTH_RATIO,
    },
    componentStyle: {
        // backgroundColor: '#279',
        alignItems: 'center',
        marginRight: WIDTH_RATIO < 1 ? 3 : 6 * WIDTH_RATIO
    },
    iconStyle: {
        // marginLeft: 24 * WIDTH_RATIO,
        // marginRight: 22 * WIDTH_RATIO,
        // marginTop: 10 * RATIO,
        width: 114 * WIDTH_RATIO,
        height: 114 * RATIO,
        // backgroundColor:'#157'
    },
    titleContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        maxWidth: 160 * WIDTH_RATIO
    },
    titleStyle: {
        alignSelf: 'center',
        fontFamily: 'SFUIText-Regular',
        fontSize: 11,
        color: '#1b1b1b'
    },
    isPresentContainer: {
        alignSelf: 'center',
        // backgroundColor: '#729',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    isPresentText: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 10,
        color: '#2fc047'
    },
    footerStyle: {
        paddingLeft: 3,
        paddingRight: 3,
        height: 50,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    priceText: {
        fontFamily: 'SFUIText-Bold',
        color: '#423486',
        fontSize: 14
    },
    bonusText: {
        fontFamily: 'SFUIText-Medium',
        color: '#423486',
        fontSize: 10
    },
    buttonText: {
        fontFamily: 'SFUIText-Medium',
        color: '#1b1b1b',
        fontSize: 12,
        marginLeft: 8,
        marginRight: 8,
    }
}

export default GoodsComponent;