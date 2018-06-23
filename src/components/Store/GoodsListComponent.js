import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    CardComponent,
    Icon,
    ButtonRoundet} from '../common';
import {WIDTH_RATIO, RATIO} from '../../styles/constants';
import GoodsComponent from './GoodsComponent';
import {Actions} from 'react-native-router-flux';
import {getProductsByCategoriesId} from '../../Actions/StoreAction';
import {connect} from 'react-redux';

class GoodsListComponent extends Component {

    componentWillMount() {
        let {token, phone} = this.props;
        this.props.getProductsByCategoriesId(token, phone, 163)
    }

    renderRows() {
        console.log(this.props.products)
        const products = [...this.props.products];
        var i=0;
        var rows = [];
        while (i < products.length) {
            rows.push(products.slice(i, i+2))
            i = i+2;
        }
        return rows.map( (row, index) => {
            console.log(row[0]);
            return (
                <CardItem
                    key={row[0].id}
                    style={styles.cardItemStyle}>
                    <GoodsComponent
                        onPress={() => Actions.detail()}
                        imageSrc={{uri:row[0].photo}}
                        price={row[0].price}
                        isPresent
                    >
                        {
                            row[0].name
                        }
                    </GoodsComponent>
                    <GoodsComponent
                        imageSrc={{uri:row[1].photo}}
                        price={row[1].price}
                        >
                        {
                            row[1].name
                        }
                    </GoodsComponent>
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
        const {
            cardItemStyle,
            componentStyle,
            iconStyle,
            titleStyle,
            titleContainer,
            isPresentContainer,
            isPresentText} = styles;
        return (
            <MainCard>
                <Header back basket>
                    автомасла
                </Header>
                {
                    this.renderContent()
                }
            </MainCard>
        )
    }
}

const styles = {
    cardItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14 * RATIO,
        marginLeft: 14 * WIDTH_RATIO,
        marginRight: 12 * WIDTH_RATIO,
    },
    componentStyle: {
        marginRight: WIDTH_RATIO < 1 ? 3 : 6 * WIDTH_RATIO
    },
    iconStyle: {
        marginLeft: 24 * WIDTH_RATIO,
        marginRight: 22 * WIDTH_RATIO,
        marginTop: 19 * RATIO,
        width: 114 * WIDTH_RATIO,
        height: 114 * RATIO
    },
    titleContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#282',
        maxWidth: 160 * WIDTH_RATIO
    },
    titleStyle: {
        alignSelf: 'center',
        fontFamily: 'SFUIText-Regular',
        fontSize: 11,
        color: '#1b1b1b'
    },
    isPresentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    isPresentText: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 10,
        color: '#2fc047'
    }
}

const mapStateToProps = ({auth, store}) => {
    return {
        phone: auth.user.profile.phone,
        token: auth.user.token,
        products: store.products
    }
}

export default connect(mapStateToProps, {getProductsByCategoriesId})(GoodsListComponent);