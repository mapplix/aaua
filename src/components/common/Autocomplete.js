import React, {Component} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {Spiner} from './'
import {DEVICE_OS, iOS} from '../../actions/constants';

// var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let listHeight = 0;

class Autocomplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            searchedItems: []
        };
    };

    renderItem = (item) => {

        return (
            <View style={{
                height: 25,
                alignItems: 'flex-start',
                justifyContent: 'center'
            }}>
                <TouchableOpacity
                    onPress={
                        () => {
                            this.props.onSelect(item)
                            this.setState({searchedItems: []});
                        }
                    }
                >
                    <Text
                        numberOfLines={1}
                        style={[styles.labelStyle,{
                            flexWrap: 'wrap',
                            textDecorationLine: 'underline'
                        }]}
                    >
                        {item.title}
                        </Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderList() {
        let listHeight = 0;
        if (this.props.data.length >= 1) {
            const renderedList = this.props.data.slice(0, 30)
            listHeight = renderedList.length <= 10 ? renderedList.length * 30 : 200;

            return (
                <View style={{
                    flex:1,
                    alignSelf: 'stretch',
                    maxHeight: 200,
                    height: listHeight
                }}
                >
                    <FlatList
                        style={{
                            height: listHeight,
                            flex: 1
                        }}
                        data={this.props.data}
                        renderItem={this.renderItem}
                    />
                </View>
            )
        }
    }

    render() {
        const {inputStyle, labelStyle, containerStyle} = styles;
        const {label, placeholder, value} = this.props;
        return (
            <View style={[containerStyle]}>
                <Text style={[labelStyle, this.props.labelStyle]}>
                    {label}
                </Text>
                <View style={{
                    minHeight: 43,
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <TextInput
                        {...this.props}
                        placeholderTextColor='#b6b9bf'
                        multiline={false}
                        onSubmitEditing={() => {console.log('enter pressed')}}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={this.props.onChangeText}
                        onFocus={this.props.onFocus}
                        style={inputStyle}/>
                </View>
                {
                    this.renderList()
                }
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        marginLeft: 45,
        marginRight: 45,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // position: 'absolute',
        zIndex: 999
    },
    inputStyle: {
        // placeholderTextColor: '#b6b9bf',
        fontFamily:'SFUIText-Regular',
      color: '#111',
        fontSize: 15,
        lineHeight: 25,
        flex:1,
        borderBottomWidth: DEVICE_OS == iOS ? 1 : 0,
        borderBottomColor: '#000'
    },
    labelStyle: {
        marginLeft: 4,
        marginBottom: 2,
        paddingTop:0,
        height: 20,
      fontFamily: 'SFUIText-Medium',
      fontSize: 14,
      color: '#423486',
        alignSelf:'stretch',
    },

}

export {Autocomplete};
