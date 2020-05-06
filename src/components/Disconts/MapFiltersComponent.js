import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
    ModalCard, MapButton } from '../common';
import {RATIO, HEIGHT, WIDTH} from '../../styles/constants';
import {connect} from 'react-redux';

class MapFiltersComponent extends Component {

    state = {
        selectedCategory: this.props.selectedCategory,
    };

    onSelectCategory(category) {
        this.setState({selectedCategory: category})
    }

    applyFilters() {
        this.props.selectCategory(this.state.selectedCategory)
        this.props.onCloseModal();
    }

    renderRows() {
        const categories = [...this.props.categories];
        var i=0;
        var rows = [];
        while (i < categories.length) {
            rows.push(categories.slice(i, i+3))
            i = i+3;
        }
        return categories.map( (row, index) => {
            return (

                <MapButton
                    key={index}
                    style={{
                        backgroundColor: this.state.selectedCategory.id == row.id ? '#ffc200' : '#ffffff'
                    }}
                    onPress={() => this.onSelectCategory(row)}
                >
                    {
                        row.title
                    }
                </MapButton>
            )
        })
    }

    render() {
        const {
            modalCard,
            modalRow} = styles;
        return(
            <ModalCard style={modalCard}>
                <View
                    ref="filterContainer"
                    style={styles.modalRow}>
                {
                    this.renderRows()
                }
                </View>

                <View style={[
                    modalRow,
                    {
                        flex: 2,
                        marginBottom: 12
                    }
                    ]}>
                    <TouchableOpacity style={{
                        flex:1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => this.props.onCloseModal()}>
                        <Text style={{
                            fontFamily: 'SFUIText-Regular',
                            color:'#423486',
                            fontSize: 16
                        }}>
                            Закрыть
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex:1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={this.applyFilters.bind(this)}
                    >
                        <Text style={{
                            fontFamily: 'SFUIText-Semibold',
                            color:'#423486',
                            fontSize: 16
                        }}>
                            Применить
                        </Text>
                    </TouchableOpacity>
                </View>
            </ModalCard>
        )
    }
}

const styles = {
    modalCard: {
        // height: 300,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: 13,
        width: '95%'
        // backgroundColor: 'rgba(0,0,0,0)'
    },
    modalText: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 19,
        color:'#423485'
    },
    modalTextContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    modalRow: {
        marginTop: 10,
        marginLeft: 3,
        marginRight: 3,
        flex: 8,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
};

const mapStateToProps = ({auth, discounts}) => {
    return {
        token: auth.user.token,
        categories: discounts.categories,
        selectedCategory: discounts.selectedCategory
    }
}

export default connect(mapStateToProps)(MapFiltersComponent);