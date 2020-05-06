import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

class OrderingModal extends React.Component {

    state = {
        sortingName: '',
        index: 0
    }

    onSelect(filterName, index) {
        // console.log(index);
        // this.props.onSorting(index);
        this.setState({
            sortingName: filterName,
            index: index
        })
    }

    onSorting() {
        this.props.sortingProducts(this.state.sortingName, this.state.index);
    }

    renderCheckboxes() {
        let {filters} = this.props;
        return filters.map( filter => {
            return (
                <RadioButton
                    value={filter.name}
                    key={filter.name}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text>
                            {
                                filter.label
                            }
                        </Text>
                    </View>
                </RadioButton>
            )
        })
    }

    render() {
        let {isOpen, closeModal, selectedId} = this.props;
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
                            <Text style={{
                                color: '#1b1b1b',
                                fontWeight: '600',
                                fontSize: 17,
                                fontFamily: 'SFUIText-Medium',
                            }}>
                                Сортировка
                            </Text>
                        </View>
                        <View style={{
                            flex: 10,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            alignSelf: 'stretch',
                            paddingLeft: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#1b1b1b',
                        }}>
                            <View style={{
                                flex: 1
                            }}>
                                <RadioGroup
                                    size={15}
                                    selectedIndex={selectedId}
                                    color='#423486'
                                    style={{
                                        justifyContent: 'flex-start',
                                        // backgroundColor: '#279'
                                    }}
                                    onSelect = {(index, value) => this.onSelect(value, index)}
                                >
                                    {this.renderCheckboxes()}
                                </RadioGroup>
                            </View>
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
                                onPress={this.onSorting.bind(this)}
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

export default OrderingModal;