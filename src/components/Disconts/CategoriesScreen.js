import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CardItem, Spiner} from '../common'
import Item from './Item';
import {RATIO} from '../../styles/constants';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loadCategories} from '../../Actions/DiscountsAction';

class CategoriesScreen extends Component {

    componentWillMount() {
        const {loadCategories, token} = this.props;
        loadCategories(token);
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
                        onPress={Actions.discontsMap}
                        imageSrc={require('../../images/icons/sto.png')}
                    >
                        {
                            row[0].title
                        }
                    </Item>
                    <Item
                        onPress={() => console.log('dfsfsdfsdf')}
                        imageSrc={require('../../images/icons/tyres.png')}
                    >
                        {
                            row[1].title
                        }
                    </Item>
                    <Item
                        onPress={() => console.log('dfsfsdfsdf')}
                        imageSrc={require('../../images/icons/carWash.png')}
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

export default connect(mapStateToProps, {loadCategories})(CategoriesScreen);