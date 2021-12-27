import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import {CheckBox} from '../../common';
import {connect} from 'react-redux';
import {getBrandsForFilters} from '../../../actions/StoreAction';

class FiltersModal extends React.Component {

//     componentWillMount() {
//         let {getBrandsForFilters, phone, token} = this.props;
// console.log(phone, token);
//         getBrandsForFilters(token, phone);
//     }

    onCheckFilter(filterId) {
        let {checkFilters} = this.props;
        checkFilters(filterId);
    }

    renderCheckboxes() {
        let {brands, checkedBrands} = this.props;
        console.log('renderCheckboxes', this.props);
        if (brands.length) {
            return brands.map( filter => {
                return (
                    <CheckBox
                        key={filter.slug}
                        checkedImage={require('../../../images/icons/checked.png')}
                        uncheckedImage={require('../../../images/icons/unchecked.png')}
                        labelStyle={styles.labelStyle}
                        label={filter.name}
                        checked={checkedBrands.includes(filter.id) ? true : false}
                        onChange={this.onCheckFilter.bind(this, filter.id)}
                    />
                )
            })
        }
    }

    render() {
        let {isOpen, closeModal} = this.props;
        return (
            <Modal style={styles.modal}
                   position={"center"}
                   ref={"modal"}
                   isOpen={isOpen}
                   onClosed={closeModal}
            >
                <View style={{
                    flex: 1,
                    // minHeight: 250,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                }}>
                    <View style={{
                        flex: 1,
                        borderRadius: 12,
                        backgroundColor: '#f1f1f1',
                        marginLeft: 25,
                        marginRight: 25,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}>
                        <View style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            // backgroundColor: '#279',
                        }}>
                            <Text
                                style={{
                                    color: '#1b1b1b',
                                    fontWeight: '600',
                                    fontSize: 17,
                                    fontFamily: 'SFUIText-Medium',
                                }}
                            >
                                Фильтр
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignSelf: 'stretch',
                            paddingLeft: 20,
                            // backgroundColor: '#279',
                        }}>
                            <Text>
                                Производитель
                            </Text>
                        </View>
                        <View style={{
                            flex: 8,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            alignSelf: 'stretch',
                            paddingLeft: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#1b1b1b',
                        }}>
                            {this.renderCheckboxes()}
                        </View>
                        <View style={{
                            // backgroundColor: '#279',
                            flex: 2,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'stretch',
                                    borderRightWidth: 1,
                                    borderRightColor: '#1b1b1b',
                                }}
                            >
                                <Text style={{
                                    fontFamily: 'SFUIText-Medium',
                                    color: '#423486',
                                    fontSize: 15
                                }}>
                                    Отмена
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.props.onFiltering}
                                style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'stretch'
                            }}>
                                <Text style={{
                                    fontFamily: 'SFUIText-Medium',
                                    color: '#423486',
                                    fontSize: 17
                                }}>
                                    Применить
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = {
    modal: {
        height: 300,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    labelStyle: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 16
    }
}

const mapStateToProps = ({auth, store}) => {
    return {
        brands: store.brands,
        checkedBrands: store.checkedBrands,
        phone: auth.user.profile.phone,
        token: auth.user.token,
    }
}

export default connect(mapStateToProps, {getBrandsForFilters})(FiltersModal);