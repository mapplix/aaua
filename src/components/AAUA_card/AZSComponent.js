import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {
    Icon,
    ButtonRoundet} from '../common';
import {WIDTH_RATIO, RATIO, WIDTH} from '../../styles/constants';

class AZSComponent extends Component {

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
                <View style={styles.imageWrapper}>
                    <Icon
                        style={iconStyle}
                        imageSrc={this.props.imageSrc}
                    />
                </View>
                <View style={titleContainer}>
                    <Text style={priceText}>
                        Скидка
                    </Text>
                </View>
                <View style={footerStyle}>
                    <View>
                        <Text style={titleStyle}>
                          {this.props.intro}
                        </Text>
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
      borderColor: "#f1f1f1",
      borderWidth: 1,
      borderRadius: 4,
        alignItems: 'center',
      width: WIDTH*0.45,
        marginHorizontal: WIDTH_RATIO < 1 ? 3 : 6 * WIDTH_RATIO,
        marginVertical: 5
    },
  imageWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
    iconStyle: {
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
      // borderTopWidth: 1,
      // borderTopColor: "#f1f1f1",
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
        paddingHorizontal: 10,
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

export default AZSComponent;