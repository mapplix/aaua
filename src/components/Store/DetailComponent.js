import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    Spiner,
    CardComponent,
    ButtonRoundet} from '../common';
import {WIDTH_RATIO, RATIO} from '../../styles/constants';
import ImageSlider from 'react-native-image-slider';
import {Actions} from 'react-native-router-flux';
import {getProductById, addToBasket, increseCounter} from '../../Actions/StoreAction';
import {connect} from 'react-redux';

class DetailsComponent extends Component {

    addToBascket() {
        let {addToBasket, product} = this.props;
        addToBasket(product);
    }

    render() {
        console.log('DETAILS render', this.props);
let {product} = this.props;
        const {
            sliderContainer,
            imageContainer,
            titleStyle,
            isPresentText,
            titleContainer,
            descriptionContainer,
            textContainer,
            descriptionTitle,
            fixedFooterStyle,
            buttonText,
            priceText,
            bonusText} = styles;
        const imageHeight = 215 * RATIO;
        const sliderHeight = imageHeight + 30;
        if (product) {
            return (
                <MainCard>
                    <Header back basket>
                        {
                            this.props.category.name
                        }
                    </Header>
                    <ScrollView>
                        <CardItem style={imageContainer}>
                            <View style={sliderContainer}>
                                <ImageSlider
                                    images={product.gallery}
                                    autoPlayWithInterval={4000}
                                    customSlide={({ index, item, style, width }) =>{
                                        return (
                                        <View key={index} style={[style, {
                                            height: sliderHeight,
                                            justifyContent:'center',
                                            alignItems:'center',
                                            backgroundColor:'#ffffff'
                                        }]}>
                                            <Image
                                                source={{uri:item}}
                                                style={{
                                                    height: imageHeight,
                                                    width: 215 * WIDTH_RATIO,
                                                    flex: 1
                                                }}
                                                resizeMode={'contain'}
                                            />
                                        </View>
                                        )
                                    }}
                                />
                            </View>
                            <View style={titleContainer}>
                                <Text style={titleStyle}>
                                    {
                                        product.name
                                    }
                                </Text>
                                <Text style={isPresentText}>
                                    {
                                        product.status == 'instock' ? 'Вналичии' : 'Нет в наличии'
                                    }
                                </Text>
                            </View>

                        </CardItem>
                        <CardItem style={descriptionContainer}>
                            <View style={{
                                flex: 1,
                                paddingTop: 22,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginBottom: 8,
                                borderWidth:1,
                                borderRadius:4,
                                borderColor: '#bcbcb3',
                            }}>
                                <Text style={
                                    descriptionTitle
                                }>
                                    Описание товара
                                </Text>
                                <View style={textContainer}>
                                    <Text style={{
                                        marginBottom: 65,
                                        fontFamily: 'SFUIText-Regular',
                                        fontSize: 13,
                                        color: '#1b1b1b'
                                    }}>
                                        {product.description}
                                    </Text>
                                </View>
                            </View>
                        </CardItem>
                    </ScrollView>
                    <View style={fixedFooterStyle}>
                        <View>
                            <Text style={priceText}>
                                {product.price || 0} грн
                            </Text>
                            <Text style={bonusText}>
                                {product.bonus_price || 0} бонусов
                            </Text>
                        </View>
                        <View style={{
                            height: 36
                        }}>
                            <ButtonRoundet
                                onPress={this.addToBascket.bind(this)}
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
                </MainCard>
            )
        } else {
            return <Spiner />
        }
    }
}

const styles = {
    sliderContainer: {
        flex:8,
        paddingTop: 35 * RATIO,
        marginBottom: 17 * RATIO,
    },
    imageContainer: {
        flex: 60,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    titleStyle: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 17,
        color: '#1b1b1b',
        marginBottom: 14
    },
    isPresentText: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 14,
        color: '#2fc047',
        marginBottom: 14
    },
    descriptionContainer: {
        flex: 40,
        paddingLeft: 14 * WIDTH_RATIO,
        paddingRight: 14 * WIDTH_RATIO,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginRight: 17,
        marginLeft: 17,
    },
    descriptionTitle: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 17,
        color: '#423486',
        marginBottom: 17,
        marginLeft: 14,
    },
    fixedFooterStyle: {
        height: 63,
        width: '100%',
        alignSelf: 'stretch',
        position: 'absolute',
        bottom: 0,
        zIndex: 999,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        elevation:5,
        borderTopWidth:2,
        borderTopColor: '#a8a8a8',
        shadowColor: '#a8a8a8',
        shadowOffset: {width:2, height: 2},
        shadowOpacity: 0.2
    },
    buttonText: {
        fontFamily: 'SFUIText-Medium',
        color: '#1b1b1b',
        fontSize: 16,
        marginLeft: 50,
        marginRight: 50,
    },
    priceText: {
        fontFamily: 'SFUIText-Bold',
        color: '#423486',
        fontSize: 20
    },
    bonusText: {
        fontFamily: 'SFUIText-Medium',
        color: '#423486',
        fontSize: 14
    },
}

const mapStateToProps = ({auth, store}) => {
    return {
        phone: auth.user.profile.phone,
        token: auth.user.token,
        // product: store.product,
        basket: store.basket,
        countBasket: store.countBasket
    }
}

export default connect(mapStateToProps, {getProductById, addToBasket})(DetailsComponent);