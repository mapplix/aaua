import React, {Component} from 'react'
import {View, Image} from 'react-native'

class RightBarMenuItem extends Component {

    render() {
        const {image, style} = this.props;
        const {imageContainer, imageStyle} = styles;
        return (
            <View style={[imageContainer, style]}>
                <Image
                    resizeMode={'contain'}
                    style={[imageStyle, this.props.imageStyle]}
                   source={image}
                />
            </View>
        )
    }
}

const styles = {
    imageContainer: {
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 21,
    },
    imageStyle: {
        width: 18,
        height: 18
    }
}

export {RightBarMenuItem}