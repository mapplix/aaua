import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {
    MainCard,
    CardComponent,
    CardComponentTouchable,
    Header
} from '../common';
import {Actions} from 'react-native-router-flux';

class CategoriesComponent extends Component {

    openCategoryGoods(subcategory) {
        console.log('openCategoryGoods')
        Actions.goods({category: subcategory});
    }

    renderSubCategories() {
        const {imageStyle, imageContainer, textContainer, textStyle, componentStyle} = styles;
        return this.props.subcategories.map( subcategory => {
            return (
                <TouchableOpacity
                    key={subcategory.id}
                    onPress={
                        () =>this.openCategoryGoods(subcategory)
                    }
                    style={componentStyle}
                >
                    <View style={imageContainer}>
                        <Image
                            resizeMode={'contain'}
                            style={imageStyle}
                            source={{uri: subcategory.image}}
                        />
                    </View>
                    <View style={textContainer}>
                        <Text style={textStyle}>
                            {subcategory.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    render() {
        return (
            <MainCard>
                <Header back basket>
                    спецпредожение AAUA
                </Header>
                <ScrollView style={{
                    flexDirection: 'column',
                    paddingLeft: 13,
                    paddingRight: 13,
                    marginTop: 21
                }}
                contentContainerStyle={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                >
                    {
                        this.renderSubCategories()
                    }
                </ScrollView>
            </MainCard>
        )
    }
}

const styles = {
    componentStyle: {
        // backgroundColor:'#259',
        height: 67,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth:1,
        borderRadius:4,
        borderColor: '#bcbcb3',
    },
    imageContainer: {
        flex:2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft:10
    },
    imageStyle: {
        width: 40,
        height: 40
    },
    textContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        color:'#1b1b1b',
        fontSize: 15,
    },
}

export default CategoriesComponent;