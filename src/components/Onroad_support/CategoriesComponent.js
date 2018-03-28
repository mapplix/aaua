import React, {Component} from 'react';
import {View, Text, Image, } from 'react-native';
import {
    MainCard,
    CardItem,
    CardComponent,
    CardComponentTouchable,
    Spiner,
    Header
} from '../common';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {getCategories} from '../../Actions/OnRoadActions';
import {DEVICE_OS, iOS, Android} from '../../Actions/constants';

class CategoriesComponent extends Component {

    componentWillMount() {
        this.props.getCategories(this.props.token);
    }

    renderCategories() {

        return this.props.categories.map( category => {

            var imageUrl = require('../../images/icons/onroad1.png');

            if (category.id == '2') {
                imageUrl = require('../../images/icons/onroad2.png');
            }
            if (category.id == '3') {
                imageUrl = require('../../images/icons/onroad3.png');
            }
            if (category.id == '4') {
                imageUrl = require('../../images/icons/onroad4.png');
            }
            const {imageStyle, imageContainer, textContainer, textStyle, componentStyle} = styles;
            return (
                <CardComponentTouchable
                    key={category.id}
                    onPress={() => Actions.onroadDetails({
                        category: category
                    })}
                    style={componentStyle}
                >
                    <View style={imageContainer}>
                        <Image
                            resizeMode={'contain'}
                            style={imageStyle}
                            source={imageUrl}
                        />
                    </View>
                    <View style={textContainer}>
                        <Text style={textStyle}>
                            {
                                category.title
                            }
                        </Text>
                    </View>
                </CardComponentTouchable>
            )
        })
    }

    renderContent() {
    if (!this.props.loading) {
        return (
            <MainCard>
                <Header burger goToMain={DEVICE_OS == iOS ? true : false} >
                    {"ПОДДЕРЖКА НА ДОРОГЕ"}
                </Header>
                <CardItem style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingLeft: 13,
                    paddingRight: 13,
                    marginTop: 21
                }}>

                    {
                        this.renderCategories()
                    }
                </CardItem>
            </MainCard>
        )
        }
        return (
            <Spiner />
        )
    }

    render() {
        return this.renderContent();
    }
}

const styles = {
    componentStyle: {
        // backgroundColor:'#259',
        height: 67,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8
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

const mapStateToProps = ({onRoad, auth}) => {

    return {
        token: auth.user.token,
        categories: onRoad.categories,
        loading: onRoad.loading
    }
}

export default connect(mapStateToProps, {getCategories})(CategoriesComponent);