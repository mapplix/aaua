import React from 'react';
import {View, Text, Image} from 'react-native';
import {
    ButtonRoundet
} from '../common';
import {RATIO, WIDTH_RATIO} from '../../styles/constants'

let labelFontSize = WIDTH_RATIO <= 1 ? 11 : 13;

const CardComponent = ({onPress, children, imageSrc, style, imageParentStyle, imageContainerStyles, isDisabled}) => {
    const {container, imageContainer, imageStyle, textStyle, buttonStyle} = styles;

    return (
        <View style={[
            container,
            style
        ]}>
            <View style={[imageContainer, imageContainerStyles]}>
                <Image
                    // resizeMode={'contain'}
                    style={[imageStyle, imageParentStyle]}
                    source={imageSrc}
                />
            </View>
            <View style={{
                // backgroundColor: '#61c9eb',
                marginBottom: 18,
                height: 35,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingLeft: 9*WIDTH_RATIO,
                paddingRight: 6*WIDTH_RATIO
            }}>
                <ButtonRoundet
                    isDisabled={isDisabled}
                    style={[buttonStyle, {backgroundColor: isDisabled ? '#e1a700' : '#FFC200'}]}
                    textStyle={[textStyle, {color: isDisabled ? '#e0e0e0' : '#1d1d1d'}]}
                    onPress={onPress}
                >
                    {children}
                </ButtonRoundet>
            </View>
        </View>
    )
}

const styles = {
    container: {
        // width: 160,
        height: 180 * WIDTH_RATIO,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth:1,
        borderRadius:4,
        borderColor: '#bcbcb3',
        marginHorizontal: 10,
    },
    imageContainer: {
        flex:1,
        // backgroundColor: '#286',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 34 * WIDTH_RATIO,
        // marginTop: 26 * WIDTH_RATIO,
    },
    imageStyle: {
        width: 45,
        height: 64
    },
    textStyle: {
        color:'#1d1d1d',
        fontSize: labelFontSize,
        fontWeight: '400'
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'stretch',
        // paddingRight: 10*WIDTH_RATIO,
        // paddingLeft: 10*WIDTH_RATIO,
        backgroundColor: '#FFC200',
        borderColor:'#FFC200',
        marginRight: 1,
        marginLeft: 1,
    }
}
export default CardComponent;