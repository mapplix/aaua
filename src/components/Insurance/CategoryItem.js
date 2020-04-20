import React from 'react';
import {View, Text, ImageBackground, Dimensions} from 'react-native';
import {ButtonRoundet} from '../common';
import {RATIO, WIDTH_RATIO} from '../../styles/constants';

let imageHeight = 175 * RATIO;

const CategoryItem = ({imageSrc, children, onPress, buttonText = "Заказать"}) => {
    const {
        container,
        imageStyle,
        buttonContainer,
        buttonStyle,
        titleContainer,
        titleText
    } = styles;

    return (
        <View style={container}>
            <View style={{
                // flex: 1,
                height: imageHeight,
                borderRadius:6,
                overflow: 'hidden'
            }}>
                <ImageBackground
                    style={imageStyle}
                    source={imageSrc}
                >
                    <View style={titleContainer}>
                        <Text style={titleText}>
                            {children}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={buttonContainer}>
                <ButtonRoundet
                    style={buttonStyle}
                    textStyle={{color:'#1B1B1B'}}
                    onPress={onPress}
                >
                    {buttonText}
                </ButtonRoundet>
            </View>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        marginLeft: 14 * WIDTH_RATIO,
        marginRight: 14 * WIDTH_RATIO
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        backgroundColor: '#ffffff70',
    },
    titleText: {
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 23,
        fontFamily: 'Calibri-Bold',
        color: '#423486'
    },
    buttonContainer: {
        height: 53,
        paddingTop: 7,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    imageStyle: {
        flex: 1,
        width: null,
        maxHeight: imageHeight,
        height: imageHeight,
    },
    buttonStyle: {
        marginRight: 45 * WIDTH_RATIO,
        marginLeft: 45 * WIDTH_RATIO,
        height: 43,
        backgroundColor: '#FFC200',
        borderColor:'#FFC200'
    }
}

export default CategoryItem;
