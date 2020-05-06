import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CardItem, Spiner} from '../common'
import Item from './Item';
import {RATIO} from '../../styles/constants';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loadCategories, selectCategory} from '../../Actions/DiscountsAction';
import {getImageByCategoryId} from '../../Helpers/ImageHelper';

class CategoriesScreen extends Component {

    componentWillMount() {
        const {loadCategories, token} = this.props;
        loadCategories(token);
    }

    openDiscountCategory(category) {
        this.props.selectCategory(this.props.token, category);
    }

    renderRows() {
        const categories = [...this.props.categories];
        var i=0;
        var rows = [];
        while (i < categories.length) {
            rows.push(categories.slice(i, i+3))
            i = i+3;
        }
        return rows.map( (row, index) => {

            return (
                <CardItem
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}
                    key={index}
                >
                    <Item
                        onPress={() => this.openDiscountCategory(row[0])}
                        imageSrc={getImageByCategoryId(row[0].id)}
                    >
                        {
                            row[0].title
                        }
                    </Item>
                    <Item
                        onPress={() => this.openDiscountCategory(row[1])}
                        imageSrc={getImageByCategoryId(row[1].id)}
                    >
                        {
                            row[1].title
                        }
                    </Item>
                    <Item
                        onPress={() => this.openDiscountCategory(row[2])}
                        imageSrc={getImageByCategoryId(row[2].id)}
                    >
                        {
                            row[2].title
                        }
                    </Item>
                </CardItem>
            )
        })
    }

    renderContent() {
        const {loading} = this.props
        if (!loading) {
            return (
                <ScrollView style={{
                    paddingLeft: 22,
                    paddingRight: 22,
                }}>
                    {this.renderRows()}
                </ScrollView>
            )
        } else {
            return (
                <Spiner />
            )
        }
    }

    render() {
        return (
                this.renderContent()
        )
    }
}

const mapStateToProps = ({auth, discounts}) => {
    return {
        token: auth.user.token,
        categories: discounts.categories,
        loading: discounts.loadingCategories
    }
}

export default connect(mapStateToProps, {loadCategories, selectCategory})(CategoriesScreen);