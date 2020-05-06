import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList
} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    Spiner
} from '../common';
import Item from './Item';
import {Actions} from 'react-native-router-flux';
import {getCategories} from '../../Actions/StoreAction';
import {connect} from 'react-redux';
import _ from 'lodash';

class CategoriesComponent extends Component {

    componentDidMount() {
        console.log('***STORE CATEGORIES componentDidMount', this.props.categories)
        let {phone, token} = this.props;
        this.props.getCategories(token, phone)
    }

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.categories, this.props.categories);
    }

    openStoreCategories(category) {
        if (category.id == 17) { // if this is Specail offers category
            Actions.specialOffer({subcategories: category.sub_categories})
        } else {
            Actions.goods({category: category})
        }
    }

    renderRowItems(row) {
        return row.map( (item, index) => {
            return (
                <View
                    key={item.id}
                    style={{
                        flex: 1,
                        margin: 1,
                    }}
                >
                    <Item
                        onPress={() => this.openStoreCategories(item)}
                        imageSrc={{uri: item.image}}
                    >
                        {
                            item.name
                        }
                    </Item>
                </View>
            )
        })
    }

    renderRows() {
        const categories = [...this.props.categories];
        // var i=0;
        // var rows = [];
        // while (i < categories.length) {
        //     rows.push(categories.slice(i, i+3))
        //     i = i+3;
        // }
        // return rows.map( (row, index) => {
        //
        //     return (
        //         <CardItem
        //             key={row[0].id}
        //             style={{
        //             flexDirection: 'row',
        //             justifyContent: 'space-around',
        //             alignItems: 'flex-start'
        //         }}>
        //             {
        //                 this.renderRowItems(row)
        //             }
        //         </CardItem>
        //     )
        // })
        return categories.map( item => {
            return (
                <View
                    key={item.id}
                    style={{
                        // flex: 1,
                        margin: 1,
                    }}
                >
                    <Item
                        onPress={() => this.openStoreCategories(item)}
                        imageSrc={{uri: item.image}}
                    >
                        {
                            item.name
                        }
                    </Item>
                </View>
            )
        })
    }

    renderContent() {
        const {loading} = this.props
        if (!loading) {
            return (
                <FlatList
                    horizontal={false}
                    numColumns={3}
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-around',

                    }}
                    data={this.props.categories}
                    renderItem={({item}) => {
                        return (
                            <View
                                key={item.id}
                                style={{
                                    // flex: 1,
                                    margin: 1,
                                }}
                            >
                                <Item
                                    onPress={() => this.openStoreCategories(item)}
                                    imageSrc={{uri: item.image}}
                                >
                                    {
                                        item.name
                                    }
                                </Item>
                            </View>)
                    }}
                    keyExtractor={item => item.id}
                />
            )
        } else {
            return (
                <Spiner />
            )
        }
    }

    render() {
        console.log('***STORE CATEGORIES RENDER', this.props)
        return (
            <MainCard>
                <Header burger basket>
                    Магазин
                </Header>
                {
                    this.renderContent()
                }
            </MainCard>
        )
    }
}

const mapStateToProps = ({auth, store}) => {
    return {
        phone: auth.user.profile.phone,
        token: auth.user.token,
        categories: store.categories,
        loading: store.loading,
    }
}

export default connect(mapStateToProps, {getCategories})(CategoriesComponent);