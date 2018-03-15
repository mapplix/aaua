
import React, {Component} from 'react';
import {View, Picker, Text} from 'react-native';

class DropDown extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.elements.length >= 1) {
            console.log(nextProps);
            if (this.props.setDefaultValueToStore) {
                this.props.setDefaultValueToStore(nextProps.elements[0])
            }
        }
    }

    renderList() {
        const {inputStyle} = styles;
        const {selected, onValueChange, elements} = this.props;
        if (elements.length) {
            return (
                <Picker style={inputStyle}
                        selectedValue={selected}
                        onValueChange={onValueChange}>
                    {
                        elements.map( (element) => {
                            return (
                                <Picker.Item key={element.id} label={element.title} value={element.id} />
                            )
                        })
                    }
                </Picker>
            )
        }
    }

    render() {
        const {containerStyle, labelStyle, pickerWrapper} = styles;
        return (
            <View style={containerStyle}>
                <Text style={labelStyle}>
                    {this.props.label}
                </Text>
                <View style={pickerWrapper}>
                    {this.renderList()}
                </View>
            </View>
        )
    }
}

const styles = {
    inputStyle: {
        color: '#b6b9bf',
        flex:1
    },
    labelStyle: {
        marginLeft: 4,
        paddingTop:2,
        height: 22,
        fontFamily: 'SFUIText-Regular',
        fontSize: 14,
        alignSelf:'stretch',
        color: '#3d3e40',
    },
    containerStyle: {
        height: 65,
        marginLeft: 45,
        marginRight: 45,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    pickerWrapper: {
        flex:1,
        // backgroundColor: '#535',
        flexDirection:'row',
        minHeight:40,
        height: 40,
        alignItems: 'center',
        borderBottomColor: '#050505',
        borderBottomWidth: 1,
    }
}
export {DropDown};